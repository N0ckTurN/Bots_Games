const config = require('./config');
const { Client, GatewayIntentBits, Colors , Collection } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

const { GiveawaysManager } = require('discord-giveaways');
const manager = new GiveawaysManager(client, {
    storage: './giveaways.json',
    default: {
        botsCanWin: false,
        embedColor: '#FF0000',
        embedColorEnd: '#000000',
        reaction: '🎉'
    }
});
client.GiveawaysManager = manager;

module.exports = client;
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config");

//Bot connection 
client.on("ready", () => {
    console.log("Connecté");
    client.user.setStatus("online")
client.user.setActivity("Zeyrox.pro" , {type: 1 })
});

//commands base

client.on('interactionCreate', (interaction) => {
  if (interaction.isChatInputCommand()) return;
    console.log('working')
})


client.on("messageCreate", message => {
    if(message.content === "ping"){
        message.reply("pong");
    }
})

//token du bot
client.login(config.TOKEN);