"""
dxf-contour-extractor
Deterministic 2D DXF polyline loop reconstruction, vertex snapping,
and laser/CNC manufacturing metrics extractor.
"""

from .extractor import (
    DXFContourExtractor,
    ContourResult,
    ClosedLoop,
    HoleFeature,
    BoundingBox2D,
    Vertex2D,
    Segment2D,
)

__version__ = "0.2.0-alpha"
__author__ = "Bhuvan A B"
__all__ = [
    "DXFContourExtractor",
    "ContourResult",
    "ClosedLoop",
    "HoleFeature",
    "BoundingBox2D",
    "Vertex2D",
    "Segment2D",
]
