# Docker

Docker-Desktop: https://docs.docker.com/engine/install/

### Installation
```bash
sudo apt install -y docker.io 
sudo systemctl enable docker –now 
sudo usermod -aG docker $USER 
printf '%s\n' "deb https://download.docker.com/linux/debian bullseye stable" | sudo tee /etc/apt/sources.list.d/docker-ce.list 
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/docker-ce-archive-keyring.gpg 
sudo apt install apt-transport-https ca-certificates curl software-properties-common 
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - 
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu `lsb_release -cs` test" 
sudo apt update 
sudo apt install docker-ce 
```

### Commands
```bash
// .dockerignore
    node_modules
    
// const port = process.env.PORT || 8080

docker ps    // list/log
```

### Run
```bash
docker build -t <tagname>

docker run -p 5000:8080 <tagname>
```

### Docker-Compose
```yaml
version: "3.8"  # Version der Docker Compose Datei

services:
  app:
    image: myapp:latest  # Verwendetes Image für den Service
    build: .  # Build-Befehl (alternativ zu einem vorgefertigten Image)
    ports:
      - "5000:5000"  # Portweiterleitung (Host:Container)
    environment:
      - DEBUG=true  # Umgebungsvariablen für den Service
    volumes:
      - ./data:/data  # Volumes für persistente Daten
    networks:
      - mynetwork  # Verwendetes Netzwerk für den Service

  db:
    image: postgres:latest
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - db_data:/var/lib/postgresql/data
    networks:
      - mynetwork  # Gleiches Netzwerk wie der andere Service

networks:
  mynetwork:
    driver: bridge  # Netzwerk-Typ (Standard: bridge)

volumes:
  db_data: {}  # Definiert ein Volume für die Datenbank
```

#### `version`

- Bestimmt die Version der Docker Compose Spezifikation. Beispiele: `"3"`, `"3.7"`, `"3.8"`. Diese Version hat Auswirkungen auf die verfügbaren Funktionen.

#### `services`

- Hier definierst du alle **Container**, die als Services in deiner Anwendung laufen sollen. Jeder Service kann ein eigenes Image, Portweiterleitungen, Umgebungsvariablen, Volumes und Netzwerke haben.

#### `image` und `build`

- **`image`**: Gibt an, welches Image verwendet werden soll.
- **`build`**: Gibt an, dass Docker das Image aus einem Dockerfile bauen soll. Normalerweise verwendest du entweder `image` oder `build`, aber nicht beides.

#### `ports`

- Mappt Ports vom Host auf Container (Host:Container). Zum Beispiel `"5000:5000` bedeutet, dass der Port 5000 des Hosts auf Port 5000 des Containers weitergeleitet wird.

#### `environment`

- Setzt Umgebungsvariablen für den Container. Nützlich für die Konfiguration von Services wie Datenbanken oder Webanwendungen.

#### `volumes`

- Volumes werden verwendet, um Daten zwischen Containern zu persistieren oder Daten auf dem Host zu speichern. Sie können auch verwendet werden, um Dateien zwischen dem Host und dem Container zu teilen.

#### `networks`

- Definiert benutzerdefinierte Netzwerke, die von mehreren Containern verwendet werden können. Container im selben Netzwerk können miteinander kommunizieren.

#### `depends_on`

- Bestimmt die Reihenfolge, in der die Container gestartet werden. Dies hilft, wenn zum Beispiel ein Service auf einen anderen angewiesen ist (wie eine Datenbank, die vor dem Webserver starten muss).

`docker-compose.prod.yml
docker-compose.dev.yml`

### Useful Commands
```bash
docker build -t java_t .
docker run -dit --name java_t java_t
docker exec -it java_t /bin/sh

docker ps  # list/log
docker ps -a  # list/log all 

docker images  # list/log all images

FOR /F "tokens=*" %i IN ('docker images -q') DO docker rmi %i  # delete all images
```

```bash
docker-compose up
docker-compose down
```

### Docker File
```bash
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY app/ .
CMD ["python", "main.py"]
```

### Extended Docker File
```bash
FROM python:3.12-slim

# Metadaten (Label)
LABEL version="1.0" maintainer="yourname@example.com"

WORKDIR /app
RUN apt-get update && apt-get install -y libpq-dev && apt-get clean
COPY . /app
RUN pip install --no-cache-dir -r requirements.txt

# Umgebungsvariablen setzen
ENV FLASK_APP=app.py
ENV FLASK_ENV=production

# Standard-Port exponieren (Nur Kommentar, keine direkte Auswirkung)
EXPOSE 5000

CMD ["python", "app.py"]
```

### logging docker
```bash
docker-compose logs web    # logs von einem Container anzeigen lassen
docker-compose logs        # Logs von allen Containers anzeigen
docker-compose logs --tail=100  # Nur letzten 100 logs

docker-compose ps  # alles anzeigen
```