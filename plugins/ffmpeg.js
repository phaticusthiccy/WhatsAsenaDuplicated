/* Codded by @phaticusthiccy
Telegram: t.me/phaticusthiccy
Instagram: www.instagram.com/kyrie.baran
*/

const Asena = require('../events');
const {MessageType,Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const {execFile} = require('child_process');
const cwebp = require('cwebp-bin');

const Language = require('../language');
const Lang = Language.getString('ffmpeg');


Asena.addCommand({pattern: 'ffmpeg ?(.*)', fromMe: true, desc: Lang.FF_DESC, warn: 'Dont use on photos! Only for Videos.'}, (async (message, match) => {    
    if (match[1] === '') return await message.sendMessage('Need Video and Filter Name!\nℹ️ Ex: ```.ffmpeg fade=in:0:30```\nℹ️ Ex: ```.ffmpeg fade=in:0:30, fps=fps=25```');
    var downloading = await message.client.sendMessage(message.jid,Lang.FF_PROC,MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .videoFilters(`${match[1]}`)
        .format('mp4')
        .save('output.mp4')
        .on('end', async () => {
            await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, {mimetype: Mimetype.mpeg});
        });
    return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
}));
