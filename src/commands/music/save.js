const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    cooldown: 3,
    data: new SlashCommandBuilder()
        .setName("save")
        .setDMPermission(false)
        .setDescription("Saves the currently playing song in you DMs."),

    async execute(interaction, client) {
        const { member, guild, user } = interaction;

        const voiceChannel = member.voice.channel;
        const queue = await client.distube.getQueue(voiceChannel);
        const currentSong = queue.songs[0];

        if (!voiceChannel) {
            embed.setDescription("<:error:1199434320960565388> You have to be in a voice channel to run this command.")

            await interaction.reply({
                embeds: [embed],
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

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(client.color)
                    .setDescription(`<a:loading:1199434096678535370> Saving song...`)
            ],
            ephemeral: true
        })

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

            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`Song saved: \`${currentSong.name}\``)
                ],
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
    },
};