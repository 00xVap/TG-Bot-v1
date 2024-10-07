const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const triggerSchema = require("../../model/triggers");

module.exports = {
    cooldown: 3,
    data: new SlashCommandBuilder()
        .setName("triggers-list")
        .setDMPermission(false)
        .setDescription("View all the triggers that were added in the server."),

    async execute(interaction, client) {
        triggerSchema.find({ Guild: interaction.guild.id }, async (err, data) => {
            if (err) throw err;

            const list = data.map((cmd, i) => `\`${cmd.Command}\``).join(", ");

            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setTitle(`Triggers in ${interaction.guild.name}`)
                        .setDescription(list || `<:error:1199434320960565388> There are no triggers in this guild yet!`)
                        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                ],
            });
            return;
        }).clone().catch(function (err) {
            console.log(err);
        });
    },
};