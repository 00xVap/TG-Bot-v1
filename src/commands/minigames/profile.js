const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const currencySchema = require("../../model/currency");
const moment = require("moment");

module.exports = {
    cooldown: 3,
    data: new SlashCommandBuilder()
        .setName("profile")
        .setDMPermission(false)
        .setDescription("Returns your or another user's minigame statistics.")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("User you want to get statistics from.")
        ),

    async execute(interaction, client) {
        let target = interaction.options.getUser("user") || interaction.user;

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(client.color)
                    .setDescription("<a:loading:1165898737772662875> Loading...")
            ]
        })

        let data = await currencySchema.findOne({ Guild: interaction.guild.id, UserID: target.id })
        if (!data) data = "0";

        const statEmbed = new EmbedBuilder()
            .setColor(client.color)
            .setTitle(target.username)
            .setThumbnail(target.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .addFields(
                { name: "Items/Stats", value: `**Squares Destroyed:** <:GreenSquare:1130208810594734090> \`x${data.Shinies || "0"}\`\n**Triangles Destroyed:** <:GreenTriangle:1213957460940038194> \`x${data.Triangles || "0"}\`\n**Crystal Shards:** <:shard:1201612239422115931> \`x${data.Shards || "0"}\`\n**Crystals:** <:crystal:1201612194387873863> \`x${data.Crystals || "0"}\`\n**Trophies:** 🏆 \`x${data.Trophies || "0"}\`\n**Stars:** ✨ \`x${data.Stars || "0"}\``, inline: true },
                { name: "Cooldowns", value: `**Daily:** ${`<t:${moment(data.LastDaily).unix() + 86400}:R>` || "Not claimed yet."}\n**Gamble:** ${`<t:${moment(data.LastGamble).unix() + 43200}:R>` || "Not claimed yet."}`, inline: true },
            )

        await interaction.editReply({
            embeds: [statEmbed],
        })
    },
};