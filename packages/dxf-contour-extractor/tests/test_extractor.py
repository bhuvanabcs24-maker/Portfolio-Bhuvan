"""
Unit tests for dxf_contour_extractor.
Validates vertex snapping, loop closure, hole detection, and cutting metrics.
"""

import unittest
import math
import sys
import os

# Add src directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src")))

from dxf_contour_extractor import (
    DXFContourExtractor,
    Vertex2D,
    Segment2D,
    BoundingBox2D,
    ContourResult,
)


class TestDXFContourExtractor(unittest.TestCase):

    def setUp(self):
        self.extractor = DXFContourExtractor(snap_tolerance_mm=0.01)

    def test_clean_rectangle_boundary(self):
        """Test a clean 100mm x 50mm rectangular boundary made of 4 lines."""
        segments = [
            Segment2D(Vertex2D(0.0, 0.0), Vertex2D(100.0, 0.0)),
            Segment2D(Vertex2D(100.0, 0.0), Vertex2D(100.0, 50.0)),
            Segment2D(Vertex2D(100.0, 50.0), Vertex2D(0.0, 50.0)),
            Segment2D(Vertex2D(0.0, 50.0), Vertex2D(0.0, 0.0)),
        ]
        result = self.extractor.process_segments(segments)

        self.assertIsNotNone(result.outer_boundary)
        self.assertEqual(len(result.holes), 0)
        self.assertAlmostEqual(result.outer_boundary.area_mm2, 5000.0, places=1)
        self.assertAlmostEqual(result.total_cutting_perimeter_mm, 300.0, places=1)
        self.assertEqual(result.pierce_count, 1)
        self.assertAlmostEqual(result.bounding_box.width_mm, 100.0, places=2)
        self.assertAlmostEqual(result.bounding_box.height_mm, 50.0, places=2)

    def test_drafting_micro_gap_snapping(self):
        """
        Simulate human drafting micro-gaps (0.005mm) between corners.
        Strict coordinate equality fails, but spatial KD-Tree snapping
        within 0.01mm tolerance successfully reconstructs the closed loop.
        """
        segments = [
            Segment2D(Vertex2D(0.0, 0.0), Vertex2D(100.0, 0.004)), # 4 micron drift
            Segment2D(Vertex2D(100.003, 0.0), Vertex2D(100.0, 50.0)), # 3 micron gap
            Segment2D(Vertex2D(100.0, 50.005), Vertex2D(0.0, 50.0)),
            Segment2D(Vertex2D(0.0, 50.0), Vertex2D(0.002, 0.0)),
        ]
        result = self.extractor.process_segments(segments)

        self.assertIsNotNone(result.outer_boundary)
        self.assertAlmostEqual(result.outer_boundary.area_mm2, 5000.0, delta=5.0)
        self.assertEqual(result.pierce_count, 1)

    def test_holes_and_laser_pierces(self):
        """Test outer boundary + 2 internal circular mounting holes."""
        segments = [
            Segment2D(Vertex2D(0.0, 0.0), Vertex2D(200.0, 0.0)),
            Segment2D(Vertex2D(200.0, 0.0), Vertex2D(200.0, 100.0)),
            Segment2D(Vertex2D(200.0, 100.0), Vertex2D(0.0, 100.0)),
            Segment2D(Vertex2D(0.0, 100.0), Vertex2D(0.0, 0.0)),
        ]
        # 2 circles: 10mm radius (20mm dia) at (50, 50) and (150, 50)
        circles = [
            (Vertex2D(50.0, 50.0), 10.0),
            (Vertex2D(150.0, 50.0), 10.0),
        ]

        result = self.extractor.process_segments(segments, circles=circles)

        self.assertEqual(len(result.holes), 2)
        # Pierce count should be 1 (outer) + 2 (holes) = 3
        self.assertEqual(result.pierce_count, 3)

        expected_outer_perim = 600.0 # 200 + 100 + 200 + 100
        expected_hole_perim = 2 * (2 * math.pi * 10.0) # ~125.66 mm
        self.assertAlmostEqual(
            result.total_cutting_perimeter_mm,
            expected_outer_perim + expected_hole_perim,
            places=1
        )

    def test_empty_input_handling(self):
        """Test empty entity input gracefully returns zeroed result without exception."""
        result = self.extractor.process_segments([])
        self.assertIsNone(result.outer_boundary)
        self.assertEqual(result.pierce_count, 0)
        self.assertEqual(result.total_cutting_perimeter_mm, 0.0)
        self.assertTrue(len(result.warnings) > 0)


if __name__ == "__main__":
    unittest.main()
