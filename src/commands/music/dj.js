const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const djSchema = require("../../model/dj-schema");

module.exports = {
    cooldown: 3,
    data: new SlashCommandBuilder()
        .setName("dj")
        .setDescription("Set the DJ role of the server.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .setDMPermission(false)
        .addSubcommand((subcommand) =>
            subcommand
                .setName("add")
                .setDescription("Adds a role to act as the DJ role.")
                .addRoleOption(option =>
                    option.setName("role")
                        .setDescription("The role to add as DJ.")
                        .setRequired(true)
                ),
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("remove")
                .setDescription("Removes the DJ role.")
        ),

    async execute(interaction, client) {
        const subcommand = interaction.options.getSubcommand(["add", "remove"]);
        const role = interaction.options.getRole("role")

        let data = await djSchema.findOne({ Guild: interaction.guild.id });

        switch (subcommand) {
            case "add":
                if (!data) {
                    data = new djSchema({
                        Guild: interaction.guild.id,
                        Role: role.id,
                    });

                    await data.save();

                    await interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color)
                                .setDescription(`Role \`${role.name}\` has been added as **DJ**!`)
                        ],
                    });

                    return;
                }

                await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(client.color)
                            .setDescription(`This server already has a **DJ** role!`)
                    ],
                    ephemeral: true,
                });
                break;

            case "remove":
                if (!data) {
                    await interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color)
                                .setDescription(`<:error:1199434320960565388> This server doesn't have a **DJ** role!`)
                        ],
                        ephemeral: true,
                    });
                    return;
                }

                await djSchema.findOneAndDelete({
                    Guild: interaction.guild.id,
                });

                await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(client.color)
                            .setDescription(`**DJ** role removed successfully.`)
                    ],
                });
                break;

            default:
                break;
        }
    },
};