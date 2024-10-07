const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const moment = require("moment");
const prettyMilliseconds = require("pretty-ms");
const cpuStat = require("cpu-stat");

module.exports = {
  cooldown: 3,
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription(
      "Returns various information about users, the bot or the server."
    )
    .setDMPermission(false)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("bot")
        .setDescription("Returns information on TG Bot.")
    ),

  async execute(interaction, client) {
    const embed = new EmbedBuilder();

    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
      case "bot":
        cpuStat.usagePercent(async function (error, percent) {
          if (error) {
            const embed = new EmbedBuilder()
              .setColor(client.color)
              .setDescription(
                `<:error:1199434320960565388> An error occured, try again later.`
              );

            await interaction.reply({
              embeds: [embed],
              ephemeral: true,
            });
            return;
          }

          const node = process.version;
          const memoryUsage = formatBytes(process.memoryUsage().heapUsed);
          const cpu = percent.toFixed(2);
          await interaction.client.application.fetch();

          embed.setColor(client.color)
            .setTitle(`${client.user.tag} [\`${client.user.id}\`]`)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`
                >>> **Creation:** <t:${moment(client.user.createdAt).unix()}:f> **-** <t:${moment(client.user.createdAt).unix()}:R>
                **Developer:** <@${interaction.client.application.owner.id}>
                **Server Count:** \`${client.guilds.cache.size}\`
                **User Count:** \`${client.users.cache.size}\`
                **Uptime:** \`${prettyMilliseconds(client.uptime)}\`
                **Node Version:** \`${node}\`
                **Library:** Discord.js
                **CPU Usage:** \`${cpu}%\`
                **RAM Usage:** \`${memoryUsage}\`
              `)
            .setTimestamp();

          await interaction.reply({
            embeds: [embed],
          });
        });

        function formatBytes(a, b) {
          let c = 1024;
          d = b || 2;
          e = ["B", "KB", "MB", "GB", "TB"];
          f = Math.floor(Math.log(a) / Math.log(c));

          return parseFloat((a / Math.pow(c, f)).toFixed(d)) + "" + e[f];
        }
        break;

      default:
        break;
    }
  },
};