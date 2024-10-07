const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const currencySchema = require("../../model/currency");
const moment = require("moment");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("daily")
        .setDMPermission(false)
        .setDescription("Claim 1-5 crystal shards everyday!"),

    async execute(interaction, client) {
        const query = {
            Guild: interaction.guild.id,
            UserID: interaction.user.id,
        };

        let data = await currencySchema.findOne(query);
        let timeout = 86400000;
        const random = Math.floor(Math.random() * 5) + 1;

        if (!data) {
            data = new currencySchema({
                ...query,
            })
        }

        if (!data.LastDaily || data.LastDaily === undefined) {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription("<a:loading:1165898737772662875> Loading...")
                ]
            })

            data.LastDaily = Date.now()
            data.Shards += random;
            await data.save()

            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`You have claimed \`x${random}\` <:shard:1201612239422115931>!`)
                ]
            });
            return;
        }

        if (timeout - (Date.now() - data.LastDaily) > 0) {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`<:Error:977069715149160448> You have already claimed your daily! Come back <t:${moment(data.LastDaily).unix() + 86400}:R>.`)
                ],
                ephemeral: true
            });
            return;
        }

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(client.color)
                    .setDescription("<a:loading:1165898737772662875> Loading...")
            ]
        })

        data.LastDaily = Date.now()
        data.Shards += random;
        await data.save()

        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setColor(client.color)
                    .setDescription(`You have claimed \`x${random}\` <:shard:1201612239422115931>!`)
            ]
        })
    },
};