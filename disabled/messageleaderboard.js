const lb = require("../../../model/msgleaderboard");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.author.bot) return;

    var data = await lb.findOne({ Guild: message.guild.id, User: message.author.id })

    if (!data) {
        lb.create({
            Guild: message.guild.id,
            User: message.author.id,
            Messages: 1
        });
    } else {
        data.Messages++;

        data.save();
    }
  }
}