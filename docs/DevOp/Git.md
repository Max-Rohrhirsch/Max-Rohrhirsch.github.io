# Git

### Setup
```bash
git config --global user.name "…" 

git config --global user.email "…"
```

### Create Project
```bash
cd testProject
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/.../REPO_NAME.git
git push -u origin main
```

### Commands
```bash
git add .
git commit -m "Message"
git push
```

### Wetere nützliche Commands
```bash
git log 
git log --graph --oneline --decorate --all

git checkout 3f34s5d5 
git branch // shows current branch
git checkout -b newbranch  // create new branch

git push origin new-branch 
git pull origin master 

git rm --cached <datei/ordner>      // Gepusht und im Nachhinein gitignore werden gelöscht.

git merge <id>	// Vereint den aktuellen Zweig mit dem angegebenen Zweig

git config --global alias.co checkout
// C:\user\max\.git\config
```

### SSH
```bash
ssh -v
ssh-keygen ed25519
Location und Passphase leer lassen
C:\Users\<name>\.ssh\id_ed25519 öffnen und kopieren
Public key in Gitlab einfügen
ssh –T gitlab.microsoft.com
```

### Fortgeschrittene Git-Befehle

```bash
# Änderungen stagen und committen in einem Befehl
git commit -am "Nachricht"

# Interaktives Staging (einzelne Teile einer Datei stagen)
git add -p

# Commits zusammenführen (Squash)
git rebase -i HEAD~3  # Die letzten 3 Commits bearbeiten

# Änderungen temporär speichern (Stash)
git stash save "Meine Änderungen"
git stash list
git stash apply stash@{0}
git stash pop  # Letzten Stash anwenden und löschen

# Änderungen zwischen Commits anzeigen
git diff HEAD~1 HEAD  # Unterschiede zwischen dem aktuellen und dem vorherigen Commit

# Branches vergleichen
git diff branch1..branch2

# Remote-Branches anzeigen
git branch -r

# Remote-Branch löschen
git push origin --delete branch-name

# Bestimmte Dateien zurücksetzen
git checkout -- file1 file2

# Vorherige Version einer Datei wiederherstellen
git checkout HEAD~1 -- file.txt

# Commit-Historie einer Datei anzeigen
git log --follow -p -- file.txt

# Tag erstellen und pushen
git tag -a v1.0.0 -m "Version 1.0.0"
git push origin v1.0.0
```

### Branching-Strategien

#### GitFlow
```
master (oder main) - Produktionscode
develop - Entwicklungszweig
feature/* - Feature-Branches
release/* - Release-Kandidaten
hotfix/* - Schnellkorrekturen für Production
```

Typischer GitFlow-Ablauf:
```bash
# Feature starten
git checkout develop
git checkout -b feature/new-feature

# Feature abschließen
git checkout develop
git merge --no-ff feature/new-feature
git push origin develop

# Release starten
git checkout develop
git checkout -b release/1.0.0
# Versionsnummern anpassen, letzte Tests

# Release finalisieren
git checkout main
git merge --no-ff release/1.0.0
git tag -a v1.0.0
git checkout develop
git merge --no-ff release/1.0.0
git push origin develop
git push origin main
git push origin --tags
```

#### GitHub Flow
Einfachere Alternative zu GitFlow:
```
main - Hauptzweig (immer deploybar)
feature/* - Feature-Branches (werden über Pull Requests in main gemerged)
```

#### Trunk-Based Development
```
main/trunk - Hauptentwicklungszweig
feature/* - Kurzlebige Feature-Branches (in der Regel < 1-2 Tage)
```

### Git Hooks

Git Hooks sind Skripte, die vor oder nach bestimmten Git-Aktionen ausgeführt werden.

#### Pre-commit Hook Beispiel
Datei `.git/hooks/pre-commit` (ausführbar machen mit `chmod +x`):
```bash
#!/bin/sh

# Überprüfe auf Syntaxfehler in Python-Dateien
FILES=$(git diff --cached --name-only --diff-filter=ACM | grep '\.py$')
if [ -n "$FILES" ]; then
    python -m flake8 $FILES
    if [ $? -ne 0 ]; then
        echo "Python-Fehler gefunden, Commit wird abgebrochen"
        exit 1
    fi
fi

# Keine Fehler gefunden
exit 0
```

#### Git Hooks mit Husky (für JavaScript-Projekte)
```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.js": ["eslint --fix", "prettier --write", "git add"]
  }
}
```

### Git Workflows für Teams

#### Pull Request Workflow
```bash
# Fork des Repositories erstellen (über GitHub/GitLab UI)

# Fork klonen
git clone https://github.com/username/repository.git
cd repository

# Upstream hinzufügen
git remote add upstream https://github.com/original/repository.git

# Branch für Feature erstellen
git checkout -b feature/my-feature

# Änderungen committen
git add .
git commit -m "Add feature XYZ"

# Upstream-Änderungen holen und in den Branch rebasen
git fetch upstream
git rebase upstream/main

# Feature-Branch pushen
git push origin feature/my-feature

# Pull Request erstellen (über GitHub/GitLab UI)
```

### Git Best Practices

1. **Atomic Commits**: Ein Commit sollte eine einzelne, logische Änderung repräsentieren.

2. **Aussagekräftige Commit-Nachrichten**: Format:
   ```
   Kurzer Titel (max. 50 Zeichen)
   
   Ausführlichere Beschreibung der Änderungen und ihrer 
   Auswirkungen. Kann mehrere Absätze umfassen.
   (Leerzeilen zwischen den Absätzen)
   
   Referenzen auf Issues: #123, #456
   ```

3. **Regelmäßiges Rebasing/Merging**: Feature-Branches regelmäßig mit dem Hauptzweig aktualisieren.

4. **Branches aufräumen**: Gelöschte Branches lokal entfernen:
   ```bash
   git fetch --prune
   ```

5. **Git-Geschichte sauber halten**:
   ```bash
   # Interactive Rebase für Commit-Historie bereinigen
   git rebase -i origin/main
   ```

### Git Submodules und Subtrees

```bash
# Submodule hinzufügen
git submodule add https://github.com/user/repo.git path/to/submodule

# Submodules nach dem Klonen initialisieren
git submodule update --init --recursive

# Subtree hinzufügen
git subtree add --prefix=path/to/subtree https://github.com/user/repo.git main --squash

# Änderungen vom Subtree-Remote holen
git subtree pull --prefix=path/to/subtree https://github.com/user/repo.git main --squash
```

### Git LFS (Large File Storage)

```bash
# Git LFS installieren
git lfs install

# Dateitypen für LFS verfolgen
git lfs track "*.psd"
git lfs track "*.zip"

# Status überprüfen
git lfs status

# Dateien abrufen
git lfs fetch
git lfs pull
```