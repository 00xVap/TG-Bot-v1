const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");
const client = require("../../index");

module.exports = {
    cooldown: 3,
    data: new SlashCommandBuilder()
        .setName("play")
        .setDMPermission(false)
        .setDescription("Loads a video/playlist from youtube from links or search terms.")
        .addStringOption(option =>
            option.setName("query")
                .setDescription("Link/SearchTerm")
                .setRequired(true)
        ),

    async execute(interaction) {
        const { options, member, guild, channel } = interaction;
        const query = options.getString("query");

        const voiceChannel = member.voice.channel;

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

        if (!guild.members.me.permissions.has(PermissionsBitField.Flags.Connect || PermissionsBitField.Flags.ViewChannel)) {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`<:error:1199434320960565388> I don't have permissions to join this voice channel.`)
                ],
                ephemeral: true
            });
            return;
        }

        if (!member.voice.channel.id == guild.members.me.voice.guild.id) {
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

        await interaction.deferReply();

        client.distube.play(voiceChannel, query, { textChannel: channel, member: member }).catch(async err => {
            await interaction.followUp({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`<:error:1199434320960565388> ${err.message}.`)
                ],
                ephemeral: true
            });
            return;
        })

        await interaction.editReply({
            content: "<a:loading:1165898737772662875> Loading song...",
        });
    },
};