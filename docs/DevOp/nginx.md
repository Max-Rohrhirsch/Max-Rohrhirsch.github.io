# Nginx

### SETUP
```py
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello from Flask!"

app.run(host="0.0.0.0")  # Muss sein (Nicht localhost)
```

```conf
proxy_cache_path /tmp/nginx_cache levels=1:2 keys_zone=my_cache:10m inactive=60m;

server {
    listen 80;

    location / {
        proxy_pass http://flask:5000;   # Automatisches DNS
        proxy_cache my_cache;
        proxy_cache_valid 200 1m;
    }
}
```

```yaml
version: "3"
services:
  flask:
    build: .
    expose:
      - "5000"
  nginx:
    image: nginx
    ports:
      - "80:80"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - flask
```

### Grundlegende Nginx Konfiguration

Die Hauptkonfigurationsdatei ist `/etc/nginx/nginx.conf`. Anwendungsspezifische Konfigurationen werden normalerweise in `/etc/nginx/conf.d/` oder `/etc/nginx/sites-available/` und `/etc/nginx/sites-enabled/` gespeichert.

```conf
# /etc/nginx/nginx.conf
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;

    include /etc/nginx/conf.d/*.conf;
}
```

### Hosting einer statischen Website

```conf
# /etc/nginx/conf.d/static-site.conf
server {
    listen 80;
    server_name example.com www.example.com;
    root /var/www/html;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }

    # Statische Dateien cachen
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # Große Dateien
    location ~* \.(mp4|pdf)$ {
        expires 30d;
        tcp_nodelay off;
        sendfile on;
        tcp_nopush on;
    }
}
```

### SSL/TLS Konfiguration mit Let's Encrypt

```bash
# Let's Encrypt installieren (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Zertifikat anfordern und Nginx konfigurieren
sudo certbot --nginx -d example.com -d www.example.com
```

Manuelle SSL-Konfiguration:

```conf
# /etc/nginx/conf.d/secure-site.conf
server {
    listen 80;
    server_name example.com www.example.com;
    
    # HTTP auf HTTPS umleiten
    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name example.com www.example.com;
    root /var/www/html;
    index index.html;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/example.com/chain.pem;

    # SSL Optimierungen
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;

    # Moderne Konfiguration (für neuere Browser)
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # HSTS (HTTP Strict Transport Security)
    add_header Strict-Transport-Security "max-age=63072000" always;
}
```

### Load Balancing

Nginx kann als Load Balancer für mehrere Backend-Server dienen:

```conf
# /etc/nginx/conf.d/load-balancer.conf
upstream backend {
    # Verschiedene Load-Balancing-Methoden:
    
    # Round-Robin (Standard)
    server backend1.example.com:8080;
    server backend2.example.com:8080;
    server backend3.example.com:8080;
    
    # Least Connections
    # least_conn;
    
    # IP Hash (für Session-Persistenz)
    # ip_hash;
    
    # Gewichtetes Round-Robin
    # server backend1.example.com:8080 weight=3;
    # server backend2.example.com:8080 weight=1;
}

server {
    listen 80;
    server_name load-balancer.example.com;

    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Proxy-Timeouts
        proxy_connect_timeout 5s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Health checks
    location /health {
        return 200 "healthy\n";
        access_log off;
    }
}
```

### Reverse Proxy für verschiedene Anwendungen

