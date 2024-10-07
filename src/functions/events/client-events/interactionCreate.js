const { EmbedBuilder, PermissionFlagsBits, Collection } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    await interaction.client.application.fetch();

    const perms = interaction.channel
      .permissionsFor(client.user)
      .has(PermissionFlagsBits.SendMessages, false);

    if (!perms) {
      const embed = new EmbedBuilder()
      .setColor(client.color)
        .setDescription(`
          <:Error:977069715149160448> I don't have enough permissions to do this command!
          <:space:1005359382776778802>**»** *Missing Permissions: \`SEND_MESSAGES\`*
        `);

      await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
      return;
    }

    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      const { cooldowns } = client;

      if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
      }

      const now = Date.now();
      const timestamps = cooldowns.get(command.name);
      const defaultCooldownDuration = 3;
      const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

      if (timestamps.has(interaction.user.id)) {
        const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

        if (now < expirationTime) {
          const expiredTimestamp = Math.round(expirationTime / 1000);
          const embed = new EmbedBuilder()
            .setColor(client.color)
            .setDescription(`<:Error:977069715149160448> You can use this command again <t:${expiredTimestamp}:R>!`)

          await interaction.reply({
            embeds: [embed],
            ephemeral: true
          });
          return;
        } else {
          await command.execute(interaction, client);
          return;
        }
      }

      timestamps.set(interaction.user.id, now);
      setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

      await command.execute(interaction, client);
      return;

    } else if (interaction.isContextMenuCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const contextCommand = commands.get(commandName);
      if (!contextCommand) return;

      await contextCommand.execute(interaction, client);
    }
  },
};
