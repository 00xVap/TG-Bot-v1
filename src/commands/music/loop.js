const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    cooldown: 3,
    data: new SlashCommandBuilder()
        .setName("loop")
        .setDescription("Loops the queue or the current song.")
        .setDMPermission(false)
        .addStringOption(option =>
            option.setName("options")
                .setDescription("Loop options: off, song, queue")
                .addChoices(
                    { name: "Off", value: "off" },
                    { name: "Song", value: "song" },
                    { name: "Queue", value: "queue" },
                )
                .setRequired(true)
        ),
    async execute(interaction, client) {
        const { member, options, guild } = interaction;
        const option = options.getString("options");

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
            let mode = null;

            switch (option) {
                case "off":
                    mode = 0;
                    break;
                case "song":
                    mode = 1;
                    break;
                case "queue":
                    mode = 2;
                    break;
            }

            mode = await queue.setRepeatMode(mode);

            mode = mode ? (mode === 2 ? "Repeat queue" : "Repeat song") : "Off";

            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`🔁 Set repeat mode to \`${mode}\`.`)
                ],
            });
        } catch (err) {
            console.log(err);

            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription("<:error:1199434320960565388> Something went wrong..")
                ],
                ephemeral: true
            });
        }

    }
}