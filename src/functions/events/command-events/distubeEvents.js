const { EmbedBuilder } = require("discord.js");
const client = require("../../../index");

client.distube
    .on('playSong', (queue, song) =>
        queue.textChannel.send({
            embeds: [
                new EmbedBuilder()
                    .setColor("#FF0000")
                    .setDescription(`Now playing: [\`${song.name}\`](${song.url})`)
            ]
        })
    )
    .on('addSong', (queue, song) =>
        queue.textChannel.send({
            embeds: [
                new EmbedBuilder()
                    .setColor("#FF0000")
                    .setDescription(`Added [\`${song.name}\`](${song.url}) to the queue.`)
            ]
        })
    )
    .on('addList', (queue, playlist) =>
        queue.textChannel.send({
            embeds: [
                new EmbedBuilder()
                    .setColor("#FF0000")
                    .setDescription(`Added \`${playlist.songs.length}\` songs to the queue.`)
            ]
        })
    )
    .on('error', (channel, e) => {
        if (channel) {
            channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor("#FF0000")
                        .setDescription(`<:error:1199434320960565388> An error has occured: ${e.toString().slice(0, 1974)}`)]
            })
        } else {
            console.error(e)
        }
    })
    .on('empty', channel => {
        if (channel) {
            channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor("#FF0000")
                        .setDescription('<:error:1199434320960565388> Voice channel is empty! Leaving the channel...')]
            })
        } else {
            console.error(e)
        }
    })
    .on('searchNoResult', (message, query) =>
        message.channel.send({
            embeds: [
                new EmbedBuilder()
                    .setColor("#FF0000")
                    .setDescription(`<:error:1199434320960565388> No result found for \`${query}\`!`)]
        })
    )