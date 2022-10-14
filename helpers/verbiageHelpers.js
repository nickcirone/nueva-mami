const shufflableMessages = {
    playSong: [
        `🎵 Now rinsing that new **{songTitle}** type record 🎧. This shyt **IS HOT**!`,
        `🎵 Now Playing **{songTitle}** 🎧. **LISTEN TO THE TRACK BITCH!!** 💯💯💯`,
        `🎵 Rinsing **{songTitle}** type beat 🎧. **THIS SONG IS A WARCRIME!** 💣💣💣`
    ],
    queueSong: [
        `Legendary selecta <@{selecta}>, added **{songTitle}** to the queue.  🔙🔛🔝🔜`,
        `DJ <@{selecta}> has placed the **{songTitle}** LP on the platter, the dancefloor is not prepared for this cut.`
    ]
};

const randomFromArray = (arr) => {
    return arr[Math.floor((Math.random()*arr.length))];
};

const shuffleMessages = (messageType) => {
    return randomFromArray(shufflableMessages[messageType]);
};

module.exports = { shuffleMessages };