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

### Docker File
```Dockerfile
FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD [ "node", "index.js" ]
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
version: '3'
services: 
    web:
        build: .
        ports:
            - "8080:8080"
    db:
        image: "mysql"
        enviroment:
            MYSQL_ROOT_PASSWORD: 1234
        volumes:
            - db-data:/foo

volumes:
    db-data:
```

```bash
docker-compose up
docker-compose down
```