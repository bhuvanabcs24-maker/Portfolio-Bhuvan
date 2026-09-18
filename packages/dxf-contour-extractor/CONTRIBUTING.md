# Contributing to dxf-contour-extractor

Thank you for your interest in improving `dxf-contour-extractor`! We welcome contributions that make CAD geometry processing more robust, reliable, and mathematically sound.

## Code of Conduct

Please be respectful, constructive, and evidence-driven in all issues and discussions. Focus on engineering trade-offs and reproducible test cases.

## Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/bhuvanabcs24-maker/Forge-IQ.git
   cd Forge-IQ/packages/dxf-contour-extractor
   ```

2. **Create a virtual environment**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install editable package and dev dependencies**:
   ```bash
   pip install -e .[dev]
   ```

4. **Run tests**:
   ```bash
   python3 -m unittest discover -s tests
   ```

## Pull Request Guidelines

1. **Include Tests**: Every bug fix or new geometric entity support must be accompanied by a unit test in `tests/` verifying the behavior.
2. **Deterministic Behavior**: This library strictly avoids non-deterministic or heuristic guesses that could alter physical machining dimensions. All geometry calculations must be mathematically reproducible.
3. **Clean Code**: Follow PEP 8 style guidelines. Use type annotations across public interfaces.
4. **Issue First**: For large architectural proposals (such as 3D STEP B-Rep support), open an issue first to discuss the design.
