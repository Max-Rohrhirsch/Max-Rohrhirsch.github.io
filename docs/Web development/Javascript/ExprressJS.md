# Express

### Create project
```Bash
node init
```

### Server
```Javascript
import express from "express";
import path from "path";
import fs from "fs";

// settings
const app = express();

app.get("/", (req, res) => {
  res.redirect("/Pfadfinder");
});

app.use(express.static("./views/static"));

fs.readdirSync("./views/startseiten").forEach(page => {
  app.get(`/${page.split(".")[0]}`, (req, res) => {
    res.render(`startseiten/${page}`, {
      loggedIn: req.session.loggedIn,
    });
  });
});

app.use((req, res) => {
  res.sendFile(path.resolve() + "/views/static/errorpage.html");
});

app.listen(80);
```

### Run
```Bash
node index.js
npm run dev
```

---

## HTTPS
```Bash
openssl genpkey -algorithm RSA -out private.key
openssl req -new -key private.key -out request.csr
openssl x509 -req -days 365 -in request.csr -signkey private.key -out certificate.crt
```

```Javascript
const https = require('https');
const fs = require('fs');
const express = require('express');

// Lade das Zertifikat und den privaten Schlüssel
const options = {
    key: fs.readFileSync('path/to/private.key'),
    cert: fs.readFileSync('path/to/certificate.crt')
};

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, HTTPS!');
});

// Erstelle den HTTPS-Server
https.createServer(options, app).listen(443, () => {
    console.log('HTTPS Server running on port 443');
});
```