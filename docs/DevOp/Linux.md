# Linux

``.jar`` -> ``java -jar jarfilename.jar`` \
``.deb`` -> ``sudo dpkg -i filename.deb`` \
``.zip`` -> ``unzip filename.zip`` \
``.tar.gz`` -> ``tar -xvzf filename.tar.gz``

### ssh
```bash
ssh username@hostname_or_ip

ssh-keygen -t rsa

sudo ssh service restart
```

| Command | kürzel | Description                                 |
|----|----|---------------------------------------------|
| SUID | u+s | execute as root/this user                   |
| SGID | g+s | the group is owner, even if user creates it |
| Sticky Bit | o+t | Not deletable File (except for Owner)       |

# Commands
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
<div>

```bash
// find a file by atrributes
find /var/log -name "*.log"
find / -size +100M
find /home/max -type d -name "Projects" -delete

/home/username/documents/notes.txt
/home/username/projects/readme.txt
/home/username/shared/todolist.txt
```
```bash
// command for locating commands only
where grep

/usr/bin/grep
```
```bash
        // coppy same thing

for i in {1..1000}; do echo "Das ist Zeile Nummer $i" >> datei.txt; done

seq -f "Das ist Zeile Nummer %g" 1000 > datei.txt
```
</div>
<div>

```bash
// like find but only by name
locate notes.txt

/home/username/.bashrc
/etc/skel/.bashrc
```
```bash
        // grep

grep "pattern" < input.txt > output.txt
```
```bash
htop  // Taskmanager
```
```bash
        // find a file by atrributes
```
```bash
ps aux | grep "processname" // find process
```
</div>
</div>

### Systemverwaltung
```bash
# System-Update (Debian/Ubuntu)
sudo apt update
sudo apt upgrade -y

# System-Update (Fedora/RHEL)
sudo dnf update -y

# Festplattenbelegung anzeigen
df -h

# Verzeichnisgröße ermitteln
du -sh /pfad/zum/verzeichnis

# Systemressourcen überwachen
top
```

### Netzwerk
```bash
# IP-Konfiguration anzeigen
ip addr show
ifconfig -a

# Netzwerkverbindungen anzeigen
netstat -tuln
ss -tuln

# DNS-Abfrage
dig example.com
nslookup example.com

# Traceroute
traceroute example.com
```

### Benutzer und Berechtigungen
```bash
# Neuen Benutzer anlegen
sudo useradd -m username
sudo passwd username

# Benutzer einer Gruppe hinzufügen
sudo usermod -aG groupname username

# Dateibesitz ändern
sudo chown user:group file.txt

# Berechtigungen ändern
chmod 755 script.sh  # rwx für Besitzer, rx für Gruppe und andere
```

### Fortgeschrittene Befehle
```bash
# Text mit sed bearbeiten
sed -i 's/alt/neu/g' datei.txt

# Daten mit awk verarbeiten
awk '{print $1,$3}' datei.txt

# Mit xargs parallele Prozesse starten
find . -name "*.log" | xargs -P4 gzip
```

### Prozessverwaltung
```bash
# Prozess im Hintergrund starten
command &

# Jobs anzeigen und verwalten
jobs
fg %1  # Job Nr. 1 in Vordergrund holen
bg %2  # Job Nr. 2 in Hintergrund fortsetzen

# Prozess mit bestimmter Priorität starten
nice -n 19 command  # Niedrige Priorität
sudo nice -n -20 command  # Höchste Priorität
```

### Arch installieren
```bash
loadkeys de-latin1

archinstall

sudo pacman -S xorg plasma kde-applications sddm nvidia nvidia-utils xf86-input-libinput
sudo systemctl enable sddm
sudo systemctl start sddm
```