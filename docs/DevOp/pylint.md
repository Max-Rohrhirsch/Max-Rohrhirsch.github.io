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

## Einführung

Pylint ist ein statisches Code-Analyse-Tool, das Fehler in Python-Code findet, Coding-Standards durchsetzt und hilft, die Codequalität zu verbessern. Es bietet:

- Syntax-Überprüfung
- Einhaltung von Code-Standards (PEP 8)
- Code-Smell-Erkennung
- Refactoring-Vorschläge
- Duplizierungserkennnung

## Installation

```bash
# Standard-Installation
pip install pylint

# Mit Extras für bestimmte Frameworks
pip install pylint-django  # Für Django-Projekte
pip install pylint-flask   # Für Flask-Projekte
```

## Grundlegende Verwendung

```bash
# Eine einzelne Datei analysieren
pylint my_file.py

# Ein ganzes Verzeichnis analysieren
pylint my_directory/

# Mehrere Dateien/Verzeichnisse analysieren
pylint file1.py file2.py directory/

# Mit bestimmter Bewertungsschwelle
pylint --fail-under=8 my_file.py

# Mit detailliertem Report
pylint --reports=y my_file.py

# Mit spezifischen Nachrichten aktivieren/deaktivieren
pylint --disable=C0111,W0611 --enable=W0611 my_file.py
```

## Pylint-Konfigurationsdatei

Pylint kann über eine Konfigurationsdatei konfiguriert werden. Erstellen Sie eine der folgenden Dateien:
- `.pylintrc` im Projekt-Stammverzeichnis
- `pylintrc` im Projekt-Stammverzeichnis
- `~/.pylintrc` im Home-Verzeichnis
- `setup.cfg` mit einer `[pylint]`-Sektion

```bash
# Konfigurationsdatei erstellen
pylint --generate-rcfile > .pylintrc
```

## Beispiel für eine .pylintrc-Datei

```ini
[MASTER]
# Python-Versionen: Minimum Requirement
py-version = 3.8

# Zusätzliche Plugins, z.B. für Django
load-plugins=pylint_django

# Dateien oder Verzeichnisse ignorieren
ignore=CVS, .git, .venv, venv, migrations

[MESSAGES CONTROL]
# Deaktivieren bestimmter Warnungen
disable=
    missing-docstring,
    invalid-name,
    too-many-arguments,
    too-few-public-methods,
    no-self-use,
    duplicate-code

# Aktivieren bestimmter Warnungen
enable=
    unused-import,
    unused-variable

[FORMAT]
# Maximale Zeilenlänge
max-line-length=88

# String-Format prüfen (Formatierung mit %)
check-str-concat-over-line-jumps=no

[DESIGN]
# Maximale Anzahl von Argumenten für Funktionen/Methoden
max-args=5

# Maximale lokale Variablen
max-locals=15

# Maximale Return-Statements
max-returns=6

# Maximale Branches einer Funktion (if/else-Ketten)
max-branches=12

# Maximale Anzahl von Attributen für Klassen
max-attributes=7

# Maximale Anzahl von Public-Methods für Klassen
max-public-methods=20

[SIMILARITIES]
# Minimale Zeilenlänge für Duplikate
min-similarity-lines=4

# Kommentare ignorieren
ignore-comments=yes

# Dokumentations-Strings ignorieren
ignore-docstrings=yes

# Import-Anweisungen ignorieren
ignore-imports=yes

[TYPECHECK]
# Ignoriert Module, die problematisch beim Importieren sind
ignored-modules=numpy,torch,tensorflow

# Ignoriert Members, die problematisch beim Importieren sind
ignored-classes=numpy,torch,tensorflow

[BASIC]
# Regulärer Ausdruck für Variablennamen
variable-rgx=[a-z_][a-z0-9_]{0,30}$

# Regulärer Ausdruck für Funktionsnamen
function-rgx=[a-z_][a-z0-9_]{0,30}$

# Regulärer Ausdruck für Klassennamen
class-rgx=[A-Z_][a-zA-Z0-9]+$

# Regulärer Ausdruck für Konstantennamen
const-rgx=(([A-Z_][A-Z0-9_]*)|(__.*__))$
```

## Integration in Pre-commit Hooks

```yaml
# .pre-commit-config.yaml
repos:
-   repo: https://github.com/pycqa/pylint
    rev: v2.17.0
    hooks:
    -   id: pylint
        args: [--rcfile=.pylintrc]
```

## Integration in CI/CD-Pipelines

### GitHub Actions

```yaml
name: Pylint

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.10'
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install pylint
        if [ -f requirements.txt ]; then pip install -r requirements.txt; fi
    - name: Analyze code with pylint
      run: |
        pylint $(git ls-files '*.py') --fail-under=8
```

### GitLab CI/CD

```yaml
pylint:
  stage: test
  image: python:3.10
  script:
    - pip install pylint
    - pip install -r requirements.txt
    - pylint $(find . -name "*.py" | grep -v "venv/" | grep -v "migrations/") --fail-under=8
  artifacts:
    paths:
      - pylint.log
    when: always
```

## Gängige Pylint-Fehlercodes und ihre Bedeutung

