const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    cooldown: 3,
    data: new SlashCommandBuilder()
        .setName("volume")
        .setDMPermission(false)
        .setDescription("Adjust the volume of the player.")
        .addIntegerOption(option =>
            option.setName("volume")
                .setDescription("10 = 10%")
                .setMinValue(0)
                .setMaxValue(100)
                .setRequired(true)
        ),

    async execute(interaction, client) {
        const { options, member, guild } = interaction;
        const volume = options.getInteger("volume");

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
            client.distube.setVolume(voiceChannel, volume)

            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`🔉 Volume has been set to \`${volume}%\`.`)
                ],
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