```conf
# /etc/nginx/conf.d/reverse-proxy.conf
server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 80;
    server_name app.example.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### WebSocket-Unterstützung

```conf
# /etc/nginx/conf.d/websocket.conf
server {
    listen 80;
    server_name websocket.example.com;

    location /socket.io/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Caching-Konfiguration

```conf
# /etc/nginx/conf.d/cache.conf
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=10g 
                 inactive=60m use_temp_path=off;

server {
    listen 80;
    server_name cache.example.com;

    location / {
        proxy_cache my_cache;
        proxy_pass http://backend;
        proxy_cache_valid 200 302 10m;
        proxy_cache_valid 404 1m;
        proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
        proxy_cache_lock on;
        
        # Cache-Status in Header anzeigen
        add_header X-Cache-Status $upstream_cache_status;
        
        # Cache-Bypass mit Query-Parameter
        proxy_cache_bypass $arg_nocache;
    }
    
    # Statische Dateien mit längerer Cache-Zeit
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        proxy_cache my_cache;
        proxy_pass http://backend;
        proxy_cache_valid 200 302 30d;
        expires 30d;
    }
}
```

### Rate Limiting

```conf
# /etc/nginx/conf.d/rate-limit.conf
limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;

server {
    listen 80;
    server_name api.example.com;

    # Rate-Limit für die API
    location /api/ {
        limit_req zone=mylimit burst=20 nodelay;
        proxy_pass http://localhost:3000;
    }
    
    # Rate-Limit für Login
    location /login {
        limit_req zone=mylimit burst=5 nodelay;
        proxy_pass http://localhost:3000;
    }
}
```

### Sicherheitseinstellungen

```conf
# /etc/nginx/conf.d/security.conf
server {
    listen 80;
    server_name secure.example.com;
    
    # Sicherheits-Header
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Verstecke Nginx-Version
    server_tokens off;
    
    # Größenbeschränkungen
    client_max_body_size 100M;
    
    # Timeouts
    client_body_timeout 10s;
    client_header_timeout 10s;
    keepalive_timeout 65;
    send_timeout 10s;
    
    # Blocke Zugriff auf versteckte Dateien
    location ~ /\.(?!well-known) {
        deny all;
        return 404;
    }
}
```

### HTTP/2 und HTTP/3 (QUIC) Konfiguration

```conf
# /etc/nginx/conf.d/http2-http3.conf
server {
    listen 443 ssl http2;
    listen 443 quic;  # Nginx ab Version 1.25 für HTTP/3
    server_name modern.example.com;
    
    http2_push_preload on;  # Unterstützung für HTTP/2 Server Push mit Link-Preload-Headern
    
    # HTTP/3 spezifische Header
    add_header Alt-Svc 'h3=":443"; ma=86400';
    
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    
    # Moderne SSL-Konfiguration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
    
    location / {
        root /var/www/html;
        index index.html;
    }
}
```

### Nginx als PHP-FPM-Server

```conf
# /etc/nginx/conf.d/php-fpm.conf
server {
    listen 80;
    server_name php.example.com;
    root /var/www/html;
    index index.php index.html;

    location / {
        try_files $uri $uri/ /index.php?$args;
    }

    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_pass unix:/run/php/php8.1-fpm.sock;  # Oder: fastcgi_pass 127.0.0.1:9000;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_intercept_errors on;
        fastcgi_buffer_size 16k;
        fastcgi_buffers 4 16k;
    }
}
```

### Nginx für Microservices-Architektur

```conf
# /etc/nginx/conf.d/microservices.conf
server {
    listen 80;
    server_name app.example.com;

    # API Gateway für verschiedene Microservices
    location /api/users/ {
        proxy_pass http://user-service:8080/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api/products/ {
        proxy_pass http://product-service:8080/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api/orders/ {
        proxy_pass http://order-service:8080/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    # Frontend-Anwendung
    location / {
        proxy_pass http://frontend-service:3000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Nginx-Befehle

```bash
# Nginx starten
sudo systemctl start nginx

# Nginx stoppen
sudo systemctl stop nginx

# Nginx neustarten
sudo systemctl restart nginx

# Konfiguration neu laden (ohne Neustart)
sudo systemctl reload nginx
# oder
sudo nginx -s reload

# Konfiguration testen
sudo nginx -t

# Status prüfen
sudo systemctl status nginx

# Nginx bei Systemstart aktivieren
sudo systemctl enable nginx
```