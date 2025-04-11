# Pylint

```bash
pip install pylint
pylint your_code.py --fail-under=9 --enable=all --disable=missing-docstring
pylint app/
```

```py
max-line-length=88
disable=
    missing-docstring,
    invalid-name
enable=
    all
```