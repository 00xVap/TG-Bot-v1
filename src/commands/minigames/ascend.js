const { SlashCommandBuilder, EmbedBuilder, ComponentType, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const currencySchema = require("../../model/currency");

module.exports = {
    cooldown: 3,
    data: new SlashCommandBuilder()
        .setName("ascend")
        .setDMPermission(false)
        .setDescription("Ascend to the stars."),

    async execute(interaction, client) {
        const query = {
            Guild: interaction.guild.id,
            UserID: interaction.user.id,
        };

        let data = await currencySchema.findOne(query);

        if (!data) {
            data = new currencySchema({
                ...query,
            })
        }

        if (!interaction.member.roles.cache.has("1172068003806990356")) {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`<:Error:977069715149160448> You need the \`TG CHAMPI🚫N\` role to run this command!.`)
                ],
                ephemeral: true
            });
            return;
        }

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

        const starMessage = await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(client.color)
                    .setDescription(`
                        By clicking the green button, \`x20\` 🏆 and all claimed tiers will be removed and you will be given \`x1\` ✨ and the \`🚫ASCENDED\` role. Are you sure you want to proceed?
                    `)
            ],
            components: [row]
        })

        const collector = starMessage.createMessageComponentCollector({
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
                        data.Stars++
                        data.Trophies -= 20;
                        await interaction.member.roles.add("1176093280782524437")
                        await interaction.member.roles.remove(["1172068003806990356", "1172067962967052289", "1172067826639589387", "1172067626076340235", "1172067578735230976"])
                        data.save();

                        await starMessage.edit({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor("#89FF69")
                                    .setDescription(`### Ascension successful!\n\n>>> **Added:** \`x1\` ✨, <@&1176093280782524437>\n**Removed:** \`x20\` 🏆, <@&1172068003806990356>, <@&1172067962967052289>, <@&1172067826639589387>, <@&1172067626076340235>, <@&1172067578735230976>`)
                                    .setTimestamp()
                            ],
                            components: []
                        })
                        break;

                    case "no":
                        await starMessage.edit({
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
    },
};