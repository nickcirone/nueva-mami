const { shuffleMessages } = require("../../helpers/verbiageHelpers");
const db = require("../../mongoDB");

module.exports = async (client, queue, song) => {
  let lang = await db?.musicbot?.findOne({
    guildID: queue?.textChannel?.guild?.id,
  });
  lang = lang?.language || client.language;
  lang = require(`../../languages/${lang}.js`);

  if (queue) {
    if (!client.config.opt.loopMessage && queue?.repeatMode !== 0) return;
    if (queue?.textChannel) {
      const songTitle = song?.name;
      const message = shuffleMessages("playSong").replace("{songTitle}", songTitle);
      console.log(`Now playing track: ${songTitle}.`);
      queue?.textChannel
        ?.send({
          content: message,
        })
        .catch((e) => {});
    }
  }
};
