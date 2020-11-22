/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
  
Asena.addCommand({pattern: 'meme ?(.*)', fromMe: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('*Bir fotoğraf veya videoya yanıt verin!*');
    var topText, bottomText;

    if (match[1].includes(';')) {
        var split = match[1].split(';');
        topText = split[0];
        bottomText = split[0];
    } else {
        topText = match[1];
    }

    var info = await message.reply('```Medya indiriliyor & sticker yapılıyor...```');
    
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    // TO-DO meme
}));
