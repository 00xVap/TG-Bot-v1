const { ActivityType } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    client.user.setPresence({
      activities: [
        {
          name: `Sending shinies in main-chat.`,
          type: ActivityType.Custom,
        },
      ],
    });

    console.log(
      `[SYSTEM]: ${client.user.tag} is online.`
    );
  },
};