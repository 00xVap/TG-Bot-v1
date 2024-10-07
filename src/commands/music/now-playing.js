const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ComponentType, ButtonStyle, ActionRowBuilder, PermissionsBitField } = require("discord.js");
const numbersWithCommas = require("../../utils/numbersWithCommas");
const formatString = require("../../utils/formatString");

module.exports = {
    cooldown: 3,
    data: new SlashCommandBuilder()
        .setName("now-playing")
        .setDMPermission(false)
        .setDescription("Displays the current playing song."),

    async execute(interaction, client) {
        const { member, guild } = interaction;

        const voiceChannel = member.voice.channel;
        const queue = await client.distube.getQueue(voiceChannel);
        const currentSong = queue.songs[0]

        const row = new ActionRowBuilder();
        const saveButton = new ButtonBuilder()
            .setCustomId("save")
            .setLabel("Save")
            .setStyle(ButtonStyle.Secondary)
        const nerdButton = new ButtonBuilder()
            .setCustomId("nerd")
            .setLabel("</>")
            .setStyle(ButtonStyle.Secondary)
        row.addComponents(saveButton, nerdButton);


        if (!voiceChannel) {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor()
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
                        .setDescription(`<:error:1199434320960565388> I am already playing music in <#${guild.members.me.voice.channelId}>.`)
                ],
                ephemeral: true
            });
            return;
        }

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
            const playMessage = await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setAuthor({ name: currentSong.uploader.name, url: currentSong.uploader.url, iconURL: "https://cdn.discordapp.com/attachments/817958270949261313/1163460827899252897/3610206.png?ex=653fa855&is=652d3355&hm=68687952b602efbfca22ae2213ff772d3daf5559f7fc1b7ae73e3c198336f2c5&" })
                        .setTitle(`\`${currentSong.name}\``)
                        .setURL(`${currentSong.url}`)
                        .setThumbnail(`${currentSong.thumbnail}`)
                        .setDescription(`
                            >>> **Requested by:** ${currentSong.user}
                            **Duration:** \`${currentSong.formattedDuration}\`
                            **Views:** \`${numbersWithCommas(currentSong.views)}\`
                            **Likes** \`${numbersWithCommas(currentSong.likes)}\`
                        `)
                        .setTimestamp()
                ],
                components: [row]
            });

            const collector = playMessage.createMessageComponentCollector({
                componentType: ComponentType.Button,
                time: 900000
            });

            collector.on("collect", async (i) => {
                if (i.user.id != interaction.user.id) {
                    await i.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color)
                                .setDescription(`<:error:1199434320960565388> This interaction belongs to someone else.`)
                        ],
                        ephemeral: true,
                    });
                    return;
                } else {
                    switch (i.customId) {
                        case "nerd":
                            i.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setAuthor({ name: currentSong.uploader.name, url: currentSong.uploader.url, iconURL: "https://cdn.discordapp.com/attachments/817958270949261313/1163460827899252897/3610206.png?ex=653fa855&is=652d3355&hm=68687952b602efbfca22ae2213ff772d3daf5559f7fc1b7ae73e3c198336f2c5&" })
                                        .setTitle(`\`${currentSong.name}\``)
                                        .setURL(`${currentSong.url}`)
                                        .setThumbnail(`${currentSong.thumbnail}`)
                                        .setDescription(`
                                            **Video ID:** \`${currentSong.id}\`
                                            **Source:** \`${formatString(currentSong.source)}\`
                                            **Livestream:** ${currentSong.isLive.toString().replace("false", "<:Error:977069715149160448>").replace("true", "<:Success:977389031837040670>")}
                                            **Age Restricted:** ${currentSong.age_restricted.toString().replace("false", "<:Error:977069715149160448>").replace("true", "<:Success:977389031837040670>")}
                                            **Download:** [\`Link\`](${currentSong.streamURL})
                                        `)
                                        .setTimestamp()
                                        .setFooter({ text: "More information for the nerds." })
                                ],
                                ephemeral: true
                            })

                            break;

                        case "save":
                            const { user } = interaction;

                            try {
                                await user.send({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setAuthor({ name: `Song Saved`, iconURL: client.user.displayAvatarURL() })
                                            .setTitle(`\`${currentSong.name}\``)
                                            .setURL(`${currentSong.url}`)
                                            .setThumbnail(`${currentSong.thumbnail}`)
                                            .setDescription(`
                                                **Channel:** \`${currentSong.uploader.name}\`
                                                **Duration:** \`${currentSong.formattedDuration}\`
                                                **Requested by:** \`${currentSong.user.username}\`
                                                **Saved from:** \`${guild.name}\`
                                            `)
                                            .setTimestamp()
                                    ]
                                });

                                await i.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription(`Song saved: \`${currentSong.name}\``)
                                    ],
                                    ephemeral: true
                                })
                                return;
                            } catch (error) {
                                await interaction.followUp({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(client.color)
                                            .setDescription(`<:error:1199434320960565388> Couldn't save the song, check your settings and try again.`)
                                    ],
                                    ephemeral: true
                                })
                            }
                            break;

                        default:
                            break;
                    }
                }
            });
            collector.on("end", async (collected) => {
                try {
                    row.components.forEach((c) => c.setDisabled(true));

                    await playMessage.edit({
                        components: [row, requestedRow],
                    });
                    return;
                } catch (error) {
                    try {
                        await playMessage.edit({
                            components: [requestedRow],
                        });
                        return;
                    } catch (error) {
                        return;
                    }
                }
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
    },
};