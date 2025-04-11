# NMAP
Scanns networks.

### Installation
```Bash
sudo apt-get update
sudo apt-get install nmap
```

### Basics
| **Example**                  | **Description**           |
|------------------------------|---------------------------|
| nmap 192.168.1.1             | Scan a single IP          |
| nmap 192.168.1.1 192.168.2.1 | Scan specific IPs         |
| nmap 192.168.1.1-254         | Scan a range              |
| nmap scanme.nmap.org         | Scan a domain             |
| nmap 192.168.1.0/24          | Scan using CIDR notation  |
| nmap -iL targets.txt         | Scan targets from a file  |
| nmap -iR 100                 | Scan 100 random hosts     |
| nmap --exclude 192.168.1.1   | Exclude listed hosts      |


### Port Scanning
| **Example**                         | **Description**                      |
|-------------------------------------|--------------------------------------|
| nmap 192.168.1.1 -p 21              | Port scan for port x                 |
| nmap 192.168.1.1 -p 21-100          | Port range                           |
| nmap 192.168.1.1 -p U:53,T:21-25,80 | Port scan multiple TCP and UDP ports |
| nmap 192.168.1.1 -p-                | Port scan all ports                  |
| nmap 192.168.1.1 -F                 | Fast port scan (100 ports)           |
| nmap 192.168.1.1 -p http,https      | Port scan from service name          |
| nmap 192.168.1.1 --top-ports 2000   | Port scan the top x ports            |

```Bash
-O nmap 192.168.1.1 -O 
```

### Performance
```Bash
nmap 192.168.1.1 -T0  # Paranoid
nmap 192.168.1.1 -T1  # Sneaky
nmap 192.168.1.1 -T5  # Insane
```

### Other
``nmap -6 2607:f0d0:1002:51::4`` Scanns for IPv6

| Example                          | Description                            |
|----------------------------------|----------------------------------------|
| nmap 192.168.1.1 -oN normal.file | Normal output to the file normal.file  |
| nmap 192.168.1.1 -oX xml.file    | XML output to the file xml.file        |
| nmap 192.168.1.1 -oG grep.file   | Grepable output to the file grep.file  |

