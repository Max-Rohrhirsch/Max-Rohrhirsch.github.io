# Deno

````typescript
irm https://deno.land/install.ps1 | iex
// Windows

curl -fsSL https://deno.land/install.sh | sh
// Linux


deno init my_project

deno main.ts
deno run main.ts // lonely file

import * as fs from "node:fs";
import * as http from "node:http";

deno run --allow-read=foo.txt,bar.txt script.ts
--allow-net
--allow-net=1.1.1.1:443
--allow-run
--allow-import

Deno.test("my-test", () => {});
Deno.test("test-1", () => {});
Deno.test("test-2", () => {});
deno test 



Deno.serve((_req) => {
  return new Response("Hello, World!");
});
deno run --allow-net server.ts



// Output: JSON Data
const jsonResponse = await fetch("https://api.github.com/users/denoland");
const jsonData = await jsonResponse.json();
console.log(jsonData, "\n");

// Output: HTML Data
const textResponse = await fetch("https://deno.land/");
const textData = await textResponse.text();
console.log(textData, "\n");

// Output: Error Message
try {
  await fetch("https://does.not.exist/");
} catch (error) {
  console.log(error);
}


#!/usr/bin/env -S deno run --allow-env
const path = Deno.env.get("DENO_INSTALL");
console.log("Deno Install Path:", path);


import { Client } from "https://deno.land/x/postgres/mod.ts";
const client = new Client({
  user: "user",
  database: "dbname",
  hostname: "127.0.0.1",
  port: 5432,
  password: "password",
});
await client.connect();
````