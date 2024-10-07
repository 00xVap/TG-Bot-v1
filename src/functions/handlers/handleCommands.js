const fs = require("fs");

async function handleCommands(client) {
    const commandArray = [];
  
    const commandFolders = fs.readdirSync("./src/commands/");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
  
      const { commands } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        const properties = { folder, ...command };
        
        commands.set(command.data.name, properties);
        commandArray.push(command.data.toJSON());
        
        continue;
      }
    }
  
    client.application.commands.set(commandArray)
  
    return console.log(`[SYSTEM]: Loaded ${commandArray.length} commands.`)
  }
  
  module.exports = { handleCommands };