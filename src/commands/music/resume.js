const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");
const djSchema = require("../../model/dj-schema");

module.exports = {
    cooldown: 3,
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDMPermission(false)
        .setDescription("Resumes the current song. If already paused."),

    async execute(interaction, client) {
        const { member, guild } = interaction;

        const voiceChannel = member.voice.channel;
        const queue = await client.distube.getQueue(voiceChannel);

        const data = await djSchema.findOne({ Guild: interaction.guild.id });

        if (!data) {
            run();
            return;
        }

        if (interaction.member.permissionsIn(interaction.channel).has(PermissionsBitField.Flags.Administrator)) {
            run();
            return;
        }

        if (!member.roles.cache.has(data.Role)) {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription("<:error:1199434320960565388> You do not have the **DJ** role!")
                ],
                ephemeral: true
            });
            return;
        }

        run();

        async function run() {
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
                await queue.resume(voiceChannel);

                await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(client.color)
                            .setDescription("▶️ Song has been resumed.")
                    ],
                });

            } catch (err) {
                await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(client.color)
                            .setDescription("<:error:1199434320960565388> Song is already playing!")
                    ],
                    ephemeral: true
                });
                return;
            }
        }
    },
};