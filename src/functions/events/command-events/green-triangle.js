const currencySchema = require("../../../model/currency");

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        (function loop() {
            let channel = client.channels.cache.get("358671241059762177")

            let max = 604_800_000;
            var time = Math.floor(Math.random() * max);

            setTimeout(async function () {
                const greenSquare = await channel.send({
                    content: "<:GreenTriangle:1213957460940038194>",
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
                            content: "<:GreenTriangle:1213957460940038194> You destroyed the shiny! You earned \`x2\` <:crystal:1201612194387873863> and \`x10\` <:shard:1201612239422115931> cause you earned all the shiny roles available."
                        });

                        if (!data) {
                            data = new currencySchema({
                                Guild: message.guild.id,
                                UserID: message.author.id,
                                Shards: 10,
                                Crystals: 2,
                                Triangles: 1,
                            })

                            await data.save();

                            answered = true;
                            collector.stop();
                            return;
                        }

                        data.Triangles++;
                        data.Shards += 10;
                        data.Crystals += 2;

                        await data.save();

                        answered = true;
                        collector.stop();
                        return;
                    }

                    if (message.member.roles.cache.has(pentagon)) {
                        message.member.roles.add(alpha)
                        message.reply({
                            content: "<:GreenTriangle:1213957460940038194> You destroyed the shiny! You earned the `Green Alpha Pentagon` role, \`x1\` <:crystal:1201612194387873863> and \`x5\` <:shard:1201612239422115931>."
                        });

                        if (!data) {
                            data = new currencySchema({
                                Guild: message.guild.id,
                                UserID: message.author.id,
                                Shards: 5,
                                Crystals: 1,
                                Triangles: 1
                            })

                            await data.save();

                            answered = true;
                            collector.stop();
                            return;
                        }

                        data.Triangles++;
                        data.Crystals++;
                        data.Shards += 5;

                        await data.save();

                        answered = true;
                        collector.stop();
                        return;
                    }

                    if (message.member.roles.cache.has(triangle)) {
                        message.member.roles.add(pentagon);
                        message.member.roles.add(alpha);
                        message.reply({
                            content: "<:GreenTriangle:1213957460940038194> You destroyed the shiny! You earned the `Green Pentagon` and the `Green Alpha Pentagon` roles."
                        });

                        if (!data) {
                            data = new currencySchema({
                                Guild: message.guild.id,
                                UserID: message.author.id,
                                Triangles: 1
                            })

                            await data.save();

                            answered = true;
                            collector.stop();
                            return;
                        }

                        data.Triangles++

                        await data.save();

                        answered = true;
                        collector.stop();
                        return;
                    }

                    if (message.member.roles.cache.has(square)) {
                        message.member.roles.add(triangle);
                        message.member.roles.add(pentagon);
                        message.reply({
                            content: "<:GreenTriangle:1213957460940038194> You destroyed the shiny! You earned the `Green Triangle` and the `Green Pentagon` roles."
                        });

                        if (!data) {
                            data = new currencySchema({
                                Guild: message.guild.id,
                                UserID: message.author.id,
                                Triangles: 1
                            })

                            await data.save();

                            answered = true;
                            collector.stop();
                            return;
                        }

                        data.Triangles++;

                        await data.save();

                        answered = true;
                        collector.stop();
                        return;
                    }

                    message.member.roles.add(square);
                    message.member.roles.add(triangle);
                    message.reply({
                        content: "<:GreenTriangle:1213957460940038194> You destroyed the shiny! You earned the `Green Square` and the `Green Triangle` roles."
                    });

                    if (!data) {
                        data = new currencySchema({
                            Guild: message.guild.id,
                            UserID: message.author.id,
                            Triangles: 1
                        })

                        await data.save();

                        answered = true;
                        collector.stop();
                        return;
                    }

                    data.Triangles++;

                    await data.save();

                    answered = true;
                    collector.stop();
                    return;
                })

                collector.on("end", () => {
                    if (!answered) {
                        greenSquare.edit({
                            content: "<:GreenTriangle:1213957460940038194> The shiny disappeared! No one destroyed it in time."
                        })
                    }
                })

                loop();
            }, time);
        }());
    },
};