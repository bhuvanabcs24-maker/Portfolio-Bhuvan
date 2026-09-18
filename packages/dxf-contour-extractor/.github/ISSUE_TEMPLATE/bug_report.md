---
name: Bug report
about: Create a report to help improve DXF parsing or loop extraction
title: '[BUG] '
labels: bug
assignees: ''
---

**Describe the Bug**
A clear and concise description of what the bug is.

**DXF Entity Types Involved**
- [ ] LINE
- [ ] ARC
- [ ] LWPOLYLINE
- [ ] CIRCLE
- [ ] SPLINE
- [ ] Other:

**Geometric Symptoms**
- [ ] Micro-gap not closed despite tolerance
- [ ] Outer boundary misidentified as hole
- [ ] Incorrect cutting perimeter calculation
- [ ] Parser crashed on group code

**To Reproduce**
Steps to reproduce the behavior, or a minimal snippet of code:
```python
from dxf_contour_extractor import DXFContourExtractor
extractor = DXFContourExtractor()
result = extractor.extract_from_file("problematic_sample.dxf")
```

**Expected Behavior**
A clear description of what you expected to happen (e.g. expected perimeter length, expected closed loop).

**Environment**
- OS: [e.g. macOS, Ubuntu, Windows]
- Python Version: [e.g. 3.10.12]
- `ezdxf` Version: [e.g. 1.2.0]
