"""
Core implementation of DXFContourExtractor.
Provides deterministic vertex snapping, graph cycle extraction, and
manufacturing geometry metrics for laser, waterjet, and CNC sheet metal.
"""

from dataclasses import dataclass, field
from typing import List, Tuple, Optional, Dict, Any
import math

try:
    import ezdxf
    HAS_EZDXF = True
except ImportError:
    HAS_EZDXF = False

try:
    import networkx as nx
    HAS_NETWORKX = True
except ImportError:
    HAS_NETWORKX = False

try:
    from scipy.spatial import KDTree
    HAS_SCIPY = True
except ImportError:
    HAS_SCIPY = False


@dataclass
class Vertex2D:
    x: float
    y: float

    def distance_to(self, other: "Vertex2D") -> float:
        return math.hypot(self.x - other.x, self.y - other.y)

    def as_tuple(self) -> Tuple[float, float]:
        return (self.x, self.y)


@dataclass
class Segment2D:
    start: Vertex2D
    end: Vertex2D
    is_arc: bool = False
    center: Optional[Vertex2D] = None
    radius: Optional[float] = None
    start_angle: Optional[float] = None
    end_angle: Optional[float] = None

    @property
    def length(self) -> float:
        if self.is_arc and self.radius is not None and self.start_angle is not None and self.end_angle is not None:
            sweep = (self.end_angle - self.start_angle) % (2 * math.pi)
            if sweep == 0:
                sweep = 2 * math.pi
            return self.radius * sweep
        return self.start.distance_to(self.end)


@dataclass
class BoundingBox2D:
    min_x: float
    min_y: float
    max_x: float
    max_y: float

    @property
    def width_mm(self) -> float:
        return max(0.0, self.max_x - self.min_x)

    @property
    def height_mm(self) -> float:
        return max(0.0, self.max_y - self.min_y)

    @property
    def area_mm2(self) -> float:
        return self.width_mm * self.height_mm


@dataclass
class ClosedLoop:
    vertices: List[Vertex2D]
    is_outer_boundary: bool = False
    area_mm2: float = 0.0
    perimeter_mm: float = 0.0


@dataclass
class HoleFeature:
    center: Vertex2D
    diameter_mm: float
    perimeter_mm: float
    area_mm2: float
    is_circular: bool = True


@dataclass
class ContourResult:
    outer_boundary: Optional[ClosedLoop]
    holes: List[HoleFeature]
    other_loops: List[ClosedLoop]
    bounding_box: BoundingBox2D
    total_cutting_perimeter_mm: float
    pierce_count: int
    scrap_ratio: float
    raw_entity_count: int
    unclosed_entity_count: int = 0
    warnings: List[str] = field(default_factory=list)


