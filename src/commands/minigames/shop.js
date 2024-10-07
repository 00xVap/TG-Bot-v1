const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ComponentType } = require("discord.js");
const currencySchema = require("../../model/currency");

module.exports = {
    cooldown: 3,
    data: new SlashCommandBuilder()
        .setName("shop")
        .setDescription("Claim minigame rewards!")
        .setDMPermission(false),

    async execute(interaction, client) {

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(client.color)
                    .setDescription("<a:loading:1165898737772662875> Loading...")
            ],
        })

        let data = await currencySchema.findOne({ Guild: interaction.guild.id, UserID: interaction.user.id })
        if (!data) data = "0";

        let bronze = "1172067578735230976";
        let silver = "1172067626076340235";
        let gold = "1172067826639589387";
        let diamond = "1172067962967052289";
        let champion = "1172068003806990356";

        const crystalTiers = [
            {
                label: "🏆 Trophy",
                description: "20 Crystals | Rewards: 🏆 x1",
                value: "trophy"
            },
            {
                label: "🚬 Role",
                description: "10 Crystals | Rewards: 🚬 Role",
                value: "cigarette"
            },
            {
                label: "🍺 Role",
                description: "10 Crystals | Rewards: 🍺 Role",
                value: "beer"
            },
            {
                label: "🍔 Role",
                description: "10 Crystals | Rewards: 🍔 Role",
                value: "burger"
            },
            {
                label: "🚫THE WAT Role",
                description: "10 Crystals | Rewards: 🚫THE WAT Role",
                value: "the-wat"
            },
            {
                label: "(Fake) B🚫SS Role",
                description: "10 Crystals | Rewards:  b🚫ss ;) Role",
                value: "boss"
            },
            {
                label: "Church of Blokk Role",
                description: "10 Crystals | Rewards: Church of Blokk Role",
                value: "church"
            },
            {
                label: "Coffee Gang ☕",
                description: "10 Crystals | Rewards: Coffee Gang ☕ Role",
                value: "coffee"
            },
            {
                label: "Tea Club 🍵",
                description: "10 Crystals | Rewards: Tea Club 🍵 Role",
                value: "tea"
            },
            {
                label: "NICE Role",
                description: "10 Crystals | Rewards: nice. ;) Role",
                value: "nice"
            },
            {
                label: "PP Gang Role",
                description: "10 Crystals | Rewards: PP gang Role",
                value: "pp-gang"
            },
            {
                label: "E Gang Role",
                description: "10 Crystals | Rewards: e gang Role",
                value: "e-gang"
            },
        ]

        const trophyTiers = [
            {
                label: "TG CHAMPI🚫N",
                description: "🏆 x20 | Rewards: TG CHAMPI🚫N Role, x1 Monthly Nitro",
                value: "champion",
            },
            {
                label: "DIAM🚫ND",
                description: "🏆 x14 | Rewards: DIAM🚫ND Role, x1 Monthly Nitro",
                value: "diamond",
            },
            {
                label: "G🚫LD",
                description: "🏆 x9 | Rewards: G🚫LD Role, x1 Monthly Nitro",
                value: "gold",
            },
            {
                label: "🚫SILVER",
                description: "🏆 x5 | Rewards: 🚫SILVER Role, x1 Monthly Nitro",
                value: "silver",
            },
            {
                label: "BR🚫NZE",
                description: "🏆 x2 | Rewards: BR🚫NZE Role, x1 Monthly Nitro",
                value: "bronze",
            },
        ]

        const starTiers = [
            {
                label: "🍍 (1 Time Purchase)",
                description: "✨ x1 | Rewards: 🍍 Role",
                value: "pineapple"
            },
            {
                label: "DJ Role (1 Time Purchase)",
                description: "✨ x1 | Rewards: DJ Role",
                value: "dj"
            },
            {
                label: "10,000 Mee6 XP",
                description: "✨ x1 | Rewards: 10,000 Mee6 XP",
                value: "mee6"
            },
            {
                label: "Event Manager Role (Lasts 1 Week)",
                description: "✨ x2 | Rewards: Event Manager Role",
                value: "event-manager"
            },
            {
                label: "Free Unmute Role",
                description: "✨ x2 | Rewards: Free Unmute Role",
                value: "unmute"
            },
            {
                label: "x1 Monthly Nitro",
                description: "✨ x3 | Rewards: x1 Monthly Nitro",
                value: "nitro"
            },
        ]

        const crystalSelect = new StringSelectMenuBuilder()
            .setCustomId('crystalshop')
            .setPlaceholder("Crystal Shop")
            .addOptions(
                crystalTiers.map((tier) =>
                    new StringSelectMenuOptionBuilder()
                        .setLabel(tier.label)
                        .setDescription(tier.description)
                        .setValue(tier.value)
                )
            );

        const trophySelect = new StringSelectMenuBuilder()
            .setCustomId('trophyshop')
            .setPlaceholder("Trophy Shop")
            .addOptions(
                trophyTiers.map((tier) =>
                    new StringSelectMenuOptionBuilder()
                        .setLabel(tier.label)
                        .setDescription(tier.description)
                        .setValue(tier.value)
                )
            );

        const starSelect = new StringSelectMenuBuilder()
            .setCustomId('starshop')
            .setPlaceholder("Star Shop")
            .addOptions(
                starTiers.map((tier) =>
                    new StringSelectMenuOptionBuilder()
                        .setLabel(tier.label)
                        .setDescription(tier.description)
                        .setValue(tier.value)
                )
            );

        const row1 = new ActionRowBuilder().addComponents(crystalSelect)
        const row2 = new ActionRowBuilder().addComponents(trophySelect)
        const row3 = new ActionRowBuilder().addComponents(starSelect)

        const shopEmbed = new EmbedBuilder()
            .setColor(client.color)
            .setTitle("🚫 **TG Shop**")
            .setDescription(`Welcome to the **TG Shop**. Here you can claim items/rewards by getting a certain amount of currency items. Each dropdown menus acts like a different shop.`)
            .setFooter({ text: "Use the dropdown menus below to claim items." })

        if (!data) {
            shopEmbed.addFields(
                { name: "Crystals", value: `<:crystal:1201612194387873863> \`0\``, inline: true },
                { name: "Trophies", value: `🏆 \`0\``, inline: true },
                { name: "Stars", value: `✨ \`0\``, inline: true },
            )

            shop();
            return;
        }

        shopEmbed.addFields(
            { name: "Crystals", value: `<:crystal:1201612194387873863> \`x${data.Crystals}\``, inline: true },
            { name: "Trophies", value: `🏆 \`x${data.Trophies}\``, inline: true },
            { name: "Stars", value: `✨ \`x${data.Stars}\``, inline: true },
        )

        shop();

        async function shop() {

            const shopMessage = await interaction.editReply({
                embeds: [shopEmbed],
                components: [row1, row2, row3]
            })

            const shopCollector = shopMessage.createMessageComponentCollector({
                componentType: ComponentType.StringSelect,
                time: 900000
            });

            shopCollector.on("collect", async (int) => {
                if (int.user.id != interaction.user.id) {
                    const embed = new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`<:Error:977069715149160448> This interaction belongs to someone else.`);

                    await int.reply({
                        embeds: [embed],
                        ephemeral: true,
                    });
                    return;
                }

                const selection = int.values[0];

                if (int.customId === "crystalshop") {
                    switch (selection) {
                        case "trophy":
                            if (!data) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription(`<:Error:977069715149160448> You don't have enough crystals to buy this item!`)
                                    ],
                                    ephemeral: true,
                                });
                                return;
                            }

                            if (data.Crystals < 20) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription(`<:Error:977069715149160448> You don't have enough crystals to buy this item!`)
                                    ],
                                    ephemeral: true,
                                });
                                return;
                            }

                            data.Trophies++;
                            data.Crystals -= 20;
                            data.save();

                            await int.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor("#89FF69")
                                        .setDescription(`### Transaction successful!\n\n>>> **Added:** \`x1\` 🏆\n**Removed:** \`x20\` <:crystal:1201612194387873863>`)
                                        .setTimestamp()
                                ],
                                components: []
                            })
                            break;

                        case "cigarette":
                            if (int.member.roles.cache.has("611678064644194333")) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription(`<:Error:977069715149160448> You have already purchased this item!`)
                                    ],
                                    ephemeral: true,
                                });
                                return;
                            }

                            if (!data) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough crystals to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            if (data.Crystals < 10) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough crystals to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            int.member.roles.add("611678064644194333")

                            data.Crystals -= 10
                            data.save();

                            await int.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor("#89FF69")
                                        .setDescription(`### Transaction successful!\n\n>>> **Added:** <@&611678064644194333>\n**Removed:** \`x10\` <:crystal:1201612194387873863>`)
                                        .setTimestamp()
                                ],
                                components: []
                            })
                            break;

                        case "beer":
                            if (int.member.roles.cache.has("619693766441435136")) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription(`<:Error:977069715149160448> You have already purchased this item!`)
                                    ],
                                    ephemeral: true,
                                });
                                return;
                            }

                            if (!data) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough crystals to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            if (data.Crystals < 10) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough crystals to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            int.member.roles.add("619693766441435136")

                            data.Crystals -= 10
                            data.save();

                            await int.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor("#89FF69")
                                        .setDescription(`### Transaction successful!\n\n>>> **Added:** <@&619693766441435136>\n**Removed:** \`x10\` <:crystal:1201612194387873863>`)
                                        .setTimestamp()
                                ],
                                components: []
                            })
                            break;

                        case "burger":
                            if (int.member.roles.cache.has("685863261773758496")) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription(`<:Error:977069715149160448> You have already purchased this item!`)
                                    ],
                                    ephemeral: true,
                                });
                                return;
                            }

                            if (!data) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough crystals to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            if (data.Crystals < 10) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough crystals to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            int.member.roles.add("685863261773758496")

                            data.Crystals -= 10
                            data.save();

                            await int.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor("#89FF69")
                                        .setDescription(`### Transaction successful!\n\n>>> **Added:** <@&685863261773758496>\n**Removed:** \`x10\` <:crystal:1201612194387873863>`)
                                        .setTimestamp()
                                ],
                                components: []
                            })
                            break;

                        case "the-wat":
                            if (int.member.roles.cache.has("684601312922566662")) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription(`<:Error:977069715149160448> You have already purchased this item!`)
                                    ],
                                    ephemeral: true,
                                });
                                return;
                            }

                            if (!data) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough crystals to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            if (data.Crystals < 10) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough crystals to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            int.member.roles.add("684601312922566662")

                            data.Crystals -= 10
                            data.save();

                            await int.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor("#89FF69")
                                        .setDescription(`### Transaction successful!\n\n>>> **Added:** <@&684601312922566662>\n**Removed:** \`x10\` <:crystal:1201612194387873863>`)
                                        .setTimestamp()
                                ],
                                components: []
                            })
                            break;

                        case "boss":
                            if (int.member.roles.cache.has("908512917878628362")) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription(`<:Error:977069715149160448>You have already purchased this item!`)
                                    ],
                                    ephemeral: true,
                                });
                                return;
                            }

                            if (!data) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough crystals to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            if (data.Crystals < 10) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough crystals to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            int.member.roles.add("908512917878628362")

                            data.Crystals -= 10
                            data.save();

                            await int.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor("#89FF69")
                                        .setDescription(`### Transaction successful!\n\n>>> **Added:** <@&908512917878628362>\n**Removed:** \`x10\` <:crystal:1201612194387873863>`)
                                        .setTimestamp()
                                ],
                                components: []
                            })
                            break;

                        case "church":
                            if (int.member.roles.cache.has("710527104659488768")) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription(`<:Error:977069715149160448> You have already purchased this item!`)
                                    ],
                                    ephemeral: true,
                                });
                                return;
                            }

                            if (!data) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough crystals to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            if (data.Crystals < 10) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough crystals to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            int.member.roles.add("710527104659488768")

                            data.Crystals -= 10
                            data.save();

                            await int.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor("#89FF69")
                                        .setDescription(`### Transaction successful!\n\n>>> **Added:** <@&710527104659488768>\n**Removed:** \`x10\` <:crystal:1201612194387873863>`)
                                        .setTimestamp()
                                ],
                                components: []
                            })
                            break;

                        case "coffee":
                            if (int.member.roles.cache.has("720387170451587193")) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription(`<:Error:977069715149160448> You have already purchased this item!`)
                                    ],
                                    ephemeral: true,
                                });
                                return;
                            }

                            if (!data) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough crystals to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            if (data.Crystals < 10) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough crystals to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            int.member.roles.add("720387170451587193")

                            data.Crystals -= 10
                            data.save();

                            await int.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor("#89FF69")
                                        .setDescription(`### Transaction successful!\n\n>>> **Added:** <@&720387170451587193>\n**Removed:** \`x10\` <:crystal:1201612194387873863>`)
                                        .setTimestamp()
                                ],
                                components: []
                            })
                            break;

                        case "tea":
                            if (int.member.roles.cache.has("720387947815501945")) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription(`<:Error:977069715149160448> You have already purchased this item!`)
                                    ],
                                    ephemeral: true,
                                });
                                return;
                            }

                            if (!data) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough crystals to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            if (data.Crystals < 10) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough crystals to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            int.member.roles.add("720387947815501945")

                            data.Crystals -= 10
                            data.save();

                            await int.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor("#89FF69")
                                        .setDescription(`### Transaction successful!\n\n>>> **Added:** <@&720387947815501945>\n**Removed:** \`x10\` <:crystal:1201612194387873863>`)
                                        .setTimestamp()
                                ],
                                components: []
                            })
                            break;

                        case "nice":
                            if (int.member.roles.cache.has("1126681540324249610")) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription(`<:Error:977069715149160448> You have already purchased this item!`)
                                    ],
                                    ephemeral: true,
                                });
                                return;
                            }

                            if (!data) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough crystals to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            if (data.Crystals < 10) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough crystals to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            int.member.roles.add("1126681540324249610")

                            data.Crystals -= 10
                            data.save();

                            await int.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor("#89FF69")
                                        .setDescription(`### Transaction successful!\n\n>>> **Added:** <@&1126681540324249610>\n**Removed:** \`x10\` <:crystal:1201612194387873863>`)
                                        .setTimestamp()
                                ],
                                components: []
                            })
                            break;

                        case "pp-gang":
                            if (int.member.roles.cache.has("701976514459205672")) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription(`<:Error:977069715149160448> You have already purchased this item!`)
                                    ],
                                    ephemeral: true,
                                });
                                return;
                            }

                            if (!data) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough crystals to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            if (data.Crystals < 10) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough crystals to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            int.member.roles.add("701976514459205672")

                            data.Crystals -= 10
                            data.save();

                            await int.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor("#89FF69")
                                        .setDescription(`### Transaction successful!\n\n>>> **Added:** <@&701976514459205672>\n**Removed:** \`x10\` <:crystal:1201612194387873863>`)
                                        .setTimestamp()
                                ],
                                components: []
                            })
                            break;

                        case "e-gang":
                            if (int.member.roles.cache.has("837469408581910548")) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription(`<:Error:977069715149160448> You have already purchased this item!`)
                                    ],
                                    ephemeral: true,
                                });
                                return;
                            }

                            if (!data) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough crystals to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            if (data.Crystals < 10) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough crystals to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            int.member.roles.add("837469408581910548")

                            data.Crystals -= 10
                            data.save();

                            await int.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor("#89FF69")
                                        .setDescription(`### Transaction successful!\n\n>>> **Added:** <@&837469408581910548>\n**Removed:** \`x10\` <:crystal:1201612194387873863>`)
                                        .setTimestamp()
                                ],
                                components: []
                            })
                            break;

                        default:
                            break;
                    }
                }

                if (int.customId === "trophyshop") {
                    let staffChannel = client.channels.cache.get("358710890356408323")

                    switch (selection) {
                        case "bronze":
                            if (int.member.roles.cache.has(bronze)) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription(`<:Error:977069715149160448> You have already claimed this tier!`)
                                    ],
                                    ephemeral: true,
                                });
                                return;
                            }

                            if (!data) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough trophies to claim this tier!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            if (data.Trophies < 2) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough trophies to claim this tier!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            await int.member.roles.add(bronze)

                            await int.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor("#89FF69")
                                        .setTitle("**Tier Claimed!**")
                                        .setDescription(`**Rewards:** <@&${bronze}>, \`x1\` <:nitro:1170971791422922762> Monthly Nitro\n\n*The staff have been notified to buy your nitro, be patient!*`)
                                        .setTimestamp()
                                ],
                                components: [],
                            })

                            /*await staffChannel.send({
                                content: "<@347075570208866305>, <@380933616898932746>",
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor(client.color)
                                        .setDescription(`<@${int.user.id}> has claimed the \`BR🚫NZE\` tier and is awaiting \`x1\` <:nitro:1170971791422922762> Monthly Nitro!`)
                                ]
                            })*/
                            break;
                        case "silver":
                            if (int.member.roles.cache.has(silver)) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription(`<:Error:977069715149160448> You have already claimed this tier!`)
                                    ],
                                    ephemeral: true,
                                });
                                return;
                            }

                            if (!data) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough trophies to claim this tier!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            if (data.Trophies < 5) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough trophies to claim this tier!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            if (!int.member.roles.cache.has(bronze)) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You have to claim the \`BR🚫NZE\` tier before claiming this tier!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            await int.member.roles.add(silver)

                            await int.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor("#89FF69")
                                        .setTitle("**Tier Claimed!**")
                                        .setDescription(`**Rewards:** <@&${silver}>, \`1x\` <:nitro:1170971791422922762> Monthly Nitro\n\n*The staff have been notified to buy your nitro, be patient!*`)
                                        .setTimestamp()
                                ],
                                components: [],
                            })

                            /*await staffChannel.send({
                                content: "<@347075570208866305>, <@380933616898932746>",
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor(client.color)
                                        .setDescription(`<@${int.user.id}> has claimed the \`🚫SILVER\` tier and is awaiting \`x1\` <:nitro:1170971791422922762> Monthly Nitro!`)
                                ]
                            })*/
                            break;
                        case "gold":
                            if (int.member.roles.cache.has(gold)) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription(`<:Error:977069715149160448> You have already claimed this tier!`)
                                    ],
                                    ephemeral: true,
                                });
                                return;
                            }

                            if (!data) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough trophies to claim this tier!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            if (data.Trophies < 9) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough trophies to claim this tier!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            if (!int.member.roles.cache.has(silver)) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You have to claim the \`🚫SILVER\` tier before claiming this tier!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            await int.member.roles.add(gold)

                            await int.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor("#89FF69")
                                        .setTitle("**Tier Claimed!**")
                                        .setDescription(`**Rewards:** <@&${gold}>, \`1x\` <:nitro:1170971791422922762> Monthly Nitro\n\n*The staff have been notified to buy your nitro, be patient!*`)
                                        .setTimestamp()
                                ],
                                components: [],
                            })

                            /*await staffChannel.send({
                                content: "<@347075570208866305>, <@380933616898932746>",
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor(client.color)
                                        .setDescription(`<@${int.user.id}> has claimed the \`G🚫LD\` tier and is awaiting \`x1\` <:nitro:1170971791422922762> Monthly Nitro!`)
                                ]
                            })*/
                            break;
                        case "diamond":
                            if (int.member.roles.cache.has(diamond)) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription(`<:Error:977069715149160448> You have already claimed this tier!`)
                                    ],
                                    ephemeral: true,
                                });
                                return;
                            }

                            if (!data) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough trophies to claim this tier!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            if (data.Trophies < 14) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough trophies to claim this tier!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            if (!int.member.roles.cache.has(gold)) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You have to claim the \`G🚫LD\` tier before claiming this tier!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            await int.member.roles.add(diamond)

                            await int.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor("#89FF69")
                                        .setTitle("**Tier Claimed!**")
                                        .setDescription(`**Rewards:** <@&${diamond}>, \`1x\` <:nitro:1170971791422922762> Monthly Nitro\n\n*The staff have been notified to buy your nitro, be patient!*`)
                                        .setTimestamp()
                                ],
                                components: [],
                            })

                            /*await staffChannel.send({
                                content: "<@347075570208866305>, <@380933616898932746>",
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor(client.color)
                                        .setDescription(`<@${int.user.id}> has claimed the \`DIAM🚫ND\` tier and is awaiting \`x1\` <:nitro:1170971791422922762> Monthly Nitro!`)
                                ]
                            })*/
                            break;
                        case "champion":
                            if (int.member.roles.cache.has(champion)) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription(`<:Error:977069715149160448> You have already claimed this tier!`)
                                    ],
                                    ephemeral: true,
                                });
                                return;
                            }

                            if (!data) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough trophies to claim this tier!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            if (data.Trophies < 20) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough trophies to claim this tier!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            if (!int.member.roles.cache.has(diamond)) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You have to claim the \`DIAM🚫ND\` tier before claiming this tier!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            await int.member.roles.add(champion);

                            await int.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor("#89FF69")
                                        .setTitle("**Tier Claimed!**")
                                        .setDescription(`**Rewards:** <@&${champion}>, \`1x\` <:nitro:1170971791422922762> Monthly Nitro\n\n*The staff have been notified to buy your nitro, be patient!*`)
                                        .setTimestamp()
                                ],
                                components: [],
                            })

                            /*await staffChannel.send({
                                content: "<@347075570208866305>, <@380933616898932746>",
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor(client.color)
                                        .setDescription(`<@${int.user.id}> has claimed the \`TG CHAMPI🚫N\` tier and is awaiting \`x1\` <:nitro:1170971791422922762> Monthly Nitro!`)
                                ]
                            })*/
                            break;

                        default:
                            break;
                    }
                }

                if (int.customId === "starshop") {
                    let staffChannel = client.channels.cache.get("358710890356408323")

                    switch (selection) {
                        case "pineapple":
                            if (int.member.roles.cache.has("610629112771510280")) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription(`<:Error:977069715149160448> You have already purchased this item!`)
                                    ],
                                    ephemeral: true,
                                });
                                return;
                            }

                            if (!data) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough stars to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            if (data.Stars < 1) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough stars to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            int.member.roles.add("610629112771510280")

                            data.Stars -= 1
                            data.save();

                            await int.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor("#89FF69")
                                        .setDescription(`### Transaction successful!\n\n>>> **Added:** <@&610629112771510280>\n**Removed:** \`x1\` ✨`)
                                        .setTimestamp()
                                ],
                                components: []
                            })
                            break;

                        case "dj":
                            if (int.member.roles.cache.has("398875668328218626")) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription(`<:Error:977069715149160448> You have already purchased this item!`)
                                    ],
                                    ephemeral: true,
                                });
                                return;
                            }

                            if (!data) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough stars to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            if (data.Stars < 1) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough stars to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            int.member.roles.add("398875668328218626")

                            data.Stars -= 1
                            data.save();

                            await int.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor("#89FF69")
                                        .setDescription(`### Transaction successful!\n\n>>> **Added:** <@&398875668328218626>\n**Removed:** \`x1\` ✨`)
                                        .setTimestamp()
                                ],
                                components: []
                            })
                            break;

                        case "mee6":
                            if (!data) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough stars to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            if (data.Stars < 1) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough stars to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            data.Stars -= 1
                            data.save();

                            await int.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor("#89FF69")
                                        .setDescription(`### Transaction successful!\n\n>>> **Added:** \`10,000 Mee6 XP\` (The staff has been notified, be patient!) \n**Removed:** \`x1\` ✨`)
                                        .setTimestamp()
                                ],
                                components: []
                            })

                            await staffChannel.send({
                                content: "<@&568607810913304608>",
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor(client.color)
                                        .setDescription(`<@${int.user.id}> has purchased the \`10,000 Mee6 XP\` item and is awaiting their reward!`)
                                ]
                            })
                            break;

                        case "event-manager":
                            if (int.member.roles.cache.has("965789739804405800")) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription(`<:Error:977069715149160448> You have already purchased this item!`)
                                    ],
                                    ephemeral: true,
                                });
                                return;
                            }

                            if (!data) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough stars to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            if (data.Stars < 2) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough stars to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            int.member.roles.add("965789739804405800")

                            setTimeout(async () => {
                                await int.member.roles.remove("965789739804405800")

                                try {
                                    await int.user.send({
                                        embeds: [
                                            new EmbedBuilder()
                                                .setColor(client.color)
                                                .setDescription(`Your \`Event Manager Role\` item has expired!`)
                                        ],
                                    })
                                } catch (error) {
                                    return;
                                }
                            }, 86400000 * 7)

                            data.Stars -= 2
                            data.save();

                            await int.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor("#89FF69")
                                        .setDescription(`### Transaction successful!\n\n>>> **Added:** <@&965789739804405800>\n**Removed:** \`x2\` ✨`)
                                        .setTimestamp()
                                ],
                                components: []
                            })
                            break;

                        case "unmute":
                            if (int.member.roles.cache.has("1178540559875449022")) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription(`<:Error:977069715149160448> You have already purchased this item!`)
                                    ],
                                    ephemeral: true,
                                });
                                return;
                            }

                            if (!data) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough stars to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            if (data.Stars < 2) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough stars to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            int.member.roles.add("1178540559875449022")

                            data.Stars -= 2
                            data.save();

                            await int.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor("#89FF69")
                                        .setDescription(`### Transaction successful!\n\n>>> **Added:** <@&1178540559875449022>\n**Removed:** \`x2\` ✨`)
                                        .setTimestamp()
                                ],
                                components: []
                            })
                            break;

                        case "nitro":
                            if (!data) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough stars to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            if (data.Stars < 3) {
                                await int.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription("<:Error:977069715149160448> You don't have enough stars to purchase this item!")
                                    ],
                                    ephemeral: true
                                })
                                return;
                            }

                            data.Stars -= 3
                            data.save();

                            await int.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor("#89FF69")
                                        .setDescription(`### Transaction successful!\n\n>>> **Added:** \`x1\` <:nitro:1170971791422922762> Monthly Nitro (The staff has been notified, be patient!) \n**Removed:** \`x3\` ✨`)
                                        .setTimestamp()
                                ],
                                components: []
                            })

                            await staffChannel.send({
                                content: "<@347075570208866305>, <@380933616898932746>",
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor(client.color)
                                        .setDescription(`<@${int.user.id}> has purchased the \`x1\` <:nitro:1170971791422922762> Monthly Nitro item and is awaiting their reward!`)
                                ]
                            })
                            break;

                        default:
                            break;
                    }
                }
            })
        }
    }
}