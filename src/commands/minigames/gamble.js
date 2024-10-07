const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const currencySchema = require("../../model/currency");
const moment = require("moment");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("gamble")
        .setDMPermission(false)
        .setDescription("Gamble 1-5 crystal shards every 12h!")
        .addIntegerOption(option =>
            option.setName('quantity')
                .setDescription('The quantity of crystal shards to gamble.')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(5)
        ),

    async execute(interaction, client) {
        const input = interaction.options.getInteger("quantity")

        const query = {
            Guild: interaction.guild.id,
            UserID: interaction.user.id,
        };

        let data = await currencySchema.findOne(query);
        let timeout = 43200000;
        const random = Math.floor(Math.random() * 100) + 1;

        if (!data) {
            data = new currencySchema({
                ...query,
            })
        }

        if (input > data.Shards) {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`<:Error:977069715149160448> You dont have enough shards to gamble!.`)
                ],
                ephemeral: true
            });
            return;
        }

        if (!data.LastGamble || data.LastGamble === undefined) {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription("<a:loading:1165898737772662875> Loading...")
                ]
            })

            if (random <= 40) {
                data.Shards -= input;
                data.LastGamble = Date.now()
                data.save();

                await interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(client.color)
                            .setDescription(`You lost \`x${input}\` <:shard:1201612239422115931>. Better luck next time!`)
                    ]
                })
            } else if (random >= 41) {
                data.Shards += input;
                data.LastGamble = Date.now()
                data.save();

                await interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(client.color)
                            .setDescription(`You have won \`x${input}\` <:shard:1201612239422115931>!.`)
                    ]
                })
                return;
            }
            return;
        }

        if (timeout - (Date.now() - data.LastGamble) > 0) {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`<:Error:977069715149160448> You have already gambled! Come back <t:${moment(data.LastGamble).unix() + 43200}:R>.`)
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

        if (random <= 40) {
            data.Shards -= input;
            data.LastGamble = Date.now();
            data.save();

            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`You lost \`x${input}\` <:shard:1201612239422115931>. Better luck next time!`)
                ]
            })
        } else if (random >= 41) {
            data.Shards += input;
            data.LastGamble = Date.now();
            data.save();

            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`You have won \`x${input}\` <:shard:1201612239422115931>!.`)
                ]
            })
            return;
        }
    },
};