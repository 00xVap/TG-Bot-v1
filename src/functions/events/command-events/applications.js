const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "messageCreate",
    async execute(message, client) {
        if (message.author.bot) return;
        if (message.author.id !== "380933616898932746") return;

        if (message.content === "tg?applicationinfo") {
            await message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Event Manager Applications")
                        .setDescription(`**Welcome to the 483048th edition of the Event Manager applications.**\nAs you all are aware by now, we are known to have a stable Event Manager team. Hence why i present to you this amazing Application System for the 38244th time. The rules are simple, failure to follow them can lower you chances of getting selected for the position.`)
                        .addFields(
                            { name: "Rules", value: "**No Troll Applications.**\n**»** Troll applications will be removed immediatly, don't try it. It's just annoying and it lowers your chances of getting selected."},
                            { name: "Information", value: "**»** By typing `/apply` in this channel, a modal will show up. The bot will ask you a few questions concerning the Event Manager position. Answer those questions with __honesty and truth__ (don't mess up cause there is a 6h slowmode in this channel). Your application will then be sent to the staff of this server to be reviewed.\n**»**The applications will be open for `6 days`. At the end of those `6 days`, the staff will have an **additional day** to review your applications.\n**»** If you change your mind after submitting your application, you can always ask a staff member to remove your application."},
                            { name: "Requirements", value: "**You Must Be Able To Talk in Voice Chat.**\n**»** Not being able to talk in voice chat makes everything more complicated, so we don't want that.\n**You Must Have The Senior Role (Level 20+).**\n**»** We need active Event Managers that will be there when the events are hosted (also be responsive when we ping you otherwise we can and will fire you). Anyone under `Level 20` will have their applications removed."},
                            { name: "If You Get Selected", value: "**»** You will have some guidelines to follow once you get the position, It's to ensure great communication and experience. If you have any question regarding the Event Manager position, feel free to ask any staff member."}
                        )
                        .setFooter({ text: "By running the /apply command, you have read this embed and agree to follow every rule."})
                ]
            })
        }
    },
};