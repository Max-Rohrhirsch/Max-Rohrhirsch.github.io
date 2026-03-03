FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Serve Schritt
FROM nginx:alpine

# optional eigene Nginx config, wenn nötig
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Build Ergebnis in den Webroot von Nginx kopieren
COPY --from=build /app/build /usr/share/nginx/html

# Nginx läuft standardmäßig auf Port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]