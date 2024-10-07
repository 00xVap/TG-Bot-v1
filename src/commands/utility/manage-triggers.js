const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const triggerSchema = require("../../model/triggers");

module.exports = {
    cooldown: 3,
    data: new SlashCommandBuilder()
        .setName("manage-triggers")
        .setDMPermission(false)
        .setDescription("Add or remove message triggers.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .addSubcommand((subcommand) =>
            subcommand
                .setName("add")
                .setDescription("Add a message for the bot to respond to.")
                .addStringOption((option) =>
                    option
                        .setName("message")
                        .setDescription("Message you want to bot to repond to.")
                        .setRequired(true)
                )
                .addStringOption((option) =>
                    option
                        .setName("response")
                        .setDescription("Response to the message.")
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("remove")
                .setDescription("Remove a trigger.")
                .addStringOption((option) =>
                    option
                        .setName("message")
                        .setDescription("Trigger to remove (by name).")
                        .setRequired(true)
                )
        ),

    async execute(interaction, client) {
        const { guild, options } = interaction;

        const subcommand = options.getSubcommand(["add", "remove"]);
        const command = options.getString("message");
        const response = options.getString("response");

        const data = await triggerSchema.findOne({ Guild: guild.id, Command: command });

        switch (subcommand) {
            case "add":
                await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(client.color)
                            .setDescription("<a:loading:1199434096678535370> Loading...")
                    ]
                })

                if (data) {
                    await interaction.editReply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color)
                                .setDescription(`<:error:1199434320960565388> Trigger already exists!`)
                        ],
                        ephemeral: true,
                    });
                    return;
                }

                const newData = new triggerSchema({
                    Guild: guild.id,
                    Command: command,
                    Response: response,
                });

                await newData.save();

                await interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(client.color)
                            .setDescription(`Trigger \`${command}\` added successfully!`)
                    ],
                });
                break;

            case "remove":
                await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(client.color)
                            .setDescription("<a:loading:1199434096678535370> Loading...")
                    ]
                })

                if (!data) {
                    await interaction.editReply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color)
                                .setDescription(`<:error:1199434320960565388> Trigger doesn't exist!`)
                        ],
                        ephemeral: true,
                    });
                    return;
                }

                await triggerSchema.findOneAndDelete({
                    Guild: guild.id,
                    Command: command,
                });

                await interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(client.color)
                            .setDescription(`Trigger \`${command}\` removed successfully!`)
                    ],
                });
                break;

            default:
                break;
        }
    },
};