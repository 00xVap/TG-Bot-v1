const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, ComponentType, StringSelectMenuOptionBuilder } = require("discord.js");
const currencySchema = require("../../model/currency");

module.exports = {
    cooldown: 3,
    data: new SlashCommandBuilder()
        .setName("leaderboard")
        .setDescription("View the shiny and trophy leaderboards.")
        .setDMPermission(false),

    async execute(interaction, client) {
        const lb = [
            {
                label: "Square Leaderboard",
                description: "View the shiny squares leaderboard. (Top 10)",
                value: "square",
                emoji: "1130208810594734090"
            },
            {
                label: "Triangle Leaderboard",
                description: "View the shiny triangles leaderboard. (Top 10)",
                value: "triangle",
                emoji: "1213957460940038194"
            },
            {
                label: "Crystal Leaderboard",
                description: "View the crystal leaderboard. (Top 10)",
                value: "crystal",
                emoji: "1176063720892399686"
            },
            {
                label: "Trophy Leaderboard",
                description: "View the trophy leaderboard. (Top 10)",
                value: "trophy",
                emoji: "🏆"
            },
            {
                label: "Star Leaderboard",
                description: "View the star leaderboard. (Top 10)",
                value: "star",
                emoji: "✨"
            },
        ]

        const users1 = await currencySchema.find({ Guild: interaction.guild.id })
            .then(users => users.filter(user => user.Shinies > 0))

        if (!users1) {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription("<:Error:977069715149160448> Nobody has been ranked yet!")
                ]
            })
        }

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(client.color)
                    .setDescription("<a:loading:1165898737772662875> Loading...")
            ]
        })

        const sortedSquareUsers = users1.sort((a, b) => {
            return b.Shinies - a.Shinies
        }).slice(0, 10)

        const lbSelect = new StringSelectMenuBuilder()
            .setCustomId('lbmenu')
            .addOptions(
                lb.map((tier) =>
                    new StringSelectMenuOptionBuilder()
                        .setLabel(tier.label)
                        .setDescription(tier.description)
                        .setValue(tier.value)
                        .setEmoji(tier.emoji)
                )
            );

        const row = new ActionRowBuilder().addComponents(lbSelect)

        const lbMessage = await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle("**Shiny Square Leaderboard**")
                    .setThumbnail("https://cdn.discordapp.com/emojis/1130208810594734090.png?quality=lossless")
                    .setDescription(sortedSquareUsers.map((user, index) => {
                        return `\`[ ${index + 1} ]\` <@${user.UserID}> - <:GreenSquare:1130208810594734090> \`${user.Shinies}\``
                    }).join("\n"))
                    .setTimestamp()
            ],
            components: [row]
        })

        const lbCollector = lbMessage.createMessageComponentCollector({
            componentType: ComponentType.StringSelect,
            time: 900000
        });

        lbCollector.on("collect", async (int) => {
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

            await int.deferUpdate()

            switch (selection) {
                case "triangle":
                    const users6 = await currencySchema.find({ Guild: interaction.guild.id })
                        .then(users => users.filter(user => user.Triangles > 0))

                    if (!users6) {
                        await int.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(client.color)
                                    .setDescription("<:Error:977069715149160448> Nobody has been ranked yet!")
                            ]
                        })
                    }

                    const sortedTriangleUsers = users6.sort((a, b) => {
                        return b.Triangles - a.Triangles
                    }).slice(0, 10)

                    await int.editReply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color)
                                .setTitle("**Shiny Triangle Leaderboard**")
                                .setThumbnail("https://cdn.discordapp.com/emojis/1213957460940038194.webp?size=96&quality=lossless")
                                .setDescription(sortedTriangleUsers.map((user, index) => {
                                    return `\`[ ${index + 1} ]\` <@${user.UserID}> - <:GreenTriangle:1213957460940038194> \`${user.Triangles}\``
                                }).join("\n") || "Nobody has been ranked yet.")
                                .setTimestamp()
                        ],
                        components: [row]
                    })
                    break;
                case "square":
                    const users1 = await currencySchema.find({ Guild: interaction.guild.id })
                        .then(users => users.filter(user => user.Shinies > 0))

                    if (!users1) {
                        await int.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(client.color)
                                    .setDescription("<:Error:977069715149160448> Nobody has been ranked yet!")
                            ]
                        })
                    }

                    const sortedShinyUsers = users1.sort((a, b) => {
                        return b.Shinies - a.Shinies
                    }).slice(0, 10)

                    await int.editReply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color)
                                .setTitle("**Shiny Square Leaderboard**")
                                .setThumbnail("https://cdn.discordapp.com/emojis/1130208810594734090.png?quality=lossless")
                                .setDescription(sortedShinyUsers.map((user, index) => {
                                    return `\`[ ${index + 1} ]\` <@${user.UserID}> - <:GreenSquare:1130208810594734090> \`${user.Shinies}\``
                                }).join("\n") || "Nobody has been ranked yet.")
                                .setTimestamp()
                        ],
                        components: [row]
                    })
                    break;

                case "crystal":
                    const users3 = await currencySchema.find({ Guild: interaction.guild.id })
                        .then(users => users.filter(user => user.Crystals > 0))

                    const sortedCrystalUsers = users3.sort((a, b) => {
                        return b.Crystals - a.Crystals
                    }).slice(0, 10)

                    await int.editReply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color)
                                .setTitle("**Crystal Leaderboard**")
                                .setThumbnail("https://cdn.discordapp.com/emojis/1176063720892399686.png?quality=lossless")
                                .setDescription(sortedCrystalUsers.map((user, index) => {
                                    return `\`[ ${index + 1} ]\` <@${user.UserID}> - <:crystal:1201612194387873863> \`${user.Crystals}\``
                                }).join("\n") || "Nobody has been ranked yet.")
                                .setTimestamp()
                        ],
                        components: [row]
                    })
                    break;

                case "trophy":
                    const users4 = await currencySchema.find({ Guild: interaction.guild.id })
                        .then(users => users.filter(user => user.Trophies > 0))

                    const sortedTrophyUsers = users4.sort((a, b) => {
                        return b.Trophies - a.Trophies
                    }).slice(0, 10)

                    await interaction.editReply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color)
                                .setTitle("🏆 **Trophy Leaderboard**")
                                .setDescription(sortedTrophyUsers.map((user, index) => {
                                    return `\`[ ${index + 1} ]\` <@${user.UserID}> - 🏆 \`${user.Trophies}\``
                                }).join("\n") || "Nobody has been ranked yet.")
                                .setTimestamp()
                        ],
                        components: [row]
                    })
                    break;

                case "star":
                    const users5 = await currencySchema.find({ Guild: interaction.guild.id })
                        .then(users => users.filter(user => user.Stars > 0))

                    const sortedStarUsers = users5.sort((a, b) => {
                        return b.Stars - a.Stars
                    }).slice(0, 10)

                    await int.editReply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color)
                                .setTitle("✨ **Star Leaderboard**")
                                .setDescription(sortedStarUsers.map((user, index) => {
                                    return `\`[ ${index + 1} ]\` <@${user.UserID}> - ✨ \`${user.Stars}\``
                                }).join("\n") || "Nobody has been ranked yet.")
                                .setTimestamp()
                        ]
                    })
                    break;

                default:
                    break;
            }
        })
    }
}
