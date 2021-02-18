const Asena = require('../events');
const speech = require('@google-cloud/speech');
const fs = require('fs');
const { MessageType } = require('@adiwajshing/baileys');

const client = new speech.SpeechClient({
    credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS)
});
const Language = require('../language');
const { cpuUsage } = require('process');
const Lang = Language.getString('voicy');

Asena.addCommand({ pattern: 'voicy', desc: 'voicy', usage: 'sa', fromMe: true }, (async (message, match) => {
    if (message.reply_message) {
        if (!message.reply_message.text && !message.reply_message.video && !message.reply_message.image && !message.reply_message.message) {
            const file = await message.client.downloadAndSaveMediaMessage({
                key: {
                    remoteJid: message.reply_message.jid,
                    id: message.reply_message.id
                },
                message: message.reply_message.data.quotedMessage
            })

            const config = {
                encoding: 'OGG_OPUS',
                sampleRateHertz: 16000,
                languageCode: 'tr-TR',
            };
            const audio = {
                content: fs.readFileSync(file).toString('base64')
            }
            const requestBody = {
                audio: audio,
                config: config,
            };

            // Detects speech in the audio file
            const [response] = await client.recognize(requestBody);
            const transcription = response.results
                .map(result => result.alternatives[0].transcript)
                .join('\n');


            await message.client.sendMessage(message.reply_message.jid, '*Hey! Seste bunlari duydum!:*\n\n ' + transcription, MessageType.text)

        } else {
            await message.client.sendMessage(message.jid, Lang.ONLY_AUDIO)

        }
    } else {
        await message.client.sendMessage(message.jid, Lang.NEED_REPLY)

    }


}));