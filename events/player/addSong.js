const db = require("../../mongoDB");
const { shuffleMessages } = require("../../helpers/verbiageHelpers");

module.exports = async (client, queue, song) => {
  let lang = await db?.musicbot?.findOne({
    guildID: queue?.textChannel?.guild?.id,
  });
  lang = lang?.language || client.language;
  lang = require(`../../languages/${lang}.js`);
  const selectaName = song.user.id;
  const songTitle = song.name
  console.log(`Adding track: ${songTitle} to the queue.`);
  const message = shuffleMessages("queueSong").replace("{songTitle}", songTitle).replace("{selecta}", selectaName);
  queue?.textChannel
    ?.send({
      content: message,
    })
    .catch((e) => {});
};
