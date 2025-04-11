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