const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const lb = require("../../model/msgleaderboard")

module.exports = {
    cooldown: 3,
    data: new SlashCommandBuilder()
        .setName("lb-messages")
        .setDMPermission(false)
        .setDescription("Returns a leaderboard of who sent the most messages."),

    async execute(interaction, client) {
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(client.color)
                    .setDescription("<a:loading:1165898737772662875> Loading...")
            ]
        })

        async function total() {
            var data = await lb.find({ Guild: interaction.guild.id })
            var standings = [];

            await data.forEach(async d => {
                standings.push({
                    user: d.User,
                    messages: d.Messages
                })
            })

            return standings;
        }

        const data = await lb.findOne({ Guild: interaction.guild.id })
        if (!data) {
            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription("<:Error:977069715149160448> No message history found.")
                ]
            })
        } else {
            var leaderboard = await total();
            leaderboard.sort((a, b) => b.messages - a.messages)
            var output = leaderboard.slice(0, 10)

            var string;
            var num = 1;
            await output.forEach(async value => {
                string += `\`[ ${num} ]\` <@${value.user}> - \`${value.messages}\`\n`
                num++;
            })
            string = string.replace("undefined", "");

            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setTitle("**Message Leaderboard**")
                        .setDescription(`${string}`)
                        .setTimestamp()
                ]
            })
        }
    },
};