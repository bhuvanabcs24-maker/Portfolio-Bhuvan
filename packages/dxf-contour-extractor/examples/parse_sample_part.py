#!/usr/bin/env python3
"""
Example demonstration for dxf-contour-extractor.
Builds a synthetic industrial mounting bracket with bolt holes,
executes geometry extraction, and prints manufacturing metrics.
"""

import sys
import os

# Add package src to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src")))

from dxf_contour_extractor import (
    DXFContourExtractor,
    Vertex2D,
    Segment2D,
)


def main():
    print("==================================================")
    print("dxf-contour-extractor: Industrial Bracket Example")
    print("==================================================")

    extractor = DXFContourExtractor(snap_tolerance_mm=0.01)

    # Synthetic 150mm x 75mm mounting bracket with slight drafting coordinate noise
    segments = [
        Segment2D(Vertex2D(0.0, 0.0), Vertex2D(150.0, 0.003)),
        Segment2D(Vertex2D(150.002, 0.0), Vertex2D(150.0, 75.0)),
        Segment2D(Vertex2D(150.0, 75.004), Vertex2D(0.0, 75.0)),
        Segment2D(Vertex2D(0.0, 75.0), Vertex2D(0.001, 0.0)),
    ]

    # Four 6mm diameter (3mm radius) M6 clearance bolt holes
    circles = [
        (Vertex2D(20.0, 20.0), 3.0),
        (Vertex2D(130.0, 20.0), 3.0),
        (Vertex2D(20.0, 55.0), 3.0),
        (Vertex2D(130.0, 55.0), 3.0),
    ]

    print(f"Input: {len(segments)} perimeter segments (with micro-gaps) + {len(circles)} circular cutouts")
    result = extractor.process_segments(segments, circles=circles)

    print("\n--- Extracted Manufacturing Geometry ---")
    print(f"Outer Boundary Detected:    {'Yes' if result.outer_boundary else 'No'}")
    if result.outer_boundary:
        print(f"Outer Boundary Perimeter:   {result.outer_boundary.perimeter_mm:.2f} mm")
        print(f"Outer Boundary Area:        {result.outer_boundary.area_mm2:.2f} mm²")

    print(f"Interior Cutouts (Holes):   {len(result.holes)}")
    for i, h in enumerate(result.holes, 1):
        print(f"  Hole #{i}: Center=({h.center.x:.1f}, {h.center.y:.1f}) mm, Dia={h.diameter_mm:.1f} mm, Perim={h.perimeter_mm:.2f} mm")

    print(f"\nTotal Cutting Travel:       {result.total_cutting_perimeter_mm:.2f} mm")
    print(f"Laser Pierce Count:         {result.pierce_count} (1 outer + {len(result.holes)} internal)")
    print(f"Stock Bounding Box:         {result.bounding_box.width_mm:.1f} x {result.bounding_box.height_mm:.1f} mm")
    print(f"Material Scrap Ratio:       {result.scrap_ratio:.1%}")
    print("==================================================")


if __name__ == "__main__":
    main()
