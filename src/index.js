require("dotenv").config();
const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify")

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.GuildMember,
    Partials.User,
  ]
});
client.setMaxListeners(25);

client.commands = new Collection();
client.cooldowns = new Collection();
client.snipes = new Collection();
require("./mongo")();

client.color = "#FF0000";
client.owner = "380933616898932746";
client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnFinish: true,
  emitAddSongWhenCreatingQueue: false,
  nsfw: true,
  plugins: [
    new SpotifyPlugin({
      parallel: true,
      emitEventsAfterFetching: false,
      api: {
        clientId: process.env.spotifyClientId,
        clientSecret: process.env.spotifyClientSecret,
      },
    })
  ]
});

module.exports = client;

client.on("messageDelete", async (message, channel) => {
  client.snipes.set(message.channel.id, {
    content: message.content,
    author: message.author,
    image: message.attachments.first()
      ? message.attachments.first().proxyURL
      : null,
  });
});

process.on('uncaughtException', async (err) => {
  console.error('Uncaught Exception:', err.message);
  console.error(err.stack);

  return;
});

process.on('unhandledRejection', async (err) => {
  console.error('Unhandled Promise Rejection:', err.message);
  console.error(err.stack);

  return;
});

const { handleCommands } = require("./functions/handlers/handleCommands");
const { handleEvents } = require("./functions/handlers/handleEvents");

client.login(process.env.token).then(() => {
  handleCommands(client);
  handleEvents(client);
});