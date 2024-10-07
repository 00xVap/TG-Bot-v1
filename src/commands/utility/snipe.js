const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChannelType,
} = require("discord.js");

module.exports = {
  cooldown: 3,
  data: new SlashCommandBuilder()
    .setName("snipe")
    .setDMPermission(false)
    .setDescription("Snipes the last deleted message.")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Channel you want to snipe a message in.")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(false)
    ),

  async execute(interaction, client) {
    let channel = interaction.options.getChannel("channel") || interaction.channel;

    const msg = client.snipes.get(channel.id);

    if (!msg) {
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(client.color)
            .setDescription("<:error:1199434320960565388> Couldn't find any deleted messages.")
        ],
        ephemeral: true,
      });
      return;
    }

    const ID = msg.author.id;
    const member = interaction.guild.members.cache.get(ID);
    const URL = member.user.displayAvatarURL({ dynamic: true });

    const embed = new EmbedBuilder()
      .setColor(client.color)
      .setAuthor({ name: `Sniped Message` })
      .setDescription(`
        **Channel:** ${channel}
        **Message Author:** <@${member.user.id}>
        **Message Content:**
        \`\`\`${msg.content || "No message"}\`\`\``
      )
      .setThumbnail(URL)
      .setTimestamp()
      .setFooter({ text: `User ID: ${ID}` });

    if (msg.image) embed.setImage(msg.image);

    await interaction.reply({
      embeds: [embed],
    });
    return;
  },
};