# dxf-contour-extractor

[![Python 3.9+](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: Alpha](https://img.shields.io/badge/status-alpha--v0.2.0-orange.svg)]()
[![Origin: ForgeIQ](https://img.shields.io/badge/origin-ForgeIQ%20Core-emerald.svg)](https://github.com/bhuvanabcs24-maker/Forge-IQ)

> **Deterministic 2D DXF polyline loop reconstruction, vertex snapping, and laser/CNC manufacturing metrics extractor.**  
> Extracted from the core geometric preprocessing engine of [ForgeIQ](https://github.com/bhuvanabcs24-maker/Forge-IQ) (`backend/services/cad_preprocessor.py`).

---

## The Engineering Problem

When automated manufacturing software (such as sheet-metal quotation engines, nesting optimizers, or laser cutters) receives an AutoCAD `.dxf` drawing from a client, it cannot immediately cut or calculate costs.

Real-world DXF files exhibit three recurring architectural traps:
1. **Entity Soup Without Topology**: DXF files store primitives (`LINE`, `ARC`, `LWPOLYLINE`, `SPLINE`) as independent, unlinked group code blocks. There is no intrinsic concept of a "closed outer boundary" or an "interior cutout".
2. **Human Drafting Micro-Gaps**: When draftsmen draw in CAD software without persistent object-snap enabled, endpoint coordinates frequently diverge by `0.002 mm` to `0.008 mm`. Naive coordinate equality (`ptA == ptB`) fails completely, causing standard polyline walkers to report open loops.
3. **Vision & LLM Failure**: Computer vision models and multimodal LLMs cannot preserve floating-point coordinates or scale factors, producing 20%–50% variance on perimeter lengths.

`dxf-contour-extractor` solves this deterministically using scientific computational geometry.

---

## Architecture & Algorithm Pipeline

```text
  ┌─────────────────┐
  │  Raw .DXF File  │
  └────────┬────────┘
           │
           ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ 1. Entity Extraction (ezdxf)                                │
  │    - Extract 2D endpoints from LINE, ARC, LWPOLYLINE, CIRCLE│
  └────────┬────────────────────────────────────────────────────┘
           │
           ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ 2. Spatial Vertex Snapping (scipy.spatial.KDTree)           │
  │    - Cluster endpoints within configurable tolerance (0.01mm)│
  │    - Merge micro-gap coordinates into canonical vertex IDs  │
  └────────┬────────────────────────────────────────────────────┘
           │
           ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ 3. Topological Graph Construction (networkx)                │
  │    - Build undirected planar multigraph                      │
  │    - Extract minimal cycle basis (closed loops)              │
  └────────┬────────────────────────────────────────────────────┘
           │
           ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ 4. Boundary & Feature Classification                        │
  │    - Sort loops by signed Shoelace 2D polygon area          │
  │    - Largest closed loop = Sheet Outer Boundary              │
  │    - Enclosed loops & circles = Interior Hole Cutouts       │
  └────────┬────────────────────────────────────────────────────┘
           │
           ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ 5. Manufacturing Metrics Output                             │
  │    - Total cutting perimeter (mm)                           │
  │    - Laser pierce count (1 outer + N holes)                 │
  │    - Bounding box dimensions & raw scrap ratio              │
  └─────────────────────────────────────────────────────────────┘
```

---

## Installation

### From Source (Local Development)

```bash
git clone https://github.com/bhuvanabcs24-maker/Forge-IQ.git
cd Forge-IQ/packages/dxf-contour-extractor
pip install -e .
```

### Dependencies
- `python >= 3.9`
- `ezdxf >= 1.1.0`
- `networkx >= 3.0`
- `scipy >= 1.10.0`

---

## Quickstart & Usage

```python
from dxf_contour_extractor import DXFContourExtractor

# Initialize extractor with a 0.01mm tolerance window for drafting micro-gaps
extractor = DXFContourExtractor(snap_tolerance_mm=0.01)

# Process a DXF drawing
result = extractor.extract_from_file("bracket_drawing.dxf")

print(f"Total Cutting Perimeter: {result.total_cutting_perimeter_mm:.2f} mm")
print(f"Laser Pierce Count:      {result.pierce_count}")
print(f"Interior Holes Found:     {len(result.holes)}")
print(f"Bounding Box:            {result.bounding_box.width_mm:.2f} x {result.bounding_box.height_mm:.2f} mm")
print(f"Scrap Area Ratio:        {result.scrap_ratio:.1%}")

# Inspect the outer boundary loop
print(f"Outer Boundary Vertices: {len(result.outer_boundary.vertices)}")
```

---

## Configuration Options

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `snap_tolerance_mm` | `float` | `0.01` | Spatial radius within which disjoint vertices are unified into a single topological node. |
| `arc_approximation_segments` | `int` | `16` | Number of linear chord segments used when discretizing smooth circular DXF arcs. |
| `ignore_paper_space` | `bool` | `True` | Automatically filters out title blocks, revision tables, and dimension callouts in Paper Space layouts. |
| `min_hole_diameter_mm` | `float` | `0.5` | Filters out dust artifacts and microscopic drafting specks below machining threshold. |

---

## Running Tests

The test suite validates vertex snapping against simulated micro-gaps, circle detection, and cutting length calculations:

```bash
python -m unittest discover -s tests
```

---

## ForgeIQ Relationship

This package was created by isolating the geometric feature-extraction layer of **ForgeIQ** (`backend/services/cad_preprocessor.py`). In ForgeIQ, the structured geometric output produced by this algorithm is fed directly into:
1. Deterministic parametric quotation formulas (laser feed rates and pierce dwell times).
2. Constrained Pydantic schemas passed to Google Gemini 2.5 Flash for machinability feedback.

By extracting this geometry pipeline into a standalone, database-agnostic package, other developers can process CAD files without depending on web frameworks or cloud databases.

---

## Contributing

Contributions, bug reports, and pull requests are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on code style, testing, and pull requests.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
