const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const currencySchema = require("../../model/currency")

module.exports = {
    cooldown: 3,
    data: new SlashCommandBuilder()
        .setName("item")
        .setDescription("Edit minigame stats of TG BOt.")
        .setDMPermission(false)
        .addSubcommand((subcommand) =>
            subcommand
                .setName("give")
                .setDescription("Give items to a user.")
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('The user to give the item to.')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('item')
                        .setDescription('The item to give to the user.')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Green Square', value: 'square' },
                            { name: 'Green Triangle', value: 'triangle' },
                            { name: 'Shard', value: 'shard' },
                            { name: 'Crystal', value: 'crystal' },
                            { name: 'Trophy', value: 'trophy' },
                            { name: 'Star', value: 'star' },
                        ))
                .addNumberOption(option =>
                    option.setName('quantity')
                        .setDescription('The quantity of the item to give.')
                        .setRequired(true))
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("remove")
                .setDescription("Remove items from a user.")
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('The user to remove the item from.')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('item')
                        .setDescription('The item to to remove from the user.')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Green Square', value: 'square' },
                            { name: 'Green Triangle', value: 'triangle' },
                            { name: 'Shard', value: 'shard' },
                            { name: 'Crystal', value: 'crystal' },
                            { name: 'Trophy', value: 'trophy' },
                            { name: 'Star', value: 'star' },
                        ))
                .addNumberOption(option =>
                    option.setName('quantity')
                        .setMinValue(1)
                        .setDescription('The quantity of the item to remove.')
                        .setRequired(true))
        ),

    async execute(interaction, client) {
        const subcommand = interaction.options.getSubcommand();

        const user = interaction.options.getUser("user");
        const item = interaction.options.getString("item");
        const quantity = interaction.options.getNumber("quantity");

        let member = interaction.guild.members.cache.get(user.id);

        let data = await currencySchema.findOne({ Guild: interaction.guild.id, UserID: user.id })

        switch (subcommand) {
            case "give":
                if (!interaction.member.roles.cache.has("965789739804405800")) {
                    await interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color)
                                .setDescription("<:Error:977069715149160448> You don't have enough permissions to use this command!")
                        ],
                        ephemeral: true
                    })
                    return;
                }

                await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(client.color)
                            .setDescription("<a:loading:1165898737772662875> Loading...")
                    ]
                })

                switch (item) {
                    case "square":
                        if (!data) {
                            data = new currencySchema({
                                Guild: interaction.guild.id,
                                UserID: user.id,
                                Shinies: quantity,
                            })

                            await data.save();

                            await interaction.editReply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor(client.color)
                                        .setDescription(`\`x${quantity}\` <:GreenSquare:1130208810594734090> has been given to \`${user.username}\`.`)
                                ]
                            })
                            return;
                        }

                        data.Shinies += quantity
                        data.save();

                        await interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(client.color)
                                    .setDescription(`\`x${quantity}\` <:GreenSquare:1130208810594734090> has been given to \`${user.username}\`.`)
                            ]
                        })
                        break;

                    case "triangle":
                        if (!data) {
                            data = new currencySchema({
                                Guild: interaction.guild.id,
                                UserID: user.id,
                                Triangles: quantity,
                            })

                            await data.save();

                            await interaction.editReply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor(client.color)
                                        .setDescription(`\`x${quantity}\` <:GreenTriangle:1213957460940038194> has been given to \`${user.username}\`.`)
                                ]
                            })
                            return;
                        }

                        data.Triangles += quantity
                        data.save();

                        await interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(client.color)
                                    .setDescription(`\`x${quantity}\` <:GreenTriangle:1213957460940038194> has been given to \`${user.username}\`.`)
                            ]
                        })
                        break;

                    case "shard":
                        if (!data) {
                            data = new currencySchema({
                                Guild: interaction.guild.id,
                                UserID: user.id,
                                Shards: quantity,
                            })

                            await data.save();

                            await interaction.editReply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor(client.color)
                                        .setDescription(`\`x${quantity}\` <:shard:1201612239422115931> has been given to \`${user.username}\`.`)
                                ]
                            })
                            return;
                        }

                        data.Shards += quantity
                        data.save();

                        await interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(client.color)
                                    .setDescription(`\`x${quantity}\` <:shard:1201612239422115931> has been given to \`${user.username}\`.`)
                            ]
                        })
                        break;
                    case "crystal":
                        if (!data) {
                            data = new currencySchema({
                                Guild: interaction.guild.id,
                                UserID: user.id,
                                Crystals: quantity,
                            })

                            await data.save();

                            await interaction.editReply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor(client.color)
                                        .setDescription(`\`x${quantity}\` <:crystal:1201612194387873863> has been given to \`${user.username}\`.`)
                                ]
                            })
                            return;
                        }

                        data.Crystals += quantity;
                        data.save();

                        await interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(client.color)
                                    .setDescription(`\`x${quantity}\` <:crystal:1201612194387873863> has been given to \`${user.username}\`.`)
                            ]
                        })
                        break;
                    case "trophy":
                        if (!data) {
                            data = new currencySchema({
                                Guild: interaction.guild.id,
                                UserID: user.id,
                                Trophies: quantity,
                            })

                            await data.save();

                            await interaction.editReply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor(client.color)
                                        .setDescription(`\`x${quantity}\` 🏆 has been given to \`${user.username}\`.`)
                                ]
                            })
                            return;
                        }

                        data.Trophies += quantity;
                        data.save();

                        await interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(client.color)
                                    .setDescription(`\`x${quantity}\` 🏆 has been given to \`${user.username}\`.`)
                            ]
                        })
                        break;
                    case "star":
                        if (!data) {
                            data = new currencySchema({
                                Guild: interaction.guild.id,
                                UserID: user.id,
                                Stars: quantity,
                            })

                            await data.save();

                            await interaction.editReply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor(client.color)
                                        .setDescription(`\`x${quantity}\` ✨ has been given to \`${user.username}\`.`)
                                ]
                            })
                            return;
                        }

                        data.Stars += quantity
                        member.roles.add("1176093280782524437")
                        data.save();

                        await interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(client.color)
                                    .setDescription(`\`x${quantity}\` ✨ has been given to \`${user.username}\`.`)
                            ]
                        })
                        break;

                    default:
                        break;
                }
                break;

            case "remove":
                if (!interaction.member.roles.cache.has("965789739804405800")) {
                    await interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color)
                                .setDescription("<:Error:977069715149160448> You don't have enough permissions to use this command!")
                        ],
                        ephemeral: true
                    })
                    return;
                }

                switch (item) {
                    case "square":
                        if (!data || data.Shinies === 0) {
                            await interaction.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor(client.color)
                                        .setDescription(`<:Error:977069715149160448> User has nothing to remove!`)
                                ],
                                ephemeral: true
                            })
                            return;
                        }

                        if (quantity > data.Shinies) {
                            await interaction.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor(client.color)
                                        .setDescription(`<:Error:977069715149160448> You cannot remove more items than this user has!`)
                                ],
                                ephemeral: true
                            })
                            return;
                        }

                        data.Shinies -= quantity
                        data.save();

                        await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(client.color)
                                    .setDescription(`\`x${quantity}\` <:GreenSquare:1130208810594734090> has been removed from \`${user.username}\`.`)
                            ]
                        })
                        break;

                    case "triangle":
                        if (!data || data.Triangles === 0) {
                            await interaction.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor(client.color)
                                        .setDescription(`<:Error:977069715149160448> User has nothing to remove!`)
                                ],
                                ephemeral: true
                            })
                            return;
                        }

                        if (quantity > data.Triangles) {
                            await interaction.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor(client.color)
                                        .setDescription(`<:Error:977069715149160448> You cannot remove more items than this user has!`)
                                ],
                                ephemeral: true
                            })
                            return;
                        }

                        data.Triangles -= quantity
                        data.save();

                        await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(client.color)
                                    .setDescription(`\`x${quantity}\` <:GreenTriangle:1213957460940038194> has been removed from \`${user.username}\`.`)
                            ]
                        })
                        break;

                    case "shard":
                        if (!data || data.Shards === 0) {
                            await interaction.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor(client.color)
                                        .setDescription(`<:Error:977069715149160448> User has nothing to remove!`)
                                ],
                                ephemeral: true
                            })
                            return;
                        }

                        if (quantity > data.Shards) {
                            await interaction.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor(client.color)
                                        .setDescription(`<:Error:977069715149160448> You cannot remove more items than this user has!`)
                                ],
                                ephemeral: true
                            })
                            return;
                        }

                        data.Shards -= quantity
                        data.save();

                        await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(client.color)
                                    .setDescription(`\`x${quantity}\` <:shard:1201612239422115931> has been removed from \`${user.username}\`.`)
                            ]
                        })
                        break;
                    case "crystal":
                        if (!data || data.Crystals === 0) {
                            await interaction.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor(client.color)
                                        .setDescription(`<:Error:977069715149160448> User has nothing to remove!`)
                                ],
                                ephemeral: true
                            })
                            return;
                        }

                        if (quantity > data.Crystals) {
                            await interaction.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor(client.color)
                                        .setDescription(`<:Error:977069715149160448> You cannot remove more items than this user has!`)
                                ],
                                ephemeral: true
                            })
                            return;
                        }

                        data.Crystals -= quantity
                        data.save();

                        await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(client.color)
                                    .setDescription(`\`x${quantity}\` <:crystal:1201612194387873863> has been removed from \`${user.username}\`.`)
                            ]
                        })
                        break;
                    case "trophy":
                        if (!data || data.Trophies === 0) {
                            await interaction.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor(client.color)
                                        .setDescription(`<:Error:977069715149160448> User has nothing to remove!`)
                                ],
                                ephemeral: true
                            })
                            return;
                        }

                        if (quantity > data.Trophies) {
                            await interaction.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor(client.color)
                                        .setDescription(`<:Error:977069715149160448> You cannot remove more items than this user has!`)
                                ],
                                ephemeral: true
                            })
                            return;
                        }

                        data.Trophies -= quantity
                        data.save();

                        await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(client.color)
                                    .setDescription(`\`x${quantity}\` 🏆 has been removed from \`${user.username}\`.`)
                            ]
                        })
                        break;
                    case "star":
                        if (!data || data.Stars === 0) {
                            await interaction.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor(client.color)
                                        .setDescription(`<:Error:977069715149160448> User has nothing to remove!`)
                                ],
                                ephemeral: true
                            })
                            return;
                        }

                        if (quantity > data.Stars) {
                            await interaction.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor(client.color)
                                        .setDescription(`<:Error:977069715149160448> You cannot remove more items than this user has!`)
                                ],
                                ephemeral: true
                            })
                            return;
                        }

                        data.Stars -= quantity
                        data.save();

                        await interaction.editreply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(client.color)
                                    .setDescription(`\`x${quantity}\` ✨ has been removed from \`${user.username}\`.`)
                            ]
                        })
                        break;

                    default:
                        break;
                }
                break;

            default:
                break;
        }
    }
}