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