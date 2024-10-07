const currencySchema = require("../../../model/currency");

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        (function loop() {
            let channel = client.channels.cache.get("358671241059762177")

            let max = 86_400_000;
            var time = Math.floor(Math.random() * max);

            setTimeout(async function () {
                const greenSquare = await channel.send({
                    content: "<:GreenSquare:1130208810594734090>",
                    flags: [4096]
                });

                const collector = channel.createMessageCollector({
                    filter: (message) => message.content.toLowerCase() == "pew" && channel.id === message.channel.id,
                    time: 3_600_000
                });

                let answered = false;

                let square = "629489060800364550";
                let triangle = "638997088100810762";
                let pentagon = "636899147760533534";
                let alpha = "638997094215974912";

                collector.on("collect", async (message) => {
                    let data = await currencySchema.findOne({ Guild: message.guild.id, UserID: message.author.id })

                    if (message.member.roles.cache.has(alpha)) {
                        message.reply({
                            content: "<:GreenSquare:1130208810594734090> You destroyed the shiny! You earned \`x1\` <:crystal:1201612194387873863> and \`x5\` <:shard:1201612239422115931> cause you earned all the shiny roles available."
                        });

                        if (!data) {
                            data = new currencySchema({
                                Guild: message.guild.id,
                                UserID: message.author.id,
                                Shards: 5,
                                Crystals: 1,
                                Shinies: 1
                            })

                            await data.save();

                            answered = true;
                            collector.stop();
                            return;
                        }

                        data.Shinies++;
                        data.Shards += 5;
                        data.Crystals++;

                        await data.save();

                        answered = true;
                        collector.stop();
                        return;
                    }

                    if (message.member.roles.cache.has(pentagon)) {
                        message.member.roles.add(alpha)
                        message.reply({
                            content: "<:GreenSquare:1130208810594734090> You destroyed the shiny! You earned the `Green Alpha Pentagon` role."
                        });

                        if (!data) {
                            data = new currencySchema({
                                Guild: message.guild.id,
                                UserID: message.author.id,
                                Shinies: 1,
                            })

                            await data.save();

                            answered = true;
                            collector.stop();
                            return;
                        }

                        data.Shinies++

                        await data.save();

                        answered = true;
                        collector.stop();
                        return;
                    }

                    if (message.member.roles.cache.has(triangle)) {
                        message.member.roles.add(pentagon)
                        message.reply({
                            content: "<:GreenSquare:1130208810594734090> You destroyed the shiny! You earned the `Green Pentagon` role."
                        });

                        if (!data) {
                            data = new currencySchema({
                                Guild: message.guild.id,
                                UserID: message.author.id,
                                Shinies: 1,
                            })

                            await data.save();

                            answered = true;
                            collector.stop();
                            return;
                        }

                        data.Shinies++

                        await data.save();

                        answered = true;
                        collector.stop();
                        return;
                    }

                    if (message.member.roles.cache.has(square)) {
                        message.member.roles.add(triangle)
                        message.reply({
                            content: "<:GreenSquare:1130208810594734090> You destroyed the shiny! You earned the `Green Triangle` role."
                        });

                        if (!data) {
                            data = new currencySchema({
                                Guild: message.guild.id,
                                UserID: message.author.id,
                                Shinies: 1,
                            })

                            await data.save();

                            answered = true;
                            collector.stop();
                            return;
                        }

                        data.Shinies++;

                        await data.save();

                        answered = true;
                        collector.stop();
                        return;
                    }

                    message.member.roles.add(square)
                    message.reply({
                        content: "<:GreenSquare:1130208810594734090> You destroyed the shiny! You earned the `Green Square` role."
                    });

                    if (!data) {
                       data = new currencySchema({
                            Guild: message.guild.id,
                            UserID: message.author.id,
                            Shinies: 1,
                        })

                        await newCurrency.save();

                        answered = true;
                        collector.stop();
                        return;
                    }

                    data.Shinies++;

                    await data.save();

                    answered = true;
                    collector.stop();
                    return;
                })

                collector.on("end", () => {
                    if (!answered) {
                        greenSquare.edit({
                            content: "<:GreenSquare:1130208810594734090> The shiny disappeared! No one destroyed it in time."
                        })
                    }
                })

                loop();
            }, time);
        }());
    },
};