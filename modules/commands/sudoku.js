class quất {
  constructor(a) {
    this.config = a
  }
  async run({ api: { sendMessage }, event: { senderID, threaID, messageID } }) {
    let send = (a, b) => sendMessage(a, threadID, b, messageID)
  }
}             
module.exports = new quất({
  name: 'sudoku',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'quất',
  description: '[]',
  commandCategory: '[]',
  usages: '[]',
  cooldowns: 0,
  usePrefix: false
})
