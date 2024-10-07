const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js");
const currencySchema = require("../../model/currency");

module.exports = {
    cooldown: 3,
    data: new SlashCommandBuilder()
        .setName("trade")
        .setDescription("Trade your shiny roles or event winner roles for something better!")
        .setDMPermission(false)
        .addSubcommand((subcommand) =>
            subcommand
                .setName("shiny")
                .setDescription("Trade your shiny roles for crystals!")
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("crystals")
                .setDescription("Trade shards for a crystal!")
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("trophy")
                .setDescription("Trade your event winner roles for a trophy!")
        ),

    async execute(interaction, client) {
        const subcommand = interaction.options.getSubcommand();

        let square = "629489060800364550";
        let triangle = "638997088100810762";
        let pentagon = "636899147760533534";
        let alpha = "638997094215974912";
        let event1 = "401203018370121740";
        let event2 = "1046536299747749998";
        let event3 = "1046536951437725807";
        let event4 = "1034295456458620968";

        let data = await currencySchema.findOne({ Guild: interaction.guild.id, UserID: interaction.user.id })

        switch (subcommand) {
            case "shiny":
                const row = new ActionRowBuilder()
                const yesButton = new ButtonBuilder()
                    .setCustomId("yes")
                    .setLabel("Confirm")
                    .setStyle(ButtonStyle.Success)
                const noButton = new ButtonBuilder()
                    .setCustomId("no")
                    .setLabel("Cancel")
                    .setStyle(ButtonStyle.Danger)
                row.addComponents(yesButton, noButton)

                if (!interaction.member.roles.cache.has(alpha)) {
                    await interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color)
                                .setDescription("<:error:1199434320960565388> You need the \`Green Alpha Pentagon\` role to use this command!\n\n>>> Tip: You can earn shiny roles through the Shiny Minigame.")
                        ],
                        ephemeral: true
                    })
                    return;
                }

                const eventMessage = await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(client.color)
                            .setDescription(`
                                By clicking the green button, all your shiny roles will be removed and you will be given \`x5\` <:crystal:1201612194387873863>. Are you sure you want to proceed?
                            `)
                    ],
                    components: [row]
                })

                const collector = eventMessage.createMessageComponentCollector({
                    componentType: ComponentType.Button,
                    time: 900000
                });

                collector.on("collect", async (i) => {
                    if (i.user.id != interaction.user.id) {
                        const embed = new EmbedBuilder()
                            .setColor(client.color)
                            .setDescription(`<:Error:977069715149160448> This interaction belongs to someone else.`);

                        await i.reply({
                            embeds: [embed],
                            ephemeral: true,
                        });
                        return;
                    } else {

                        switch (i.customId) {
                            case "yes":
                                if (!data) {
                                    data = new currencySchema({
                                        Guild: interaction.guild.id,
                                        UserID: interaction.user.id,
                                        Crystals: 5,
                                    })

                                    await data.save();

                                    await eventMessage.edit({
                                        embeds: [
                                            new EmbedBuilder()
                                                .setColor("#89FF69")
                                                .setDescription(`### Trade successful!\n\n>>> **Added:** \`x5\` <:crystal:1201612194387873863>\n**Removed:** <@&${alpha}>, <@&${pentagon}>, <@&${triangle}>, <@&${square}>`)
                                                .setTimestamp()
                                        ],
                                        components: []
                                    })
                                    return;
                                }

                                data.Crystals += 5
                                data.save();
                                await interaction.member.roles.remove([square, triangle, pentagon, alpha])

                                await eventMessage.edit({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor("#89FF69")
                                            .setDescription(`### Trade successful!\n\n>>> **Added:** \`x5\` <:crystal:1201612194387873863>\n**Removed:** <@&${alpha}>, <@&${pentagon}>, <@&${triangle}>, <@&${square}>`)
                                            .setTimestamp()
                                    ],
                                    components: []
                                })
                                break;

                            case "no":
                                await eventMessage.edit({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setTitle("Action Cancelled!")
                                    ],
                                    components: []
                                })
                                break;

                            default:
                                break;
                        }
                    }
                });
                collector.on("end", async (collected) => {
                    return;
                });
                break;

            case "trophy":
                if (!interaction.member.roles.cache.has(event4)) {
                    await interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color)
                                .setDescription("<:Error:977069715149160448> You need the \`Event Champion\` role to use this command!\n\n>>> Tip: You can earn event roles by winning events or by trading your shiny roles.")
                        ],
                        ephemeral: true
                    })
                    return;
                }

                const row2 = new ActionRowBuilder()
                const yesButton2 = new ButtonBuilder()
                    .setCustomId("yes2")
                    .setLabel("Confirm")
                    .setStyle(ButtonStyle.Success)
                const noButton2 = new ButtonBuilder()
                    .setCustomId("no2")
                    .setLabel("Cancel")
                    .setStyle(ButtonStyle.Danger)
                row2.addComponents(yesButton2, noButton2)

                const trophyMessage = await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(client.color)
                            .setDescription(`
                                By clicking the green button, all your event roles will be removed in exchange of \`x1\` 🏆. Are you sure you want to proceed?
                            `)
                    ],
                    components: [row2]
                })

                const trophyCollector = trophyMessage.createMessageComponentCollector({
                    componentType: ComponentType.Button,
                    time: 900000
                });

                trophyCollector.on("collect", async (i) => {
                    if (i.user.id != interaction.user.id) {
                        const embed = new EmbedBuilder()
                            .setColor(client.color)
                            .setDescription(`<:Error:977069715149160448> This interaction belongs to someone else.`);

                        await i.reply({
                            embeds: [embed],
                            ephemeral: true,
                        });
                        return;
                    } else {

                        switch (i.customId) {
                            case "yes2":
                                if (!data) {
                                    data = new currencySchema({
                                        Guild: interaction.guild.id,
                                        UserID: interaction.user.id,
                                        Trophies: 1,
                                    })

                                    await data.save();

                                    await interaction.member.roles.remove([event4, event3, event2, event1])

                                    await trophyMessage.edit({
                                        embeds: [
                                            new EmbedBuilder()
                                                .setColor("#89FF69")
                                                .setDescription(`### Trade successful!\n\n>>> **Added:** \`x1\` 🏆\n**Removed:** <@&${event4}>, <@&${event3}>, <@&${event2}>, <@&${event1}>`)
                                                .setTimestamp()
                                        ],
                                        components: []
                                    })
                                    return;
                                }

                                data.Trophies++;
                                await data.save();
                                await interaction.member.roles.remove([event4, event3, event2, event1])

                                await trophyMessage.edit({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor("#89FF69")
                                            .setDescription(`### Trade successful!\n\n>>> **Added:** \`x1\` 🏆\n**Removed:** <@&${event4}>, <@&${event3}>, <@&${event2}>, <@&${event1}>`)
                                            .setTimestamp()
                                    ],
                                    components: []
                                })
                                break;

                            case "no2":
                                await trophyMessage.edit({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setTitle("Action Cancelled!")
                                    ],
                                    components: []
                                })
                                break;

                            default:
                                break;
                        }
                    }
                });
                trophyCollector.on("end", async (collected) => {
                    return;
                });
                break;

            case "crystals":
                const row3 = new ActionRowBuilder()
                const yesButton3 = new ButtonBuilder()
                    .setCustomId("yes3")
                    .setLabel("Confirm")
                    .setStyle(ButtonStyle.Success)
                const noButton3 = new ButtonBuilder()
                    .setCustomId("no3")
                    .setLabel("Cancel")
                    .setStyle(ButtonStyle.Danger)
                row3.addComponents(yesButton3, noButton3)

                if (!data) {
                    await interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color)
                                .setDescription("<:Error:977069715149160448> You don't have enough crystal shards to use this command!\n\n>>> Tip: You can earn shards by running the \`/daily\` and the \`/gamble\` commands, or by winning events.")
                        ],
                        ephemeral: true
                    })
                    return;
                }

                if (data.Shards < 20) {
                    await interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color)
                                .setDescription("<:Error:977069715149160448> You don't have enough crystal shards to use this command!\n\n>>> Tip: You can earn shards by running the \`/daily\` and the \`/gamble\` commands, or by winning events.")
                        ],
                        ephemeral: true
                    })
                    return;
                }

                const shardMessage = await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(client.color)
                            .setDescription(`
                                By clicking the green button, \`x20\` <:shard:1201612239422115931> will be removed in exchange of \`x1\` <:crystal:1201612194387873863>. Are you sure you want to proceed?
                            `)
                    ],
                    components: [row3]
                })

                const shardCollector = shardMessage.createMessageComponentCollector({
                    componentType: ComponentType.Button,
                    time: 900000
                });

                shardCollector.on("collect", async (i) => {
                    if (i.user.id != interaction.user.id) {
                        const embed = new EmbedBuilder()
                            .setColor(client.color)
                            .setDescription(`<:Error:977069715149160448> This interaction belongs to someone else.`);

                        await i.reply({
                            embeds: [embed],
                            ephemeral: true,
                        });
                        return;
                    } else {

                        switch (i.customId) {
                            case "yes3":
                                data.Crystals++;
                                data.Shards -= 20;
                                await data.save();

                                await shardMessage.edit({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor("#89FF69")
                                            .setDescription(`### Trade successful!\n\n>>> **Added:** \`x1\` <:crystal:1201612194387873863>\n**Removed:** \`x20\` <:shard:1201612239422115931>`)
                                            .setTimestamp()
                                    ],
                                    components: []
                                })
                                break;

                            case "no3":
                                await shardMessage.edit({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setTitle("Action Cancelled!")
                                    ],
                                    components: []
                                })
                                break;

                            default:
                                break;
                        }
                    }
                });
                shardCollector.on("end", async (collected) => {
                    return;
                });
                break;

            default:
                break;
        }
    },
};