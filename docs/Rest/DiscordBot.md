# Coding a Discord Bot

```js
// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});

client.on('messageCreate', async message => {
    if(message.content === '!ping'){
      message.channel.send("pong.")
    }



});
// Login to Discord with your client's token
client.login(token);
```