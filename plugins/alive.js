const Asena = require('../events');
const Config = require('../config');

const Language = require('../language');
const Lang = Language.getString('alive');

Asena.addCommand({ pattern: 'alive$', fromMe: true, desc: Lang.ALIVE_DESC }, (async (message, match) => {
  var alive_msg = `*🐺 ${Lang.ALIVE} ${Config.VERSION}!*`
  return await message.client.sendMessage(message.jid, {
    text: alive_msg,
    edit: message.key
  });
}));
