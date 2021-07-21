const Asena = require('../events');
const {MessageType,Mimetype} = require('@adiwajshing/baileys');

const fs = require('fs');
const axios = require('axios');
const conf = require('../config');
const FormData = require('form-data');
const ffmpeg = require('fluent-ffmpeg');

const Language = require('../language');
const Lang = Language.getString('scrapers');

let td = conf.WORKTYPE == 'public' ? false : true

Asena.addCommand({pattern: 'find', fromMe: td, desc: Lang.FINDS_DESC}, (async (message, match) => {
    if (message.reply_message === false) return await message.client.sendMessage(message.jid, Lang.NEED_FAUDIO, MessageType.text);
    var filePath = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });
    var form = new FormData();
    ffmpeg(filePath).format('mp3').save('music.mp3').on('end', async () => {
        form.append('api_token', '2bd1fcb3ccd15607f72cdbb527907ce6');
        form.append('file', fs.createReadStream('./music.mp3'));
        form.append('return', 'apple_music, spotify');
        var configs = {
            headers: {
                ...form.getHeaders()
            }
        }
        await axios.post('https://api.audd.io/', form, configs).then(async (response) => {
            var res = response.data
            if (res === 'success') {
                await message.client.sendMessage(message.jid, `${Lang.TITTLE_F} : ${res.title}\n${Lang.ARTIST_F} : ${res.artist}`, MessageType.text);
            } else {
                await message.client.sendMessage(message.jid, Lang.NOT_FOUNDFS, MessageType.text);
            }
        }).catch((error) =>  {
            console.log(error);
        });
    });

})); 
