const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");
const djSchema = require("../../model/dj-schema");

module.exports = {
    cooldown: 3,
    data: new SlashCommandBuilder()
        .setName("remove")
        .setDMPermission(false)
        .setDescription("Removes a song from the queue based on its position.")
        .addIntegerOption(option =>
            option.setName("id")
                .setDescription("The song number in the queue.")
                .setRequired(true)
                .setMinValue(1)
        ),

    async execute(interaction, client) {
        const { options, member, guild } = interaction;
        const songId = options.getInteger("id");

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
                            .setDescription(`<:error:1199434320960565388> I am already connected to <#${guild.members.me.voice.channelId}>.`)
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
                if (songId > queue.songs.length) {
                    await interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color)
                                .setDescription(`<:error:1199434320960565388> There is no song at this position!`)
                        ],
                        ephemeral: true
                    });
                    return;
                }

                if (songId === 1) {
                    try {
                        await queue.skip(voiceChannel);

                        await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(client.color)
                                    .setDescription("⏩ Song has been skipped.")
                            ],
                        });

                    } catch (error) {
                        await queue.stop(voiceChannel);

                        await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(client.color)
                                    .setDescription("⏹️ No song have been queued up. The queue has been stopped.")
                            ],
                            ephemeral: false
                        });
                        return;
                    }

                    return;
                }

                await queue.songs.splice(songId - 1, 1);

                await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(client.color)
                            .setDescription(`Removed track at position \`${songId}\`.`)
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
        }
    },
};