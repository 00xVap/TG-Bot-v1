const {
    ComponentType,
    EmbedBuilder,
    SlashCommandBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
} = require("discord.js");
const formatString = require("../../utils/formatString");

module.exports = {
    cooldown: 3,
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Returns a list of the bot's commands."),

    async execute(interaction, client) {

        const directories = [
            ...new Set(interaction.client.commands.map((cmd) => cmd.folder))
        ];
        directories.splice(6, 1)

        const categories = directories.map((dir) => {
            const getCommands = interaction.client.commands.filter((cmd) => cmd.folder === dir).map((cmd) => {
                return {
                    name: cmd.data.name,
                    description: cmd.data.description || "No description found for this command."
                };
            });

            return {
                directory: formatString(dir),
                commands: getCommands,
            };
        });

        const embed = new EmbedBuilder()
            .setColor(client.color)
            .setAuthor({ name: "The Group Bot | Help Menu", iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`
                Use the drop down below to choose a command category.

                **Command Categories:**
                > General
                > Minigames
                > Music
                > Utility
            `)
            .setTimestamp()

        const components = (state) => [
            new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId(`help-menu`)
                    .setPlaceholder(`Select a category`)
                    .setDisabled(false)
                    .addOptions(
                        categories.map((cmd) => {
                            return {
                                label: cmd.directory,
                                value: cmd.directory.toLowerCase(),
                                description: `Commands in the ${cmd.directory} category.`,
                            }
                        })
                    )
            ),
        ]

        const initialMessage = await interaction.reply({
            embeds: [embed],
            components: components(false),
            ephemeral: true
        });

        const collector = interaction.channel.createMessageComponentCollector({
            componentType: ComponentType.StringSelect,
            time: 900000
        });

        collector.on("collect", async (int) => {
            if (int.user.id != interaction.user.id) {
                const embed = new EmbedBuilder()
                    .setDescription(`<:error:1199434320960565388> This interaction belongs to someone else.`);

                await int.reply({
                    embeds: [embed],
                    ephemeral: true,
                });
                return;
            } else {
                await int.deferUpdate();
                const [directory] = int.values;
                const category = categories.find(
                    (x) => x.directory.toLowerCase() === directory
                );

                const categoryEmbed = new EmbedBuilder()
                    .setColor(client.color)
                    .setAuthor({
                        name: `The Group Bot | Help Menu`,
                        iconURL: client.user.displayAvatarURL(),
                    })
                    .setDescription(`
                        A list of all the commands categorized under \`${formatString(directory)}\`.

                        ${category.commands.map((cmd) => `- \`/${cmd.name}\` - ${cmd.description}`).join("\n")}
                    `)
                    .setTimestamp()
                /*.addFields(
                    category.commands.map((cmd) => {
                        return {
                            name: `\`/${cmd.name}\``,
                            value: cmd.description,
                            inline: true,
                        }
                    })
                )*/

                await int.editReply({
                    embeds: [categoryEmbed],
                    components: components(false)
                });
            }
        });

        collector.on("end", async () => {
            try {
                components.components.forEach((c) => c.setDisabled(true));

                await initialMessage.edit({
                    components: components(true)
                });
                return;
            } catch (error) {
                try {
                    await initialMessage.edit({
                        components: []
                    });
                    return;
                } catch (error) {
                    return;
                }
            }
        })
    },
};