class DXFContourExtractor:
    """
    Deterministic 2D CAD/DXF feature extractor.
    Reconstructs closed boundary polygons from disconnected DXF primitives,
    snaps drafting micro-gaps, identifies interior cutouts, and calculates
    laser/plasma/waterjet cutting travel and piercing counts.
    """

    def __init__(
        self,
        snap_tolerance_mm: float = 0.01,
        arc_segments: int = 16,
        ignore_paper_space: bool = True,
        min_hole_diameter_mm: float = 0.5,
    ):
        self.snap_tolerance_mm = snap_tolerance_mm
        self.arc_segments = arc_segments
        self.ignore_paper_space = ignore_paper_space
        self.min_hole_diameter_mm = min_hole_diameter_mm

    def extract_from_file(self, file_path: str) -> ContourResult:
        if not HAS_EZDXF:
            raise RuntimeError("ezdxf is required for file extraction. Install via: pip install ezdxf")
        doc = ezdxf.readfile(file_path)
        return self.extract_from_dxf(doc)

    def extract_from_dxf(self, doc: Any) -> ContourResult:
        msp = doc.modelspace()
        segments: List[Segment2D] = []
        circles: List[Tuple[Vertex2D, float]] = []
        raw_count = 0

        for entity in msp:
            dxftype = entity.dxftype()
            raw_count += 1

            if dxftype == "LINE":
                s = Vertex2D(float(entity.dxf.start.x), float(entity.dxf.start.y))
                e = Vertex2D(float(entity.dxf.end.x), float(entity.dxf.end.y))
                if s.distance_to(e) > 1e-6:
                    segments.append(Segment2D(start=s, end=e))

            elif dxftype == "CIRCLE":
                center = Vertex2D(float(entity.dxf.center.x), float(entity.dxf.center.y))
                radius = float(entity.dxf.radius)
                if radius * 2 >= self.min_hole_diameter_mm:
                    circles.append((center, radius))

            elif dxftype == "ARC":
                center = Vertex2D(float(entity.dxf.center.x), float(entity.dxf.center.y))
                radius = float(entity.dxf.radius)
                start_deg = float(entity.dxf.start_angle)
                end_deg = float(entity.dxf.end_angle)
                start_rad = math.radians(start_deg)
                end_rad = math.radians(end_deg)
                
                # Approximate arc with linear chord segments
                sweep = (end_deg - start_deg) % 360.0
                if sweep == 0:
                    sweep = 360.0
                steps = max(4, int(self.arc_segments * (sweep / 360.0)))
                prev_v = Vertex2D(
                    center.x + radius * math.cos(start_rad),
                    center.y + radius * math.sin(start_rad)
                )
                for i in range(1, steps + 1):
                    theta = math.radians(start_deg + sweep * (i / steps))
                    curr_v = Vertex2D(
                        center.x + radius * math.cos(theta),
                        center.y + radius * math.sin(theta)
                    )
                    segments.append(Segment2D(start=prev_v, end=curr_v))
                    prev_v = curr_v

            elif dxftype == "LWPOLYLINE":
                pts = [Vertex2D(float(p[0]), float(p[1])) for p in entity.get_points("xy")]
                is_closed = bool(entity.closed)
                for i in range(len(pts) - 1):
                    segments.append(Segment2D(start=pts[i], end=pts[i + 1]))
                if is_closed and len(pts) > 2:
                    segments.append(Segment2D(start=pts[-1], end=pts[0]))

        return self.process_segments(segments, circles, raw_count)

    def process_segments(
        self,
        segments: List[Segment2D],
        circles: Optional[List[Tuple[Vertex2D, float]]] = None,
        raw_count: int = 0
    ) -> ContourResult:
        if circles is None:
            circles = []

        warnings: List[str] = []

        if not segments and not circles:
            warnings.append("No valid 2D planar geometry found.")
            return ContourResult(
                outer_boundary=None,
                holes=[],
                other_loops=[],
                bounding_box=BoundingBox2D(0, 0, 0, 0),
                total_cutting_perimeter_mm=0.0,
                pierce_count=0,
                scrap_ratio=0.0,
                raw_entity_count=raw_count,
                warnings=warnings
            )

        # 1. Collect all unique vertex endpoints
        raw_points: List[Tuple[float, float]] = []
        for seg in segments:
            raw_points.append(seg.start.as_tuple())
            raw_points.append(seg.end.as_tuple())

        # 2. Vertex Snapping using KDTree or grid clustering
        snapped_map: Dict[Tuple[float, float], Tuple[float, float]] = {}
        unique_canonical: List[Tuple[float, float]] = []

        if HAS_SCIPY and len(raw_points) > 0:
            tree = KDTree(raw_points)
            visited = set()
            for i, pt in enumerate(raw_points):
                if i in visited:
                    continue
                neighbors = tree.query_ball_point(pt, r=self.snap_tolerance_mm)
                canonical = pt
                for idx in neighbors:
                    visited.add(idx)
                    snapped_map[raw_points[idx]] = canonical
                unique_canonical.append(canonical)
        else:
            # Fallback simple spatial grid clustering
            grid: Dict[Tuple[int, int], Tuple[float, float]] = {}
            scale = 1.0 / max(1e-6, self.snap_tolerance_mm)
            for pt in raw_points:
                cell = (round(pt[0] * scale), round(pt[1] * scale))
                if cell not in grid:
                    grid[cell] = pt
                    unique_canonical.append(pt)
                snapped_map[pt] = grid[cell]

        # 3. Build Adjacency Graph
        loop_nodes_list: List[List[Vertex2D]] = []

        if HAS_NETWORKX and len(segments) > 0:
            G = nx.Graph()
            for seg in segments:
                u = snapped_map.get(seg.start.as_tuple(), seg.start.as_tuple())
                v = snapped_map.get(seg.end.as_tuple(), seg.end.as_tuple())
                if u != v:
                    G.add_edge(u, v, weight=math.hypot(u[0] - v[0], u[1] - v[1]))

            # Extract cycle bases (closed polygonal loops)
            cycles = nx.cycle_basis(G)
            for cycle in cycles:
                if len(cycle) >= 3:
                    loop_nodes_list.append([Vertex2D(x, y) for x, y in cycle])
        else:
            # Simple line-chaining fallback
            adj: Dict[Tuple[float, float], List[Tuple[float, float]]] = {}
            for seg in segments:
                u = snapped_map.get(seg.start.as_tuple(), seg.start.as_tuple())
                v = snapped_map.get(seg.end.as_tuple(), seg.end.as_tuple())
                if u != v:
                    adj.setdefault(u, []).append(v)
                    adj.setdefault(v, []).append(u)

            # Trace cycles
            visited_edges = set()
            for start_node in adj:
                for next_node in adj[start_node]:
                    edge = (min(start_node, next_node), max(start_node, next_node))
                    if edge in visited_edges:
                        continue
                    path = [start_node, next_node]
                    visited_edges.add(edge)
                    curr = next_node
                    prev = start_node
                    while True:
                        nbrs = [n for n in adj.get(curr, []) if n != prev]
                        if not nbrs:
                            break
                        nxt = nbrs[0]
                        nxt_edge = (min(curr, nxt), max(curr, nxt))
                        visited_edges.add(nxt_edge)
                        if nxt == start_node:
                            if len(path) >= 3:
                                loop_nodes_list.append([Vertex2D(x, y) for x, y in path])
                            break
                        if nxt in path:
                            break
                        path.append(nxt)
                        prev = curr
                        curr = nxt

        # 4. Construct Closed Loops with Shoelace Polygon Area
        closed_loops: List[ClosedLoop] = []
        for loop_pts in loop_nodes_list:
            area = self._calculate_shoelace_area(loop_pts)
            perimeter = self._calculate_perimeter(loop_pts)
            closed_loops.append(ClosedLoop(
                vertices=loop_pts,
                is_outer_boundary=False,
                area_mm2=area,
                perimeter_mm=perimeter
            ))

        # Sort loops by area descending: Largest is primary candidate for outer boundary
        closed_loops.sort(key=lambda l: l.area_mm2, reverse=True)
        outer_boundary: Optional[ClosedLoop] = None
        interior_loops: List[ClosedLoop] = []

        if closed_loops:
            outer_boundary = closed_loops[0]
            outer_boundary.is_outer_boundary = True
            interior_loops = closed_loops[1:]

        # 5. Process Circular Holes
        holes: List[HoleFeature] = []
        for center, radius in circles:
            dia = radius * 2
            holes.append(HoleFeature(
                center=center,
                diameter_mm=dia,
                perimeter_mm=2 * math.pi * radius,
                area_mm2=math.pi * (radius ** 2),
                is_circular=True
            ))

        # Also treat small interior closed loops as polygonal hole cutouts
        for iloop in interior_loops:
            # Check bounding box / centroid of interior loop
            c_x = sum(v.x for v in iloop.vertices) / len(iloop.vertices)
            c_y = sum(v.y for v in iloop.vertices) / len(iloop.vertices)
            equiv_dia = 2 * math.sqrt(max(0.0, iloop.area_mm2 / math.pi))
            holes.append(HoleFeature(
                center=Vertex2D(c_x, c_y),
                diameter_mm=equiv_dia,
                perimeter_mm=iloop.perimeter_mm,
                area_mm2=iloop.area_mm2,
                is_circular=False
            ))

        # 6. Compute Global Bounding Box
        all_x: List[float] = [p[0] for p in unique_canonical]
        all_y: List[float] = [p[1] for p in unique_canonical]
        for c, r in circles:
            all_x.extend([c.x - r, c.x + r])
            all_y.extend([c.y - r, c.y + r])

        if all_x and all_y:
            bbox = BoundingBox2D(
                min_x=min(all_x),
                min_y=min(all_y),
                max_x=max(all_x),
                max_y=max(all_y)
            )
        else:
            bbox = BoundingBox2D(0, 0, 0, 0)

        # 7. Compute Total Cutting Perimeter and Pierce Counts
        outer_perim = outer_boundary.perimeter_mm if outer_boundary else 0.0
        holes_perim = sum(h.perimeter_mm for h in holes)
        total_cutting_perimeter = outer_perim + holes_perim

        # Pierces: 1 for outer perimeter + 1 for each internal cutout hole
        pierces = (1 if outer_boundary else 0) + len(holes)

        # Scrap ratio: 1.0 - (part area / bounding box area)
        part_net_area = max(0.0, (outer_boundary.area_mm2 if outer_boundary else 0.0) - sum(h.area_mm2 for h in holes))
        scrap_ratio = 1.0 - (part_net_area / bbox.area_mm2) if bbox.area_mm2 > 1e-6 else 0.0
        scrap_ratio = max(0.0, min(1.0, scrap_ratio))

        return ContourResult(
            outer_boundary=outer_boundary,
            holes=holes,
            other_loops=[],
            bounding_box=bbox,
            total_cutting_perimeter_mm=total_cutting_perimeter,
            pierce_count=pierces,
            scrap_ratio=scrap_ratio,
            raw_entity_count=raw_count,
            warnings=warnings
        )

    def _calculate_shoelace_area(self, vertices: List[Vertex2D]) -> float:
        n = len(vertices)
        if n < 3:
            return 0.0
        area = 0.0
        for i in range(n):
            j = (i + 1) % n
            area += vertices[i].x * vertices[j].y
            area -= vertices[j].x * vertices[i].y
        return abs(area) / 2.0

    def _calculate_perimeter(self, vertices: List[Vertex2D]) -> float:
        n = len(vertices)
        if n < 2:
            return 0.0
        perim = 0.0
        for i in range(n):
            j = (i + 1) % n
            perim += vertices[i].distance_to(vertices[j])
        return perim
