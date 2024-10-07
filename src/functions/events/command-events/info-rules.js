const { EmbedBuilder, ButtonBuilder, ButtonStyle, ComponentType, ActionRowBuilder } = require("discord.js");

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        const channel = client.channels.cache.get("405124374698524672")
        var msg = 1;

        const embed = new EmbedBuilder()

        const row = new ActionRowBuilder()
        const ruleButton = new ButtonBuilder()
            .setCustomId("rules")
            .setLabel("Rules")
            .setEmoji("📜")
            .setStyle(ButtonStyle.Secondary)
        const roleButton = new ButtonBuilder()
            .setCustomId("role")
            .setEmoji("🔰")
            .setLabel("Roles")
            .setStyle(ButtonStyle.Secondary)
        const otherButton = new ButtonBuilder()
            .setCustomId("other")
            .setEmoji("❓")
            .setLabel("Other Information")
            .setStyle(ButtonStyle.Secondary)
        row.addComponents(ruleButton, roleButton, otherButton)

        const roleRow = new ActionRowBuilder()
        const levelRole = new ButtonBuilder()
            .setCustomId("level")
            .setEmoji("📈")
            .setLabel("XP Roles")
            .setStyle(ButtonStyle.Secondary)
        const colorRole = new ButtonBuilder()
            .setCustomId("color")
            .setEmoji("🌈")
            .setLabel("Color Roles")
            .setStyle(ButtonStyle.Secondary)
        const moneyRole = new ButtonBuilder()
            .setCustomId("money")
            .setEmoji("💵")
            .setLabel("Moneygame Roles")
            .setStyle(ButtonStyle.Secondary)
        const minigameRole = new ButtonBuilder()
            .setCustomId("minigame")
            .setEmoji("✨")
            .setLabel("Prize Roles")
            .setStyle(ButtonStyle.Secondary)
        const miscRoles = new ButtonBuilder()
            .setCustomId("misc")
            .setEmoji("❇️")
            .setLabel("Other Roles")
            .setStyle(ButtonStyle.Secondary)
        roleRow.addComponents(levelRole, colorRole, moneyRole, minigameRole, miscRoles)

        const otherRow = new ActionRowBuilder()
        const timeline = new ButtonBuilder()
            .setCustomId("timeline")
            .setLabel("History")
            .setEmoji("📜")
            .setStyle(ButtonStyle.Secondary)
        otherRow.addComponents(timeline)


        embed.setColor(client.color)
            .setTitle("🚫 Server Information")
            .setTitle("About Us")
            .setThumbnail("https://cdn.discordapp.com/icons/358671240568766464/18506e1e2a0e23464ba9e28d5d038c79.webp?size=1024")
            .setDescription(`
                Hello and welcome to TG! We are a private gaming server. We run many group activities and play games as a group. Check out our many channels for fun things to do, chat and make new friends, and even read our rich history full of content. Enjoy!

                Click one of the buttons below to read our rules or to get more information about certain roles!
            `)


        await channel.messages
            .fetch({ msg })
            .then(async (message) => {
                await channel.bulkDelete(msg).catch(async (e) => {
                    return;
                });
            });

        const infoMessage = await channel.send({
            embeds: [embed],
            components: [row],
        })

        const collector = infoMessage.createMessageComponentCollector({
            componentType: ComponentType.Button,
        });

        collector.on("collect", async (i) => {
            await i.deferUpdate({
                ephemeral: true
            })

            switch (i.customId) {
                case "rules":
                    embed.setColor(client.color)
                        .setTitle("🚫 Rules")
                        .setDescription(`
                        \`1.\` **Abide by Discord's [Terms of Service](<https://discordapp.com/terms>) and [Guidelines](<https://discordapp.com/guidelines>)**
                        \`2.\` **No Toxicity**
                        *Be respecful.* Toxicity, bullying, harassment or hate speech of any kind is strictly forbidden. The staff are on a zero tolerance policy and will punish you severly.
                        \`3.\` **No NSFW Material**
                        Any Non Safe For Work material, whether it's gore, porn, or any other illegal material, is not tolerated and will result in severe punishment.
                        \`4.\` **Use channels appropriately**
                        Use channels for their intended purpose, failure to do so may result in punishment.
                        \`5.\` **No Self-Botting**
                        Running a bot on a user account is not allowed and will be punished.
                        
                        *These rules are enforced by the staff to keep TG a safe and fun place for people to have a good time. Use common sense, just because it's not in the rules it doesn't mean it's allowed.*
                        `)
                        .setFooter({ text: "If you have any questions regarding these rules, feel free to message a staff member." })

                    await i.followUp({
                        embeds: [embed],
                        ephemeral: true
                    });
                    break;

                case "role":
                    const roleMessage = await i.followUp({
                        components: [roleRow],
                        ephemeral: true
                    })

                    const roleCollector = roleMessage.createMessageComponentCollector({
                        componentType: ComponentType.Button,
                    });

                    roleCollector.on("collect", async (r) => {
                        await r.deferUpdate({
                            ephemeral: true
                        })

                        switch (r.customId) {
                            case "level":
                                const levelEmbed = new EmbedBuilder()
                                    .setColor(client.color)
                                    .setTitle("🚫 XP Roles")
                                    .setDescription(`\
                                        We use <@159985870458322944> for our leveling system. Check out our [leaderboard](https://mee6.xyz/levels/358671240568766464) for more information.

                                        \`[Lvl 150]\` <@&574745447520927744>
                                        \`[Lvl 140]\` <@&394942780163751936>
                                        \`[Lvl 130]\` <@&574745287747436575>
                                        \`[Lvl 120]\` <@&574745567746457610>
                                        \`[Lvl 110]\` <@&574742561541980170>
                                        \`[Lvl 100]\` <@&373171865310724096>
                                        \`[Lvl  90]\` <@&574745673438855169>
                                        \`[Lvl  80]\` <@&384145024482541568>
                                        \`[Lvl  70]\` <@&395057902840446987>
                                        \`[Lvl  60]\` <@&395056661351366656>
                                        \`[Lvl  50]\` <@&359108291852501003>
                                        \`[Lvl  40]\` <@&395055195559559178>
                                        \`[Lvl  30]\` <@&395050182967951372>
                                        \`[Lvl  20]\` <@&358762559001853953>
                                        \`[Lvl  15]\` <@&358690905848283138>
                                        \`[Lvl  10]\` <@&358762124614565888>
                                        \`[Lvl   5]\` <@&359107091123929088>
                                    `)

                                await r.followUp({
                                    embeds: [levelEmbed],
                                    ephemeral: true
                                })
                                break;

                            case "color":
                                const colorEmbed = new EmbedBuilder()
                                    .setColor(client.color)
                                    .setTitle("🚫 Color Roles")
                                    .setDescription(`TG has a wide variety of color roles. To get yourself a color role, go to the <#908043023940739073> channel and select the color you like. If you ever want to remove your color, just click the button again to remove it.`)

                                await r.followUp({
                                    embeds: [colorEmbed],
                                    ephemeral: true
                                })
                                break;

                            case "money":
                                const moneyEmbed = new EmbedBuilder()
                                    .setColor(client.color)
                                    .setTitle("🚫 Moneygame Roles")
                                    .setDescription(`
                                        These roles can be earned through <@292953664492929025>'s moneygame. Run the command \`/item store\` in <#387425109255782412> for more information.

                                        <@&408801728998408192>
                                        <@&408452267356979200>
                                        <@&408583188135411712>
                                        <@&408732282749321217>
                                        <@&408783600624992257>
                                        <@&408799928752799754>
                                    `)

                                await r.followUp({
                                    embeds: [moneyEmbed],
                                    ephemeral: true
                                })
                                break;
                            case "minigame":
                                const eventEmbed = new EmbedBuilder()
                                    .setColor(client.color)
                                    .setTitle("🚫 Prize Roles")
                                    .setDescription(`
                                        These roles can be earned for winning/participating in TG events or minigames. For more information, feel free to ask a staff member.
                                    `)
                                    .addFields(
                                        { name: "Tier Roles", value: "These roles are earned by reaching a certain amount of Trophies. Trophies are obtained by trading 20 Crystals for 1 trophy.\n\n<@&1172068003806990356> - 🏆 20\n<@&1172067962967052289> - 🏆 14\n<@&1172067826639589387> - 🏆 9\n<@&1172067626076340235> - 🏆 5\n<@&1172067578735230976> - 🏆 2" },
                                        { name: "Event Roles", value: "These roles are earned by winning an event.\n\n<@&1034295456458620968>\n<@&1046536951437725807>\n<@&1046536299747749998>\n<@&401203018370121740>" },
                                        { name: "Shiny Roles", value: "These roles are earned by destroying the Green Square or the Green Triangle that spawns randomly in main chat.\n\n<@&638997094215974912>\n<@&636899147760533534>\n<@&638997088100810762>\n<@&629489060800364550>" },
                                    )

                                await r.followUp({
                                    embeds: [eventEmbed],
                                    ephemeral: true
                                })
                                break;
                            case "misc":
                                const miscEmbed = new EmbedBuilder()
                                    .setColor(client.color)
                                    .setTitle("🚫 Other Roles")
                                    .setDescription(`
                                        These roles are by meeting certain criterias or by just asking a staff member. If you have questions, ask a staff member.
                                    `)
                                    .addFields(
                                        { name: "OG Roles", value: "<@&813582949572149268>\n<@&667543477537603604>\n<@&667543474572230667>\n<@&616754220636438590>\n<@&667543471132770317>", inline: true },
                                        { name: "Ping Roles", value: "<@&569554196211171359>\n<@&605952976934404097>\n<@&786407737029558281>\n<@&833186288172662865>\n<@&1073419765873377450>\n<@&1073420214907187300>\n<@&1094627876629913682>", inline: true },
                                        { name: "Miscellaneous Roles", value: "<@&585619568085696533>\n<@&398875668328218626>\n<@&578698492260909107>\n<@&483319987289718801>\n<@&610228963264036872>\n<@&571070010332545024>\n<@&1137265131672317972>\n", inline: true },
                                    )

                                await r.followUp({
                                    embeds: [miscEmbed],
                                    ephemeral: true
                                })
                                break;

                            default:
                                break;
                        }

                    })
                    break;

                case "other":
                    const otherMessage = await i.followUp({
                        components: [otherRow],
                        ephemeral: true
                    })

                    const otherCollector = otherMessage.createMessageComponentCollector({
                        componentType: ComponentType.Button,
                    });

                    otherCollector.on("collect", async (q) => {
                        await q.deferUpdate({
                            ephemeral: true
                        })

                        switch (q.customId) {
                            case "timeline":
                                const timelineEmbed = new EmbedBuilder()
                                    .setColor(client.color)
                                    .setTitle("🚫 History")
                                    .setDescription(`
                                        TG has quite a rich history, we take record of it on a timeline which is updated regularly.
                                    `)
                                    .setImage("https://cdn.discordapp.com/attachments/817958270949261313/1172795183809691698/The_Group_Timeline_v.4.png?ex=65619da1&is=654f28a1&hm=fd59a6c6b04fd8249be98261724a1afb072acc76a3b6198c9847fdee57bc02c8&")

                                await q.followUp({
                                    embeds: [timelineEmbed],
                                    ephemeral: true,
                                })

                                break;

                            default:
                                break;
                        }
                    })
                    break;

                default:
                    break;
            }
        })
    },
};