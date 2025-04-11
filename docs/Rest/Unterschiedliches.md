# Unterschiedliches

## Ports ausschalten
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>

```bash
// Windows
netstat -ano | findstr :<port>
taskkill /PID <PID> /F
```

```bash
// Linux
netstat -tuln | grep <port>
kill -9 <PID>
```
</div>

## Loadbalancer
```yaml
version: "3.7"

services:
  traefik:
    image: traefik:v2.10
    command:
      - "--api.dashboard=true"                   # Enable dashboard
      - "--entrypoints.web.address=:80"          # HTTP entrypoint
      - "--entrypoints.websecure.address=:443"   # HTTPS entrypoint
      - "--providers.docker=true"                # Enable Docker provider
      - "--certificatesresolvers.myresolver.acme.tlschallenge=true"
      - "--certificatesresolvers.myresolver.acme.email=youremail@example.com"
      - "--certificatesresolvers.myresolver.acme.storage=/letsencrypt/acme.json"
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock:ro"
      - "./letsencrypt:/letsencrypt"
```
```bash
docker-compose up -d
```