| Code | Kategorie | Bedeutung |
|------|-----------|-----------|
| C0103 | convention | Invalid name (zu kurz, entspricht nicht Konventionen) |
| C0111 | convention | Missing docstring (fehlende Dokumentation) |
| C0301 | convention | Line too long (Zeile überschreitet Längenbegrenzung) |
| E0001 | error | Syntax error (Syntaxfehler) |
| E0401 | error | Import error (Modul kann nicht importiert werden) |
| E1101 | error | No member (Attribut/Methode existiert nicht) |
| R0201 | refactor | Method could be a function (Methode nutzt kein `self`) |
| R0903 | refactor | Too few public methods (Klasse mit zu wenigen Methoden) |
| R0904 | refactor | Too many public methods (zu viele öffentliche Methoden) |
| R0912 | refactor | Too many branches (zu viele if-else-Zweige) |
| R0913 | refactor | Too many arguments (zu viele Parameter) |
| R0914 | refactor | Too many local variables (zu viele lokale Variablen) |
| R0915 | refactor | Too many statements (zu viele Anweisungen) |
| W0102 | warning | Dangerous default value (mutable default argument) |
| W0611 | warning | Unused import (importiertes Modul wird nicht genutzt) |
| W0612 | warning | Unused variable (unbenutzte Variable) |
| W0613 | warning | Unused argument (unbenutzter Parameter) |
| W1201 | warning | Use % formatting in logging functions (falsche String-Formatierung) |

## Beispiel: Typische Pylint-Probleme und ihre Lösungen

### Problem 1: Unbenutzte Imports (W0611)

```python
# Schlecht
import os
import sys
import datetime

def get_current_date():
    return datetime.datetime.now()
```

```python
# Gut
import datetime

def get_current_date():
    return datetime.datetime.now()
```

### Problem 2: Zu viele Argumente (R0913)

```python
# Schlecht
def process_user(name, age, email, address, city, country, phone, role):
    # Verarbeitung...
    pass
```

```python
# Gut
class UserData:
    def __init__(self, name, age, email, address, city, country, phone, role):
        self.name = name
        self.age = age
        self.email = email
        self.address = address
        self.city = city
        self.country = country
        self.phone = phone
        self.role = role

def process_user(user_data):
    # Verarbeitung...
    pass
```

### Problem 3: Fehlende Docstrings (C0111)

```python
# Schlecht
def calculate_total(items):
    return sum(item.price for item in items)
```

```python
# Gut
def calculate_total(items):
    """
    Berechnet die Gesamtsumme aller Preise der übergebenen Elemente.
    
    Args:
        items: Eine Sammlung von Objekten mit einem price-Attribut.
        
    Returns:
        float: Die Summe aller Preise.
    """
    return sum(item.price for item in items)
```

## Best Practices für sauberen Python-Code mit Pylint

1. **Konsistenter Coding-Style**:
   - Befolgen Sie PEP 8 für Namenskonventionen.
   - Setzen Sie eine konsistente maximale Zeilenlänge fest (z.B. 88 für Black).

2. **Aussagekräftige Namen**:
   - Verwenden Sie beschreibende Namen für Variablen, Funktionen und Klassen.
   - Vermeiden Sie Ein-Buchstaben-Variablen außer in Schleifen oder als Zählvariablen.

3. **Ordentliche Dokumentation**:
   - Fügen Sie Docstrings zu allen Funktionen, Klassen und Modulen hinzu.
   - Dokumentieren Sie Parameter, Rückgabewerte und Ausnahmen.

4. **Code-Struktur**:
   - Begrenzen Sie die Anzahl der Argumente pro Funktion.
   - Vermeiden Sie tiefe Verschachtelungen von Kontrollstrukturen.
   - Halten Sie Funktionen und Klassen klein und fokussiert.

5. **Fehlerbehandlung**:
   - Fangen Sie spezifische Ausnahmen statt allgemeiner `Exception`.
   - Verwenden Sie `with`-Blöcke für Ressourcenverwaltung.

## Integration mit anderen Tools

### Mit Black (Formatter)

```bash
# Installation
pip install black

# Ausführen
black --line-length=88 .

# Integration mit Pylint
# In .pylintrc:
[FORMAT]
max-line-length=88
```

### Mit isort (Import-Sortierung)

```bash
# Installation
pip install isort

# Ausführen
isort .

# Konfiguration für Black-Kompatibilität in pyproject.toml
[tool.isort]
profile = "black"
line_length = 88
```

### Mit mypy (Typprüfung)

```bash
# Installation
pip install mypy

# Ausführen
mypy .

# Konfiguration in pyproject.toml
[tool.mypy]
python_version = "3.10"
warn_return_any = true
warn_unused_configs = true
disallow_untyped_defs = true
```

## Beispiel für einen umfassenden Python-Qualitäts-Workflow

```bash
#!/bin/bash
# quality_check.sh

echo "Running isort..."
isort .

echo "Running black..."
black .

echo "Running mypy..."
mypy .

echo "Running pylint..."
pylint $(find . -name "*.py" -not -path "*/\.*" -not -path "*/venv/*")

echo "Running pytest with coverage..."
pytest --cov=./ --cov-report=xml

echo "Quality check completed!"
```