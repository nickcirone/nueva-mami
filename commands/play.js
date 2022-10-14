const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const db = require("../mongoDB");
module.exports = {
  name: "play",
  description: "Play a track.",
  permissions: "0x0000000000000800",
  options: [
    {
      "name": "track",
      "description": "Track to play",
      "type": 3,
      "required": true
  }
  ],
  voiceChannel: true,
  run: async (client, interaction) => {
    let lang = await db?.musicbot?.findOne({ guildID: interaction.guild.id })
    lang = lang?.language || client.language
    lang = require(`../languages/${lang}.js`);

    try {
      const name = interaction.options.getString('track')
      if (!name) return interaction.reply({ content: lang.msg59, ephemeral: true }).catch(e => { })

      await interaction.reply({ content: lang.msg61 }).catch(e => { })
      try {
        await client.player.play(interaction.member.voice.channel, name, {
          member: interaction.member,
          textChannel: interaction.channel,
          interaction
        })
      } catch (e) {
        await interaction.editReply({ content: lang.msg60, ephemeral: true }).catch(e => { })
      }
    } catch (e) {
      if (client.errorLog) {
        let embed = new EmbedBuilder()
          .setColor(client.config.embedColor)
          .setTimestamp()
          .addFields([
            { name: "Command", value: `${interaction?.commandName}` },
            { name: "Error", value: `${e.stack}` },
            { name: "User", value: `${interaction?.user?.tag} \`(${interaction?.user?.id})\``, inline: true },
            { name: "Guild", value: `${interaction?.guild?.name} \`(${interaction?.guild?.id})\``, inline: true },
            { name: "Time", value: `<t:${Math.floor(Date.now() / 1000)}:R>`, inline: true },
            { name: "Command Usage Channel", value: `${interaction?.channel?.name} \`(${interaction?.channel?.id})\``, inline: true },
            { name: "User Voice Channel", value: `${interaction?.member?.voice?.channel?.name} \`(${interaction?.member?.voice?.channel?.id})\``, inline: true },
          ])
        await client.errorLog.send({ embeds: [embed] }).catch(e => { })
      } else {
        console.log(`
    Command: ${interaction?.commandName}
    Error: ${e}
    User: ${interaction?.user?.tag} (${interaction?.user?.id})
    Guild: ${interaction?.guild?.name} (${interaction?.guild?.id})
    Command Usage Channel: ${interaction?.channel?.name} (${interaction?.channel?.id})
    User Voice Channel: ${interaction?.member?.voice?.channel?.name} (${interaction?.member?.voice?.channel?.id})
    `)
      }
      return interaction.editReply({ content: `${lang.error7}`, ephemeral: true }).catch(e => { })
    }
  },
};
