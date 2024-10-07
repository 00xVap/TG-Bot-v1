const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js");

module.exports = {
    cooldown: 3,
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDMPermission(false)
        .setDescription("View the server queue."),

    async execute(interaction, client) {
        const { member, guild } = interaction;

        const voiceChannel = member.voice.channel;
        const queue = await client.distube.getQueue(voiceChannel);

        if (!voiceChannel) {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription("<:error:1199434320960565388> You have to be in a voice channel to run this command.")
                ],
                ephemeral: true
            });
            return;
        }

        if (!member.voice.channelId == guild.members.me.voice.guildId) {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`<:error:1199434320960565388> I am already connected to <#${guild.members.me.voice.channelId}>.`)
                ],
                ephemeral: true
            });
            return;
        }

        const row = new ActionRowBuilder()
        const next = new ButtonBuilder()
            .setCustomId("queueNext")
            .setEmoji("1131723196064878613")
            .setStyle(ButtonStyle.Secondary)
        const back = new ButtonBuilder()
            .setCustomId("queueBack")
            .setEmoji("1079662359246798979")
            .setStyle(ButtonStyle.Secondary)
        row.addComponents(back, next)

        if (!queue) {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`<:error:1199434320960565388> There is no queue in this server.`)
                ],
                ephemeral: true
            });
            return;
        }

        try {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription("<a:loading:1199434096678535370> Loading...")
                ]
            })

            let currentPage = 0;
            const embeds = generateQueueEmbeds(queue);

            const queueEmbed = await interaction.editReply({
                content: `> **Current Page:** \`${currentPage + 1}/${embeds.length}\``,
                embeds: [embeds[currentPage]],
                components: [row]
            });

            const collector = queueEmbed.createMessageComponentCollector({
                componentType: ComponentType.Button,
                time: 900000
            });

            collector.on("collect", async (q) => {
                if (q.user.id != interaction.user.id) {
                    await q.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color)
                                .setDescription(`<:error:1199434320960565388> This interaction belongs to someone else.`)
                        ],
                        ephemeral: true,
                    });
                    return;
                } else {
                    await q.deferUpdate()

                    switch (q.customId) {
                        case "queueNext":
                            if (currentPage < embeds.length - 1) {
                                currentPage++;

                                await interaction.editReply({
                                    content: `> **Current Page:** \`${currentPage + 1}/${embeds.length}\``,
                                    embeds: [embeds[currentPage]],
                                    components: [row]
                                })
                            }
                            break;

                        case "queueBack":
                            if (currentPage !== 0) {
                                --currentPage;

                                await interaction.editReply({
                                    content: `> **Current Page:** \`${currentPage + 1}/${embeds.length}\``,
                                    embeds: [embeds[currentPage]],
                                    components: [row]
                                })
                            }
                            break;

                        default:
                            break;
                    }
                }
            });

            collector.on("end", async (collected) => {
                return;
            });

        } catch (err) {
            console.log(err);

            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription("<:error:1199434320960565388> Something went wrong..")
                ],
                ephemeral: true
            });
            return;
        }

        function generateQueueEmbeds(queue) {
            const embeds = [];
            let k = 10;

            for (let i = 0; i < queue.songs.length; i += 10) {
                const current = queue.songs.slice(i, k);
                let j = i;
                k += 10;
                const info = current.map(track => `\`${++j}.\` [${track.name}](${track.url}) **-** \`${track.formattedDuration}\``).join("\n\n");
                const embed = new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle(`Song Queue`)
                    .setDescription(`${info}`)
                    .setTimestamp()

                if (queue.songs.length === 1) {
                    embed.setFooter({ text: `${queue.songs.length} song` })
                } else {
                    embed.setFooter({ text: `${queue.songs.length} songs` })
                }

                embeds.push(embed);
            }
            return embeds;
        }
    }
};