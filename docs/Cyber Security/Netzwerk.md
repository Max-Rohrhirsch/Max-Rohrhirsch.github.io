# Wireshark
[Wireshark](Wireshark.png) is a widely used network protocol analyzer that captures and inspects network traffic in real-time. It’s essential for network troubleshooting, security analysis, and understanding data flow in a network.

[//]: # (![Shortcut]&#40;&#41;)

| **Usage**                              | **Filter syntax**                                  |
|----------------------------------------|----------------------------------------------------|
| Wireshark Filter by IP                 | ip.addr == 10.10.50.1                              |
| Filter by Destination IP               | ip.dest == 10.10.50.1                              |
| Filter by Source IP                    | ip.src == 10.10.50.1                               |
| Filter by IP range                     | ip.addr >= 10.10.50.1 and ip.addr \<= 10.10.50.100 |
| Filter by Multiple IPs                 | ip.addr == 10.10.50.1 or ip.addr == 10.10.50.100   |
| Filter out IP address                  | !(ip.addr == 10.10.50.1)                           |
| Filter subnet                          | ip.addr == 10.10.50.1/24                           |
| Filter by port                         | tcp.port == 25                                     |
| Filter by destination port             | tcp.dstport == 23                                  |
| Filter by IP address and port          | ip.addr == 10.10.50.1 and Tcp.port == 25           |
| Filter by URL                          | http.host == "host name"                           |
| Filter by time stamp                   | frame.time >= "June 02, 2019 18:04:00"             |
| Filter SYN flag                        | Tcp.flags.syn == 1                                 |
| Filter SYN + ACK flag                  | Tcp.flags.syn == 1 and tcp.flags.ack == 0          |
| Wireshark Beacon Filter                | wlan.fc.type_subtype == 0x08                       |
| Wireshark broadcast filter             | eth.dst == ff:ff:ff:ff:ff:ff                       |
| Wireshark multicast filter             | (eth.dst[0] & 1)                                   |
| Host name filter                       | ip.host == hostname                                |
| MAC address filter                     | eth.addr == 00:70:f4:23:18:c4                      |
| RST flag filter                        | tcp.flag.reset == 1                                |

---

# Burp Suite
Burp Suite is a powerful web application security testing tool used for finding vulnerabilities. It helps intercept, analyze, and modify HTTP/S requests and responses between a browser and the target server. Burp is widely used by penetration testers and developers.

1. Target
   Purpose: Organizes and scopes the target for testing.
   Features:
    - Displays a site map of all discovered URLs and endpoints.
    - Allows marking specific targets in-scope for testing.
    - Useful for planning attacks.
2. Proxy
   Purpose: Intercepts and modifies HTTP/S traffic between your browser and the server.
   Features:
    - Intercept requests and responses.
    - Modify headers, parameters, or payloads in real-time.
    - Replay requests for testing different inputs.
3. Repeater
   Purpose: Manually modify and re-send HTTP/S requests.
   Features:
    - Experiment with parameter changes.
    - Observe how the server responds to different inputs.
    - Useful for testing vulnerabilities like SQL injection or XSS.
4. Intruder
   Purpose: Automates sending customized payloads to find vulnerabilities.
   Features:
    - Perform brute-force attacks.
    - Test for injection points (SQLi, XSS, etc.).
    - Uses payload positions and attack types (Sniper, Cluster Bomb, etc.).
5. Scanner (Pro version)
   Purpose: Automates vulnerability scanning.
   Features:
    - Identifies common vulnerabilities (e.g., XSS, SQLi).
    - Provides detailed findings and remediation advice.
    - Only available in Burp Suite Professional.
6. Decoder
   Purpose: Encodes/decodes and converts data into various formats.
   Features:
    - Supports Base64, URL encoding, HTML, etc.
    - Useful for decoding obfuscated payloads.
7. Comparer
   Purpose: Compares two sets of data (requests, responses, etc.).
   Features:
    - Highlights differences between inputs or outputs.
    - Useful for analyzing changes after parameter modifications.

---

# Ettercap
It is design to make a man-in-the-middle Attack

### Installation
```Bash
sudo apt update
sudo apt install ettercap-common
```

### Starting
```Bash
sudo ettercap -G  # Graphical mode
sudo ettercap -T  # Text mode
sudo ettercap -U  # Unified mode
```