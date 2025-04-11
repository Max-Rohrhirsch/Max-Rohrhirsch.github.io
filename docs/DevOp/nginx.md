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