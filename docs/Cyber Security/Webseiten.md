# sqlmap

### Instalation
```bash
sudo apt-get install sqlmap
```

### Basic Usage
```Bash
sqlmap -u <targetURL>  # command to scan for vulnerabilities
```

| Example     | Description                                           |
|-------------|-------------------------------------------------------|
| -u URL      | The target URL                                        |
| -d DIRECT   | Connection string for direct database connection      |
| -l LOGFILE  | Parse target(s) from Burp or WebScarab proxy log file |
| -m BULKFILE | Scan multiple targets given in a textual file         |

| Example      | Description                       |
|--------------|-----------------------------------|
| --tor        | Use Tor anonymity network         |
| -o           | Turn on all optimization switches |
| --tables     | Enumerate DBMS database tables    |
| --privileges | Enumerate DBMS users privileges   |
| --users      | Enumerate DBMS users              |

### Examples
```Bash
sqlmap -u "https://highon.coffee" -D "$database-name" --tables 

sqlmap -u "https://highon.coffee" --dbs 
```

# Legion
GUI Based. Enter URL and risk Level.