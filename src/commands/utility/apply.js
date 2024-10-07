const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  cooldown: 3,
  data: new SlashCommandBuilder()
    .setName("apply")
    .setDescription("Application command."),

  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId("applications")
      .setTitle(interaction.guild.name + " | New Application");

    const question1 = new TextInputBuilder()
      .setCustomId("q1")
      .setLabel("Why do you want to be an Event Manager?")
      .setPlaceholder("Tip: A detailed reason on why you would be a good addition to the team.")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true)
      .setMaxLength(1000);

    const question2 = new TextInputBuilder()
      .setCustomId("q2")
      .setLabel("At which moment of the day are you online?")
      .setPlaceholder("Tip: We need to know how much time you spend here to schedule events.")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true)
      .setMaxLength(500);

    const question3 = new TextInputBuilder()
      .setCustomId("q3")
      .setLabel("Will you be active enough?")
      .setPlaceholder("Tip: We can fire you at anytime if you aren't responsive or active.")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true)
      .setMaxLength(250);

    const firstActionRow = new ActionRowBuilder().addComponents(question1);
    const secondActionRow = new ActionRowBuilder().addComponents(question2);
    const thirdActionRow = new ActionRowBuilder().addComponents(question3);

    modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

    const submitChannel = ["1252420924960145460"];

    if (!submitChannel.includes(interaction.channel.id)) {
      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(
          "<:error:1199434320960565388> You cannot use this command here."
        );

      await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
      return;
    }

    await interaction.showModal(modal);
  },
};