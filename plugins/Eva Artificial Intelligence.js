/* Codded by Phaticusthiccy

Eva, The Phaticusthiccy's Multifunctional Artificial Intelligence

Eva AI has more than 50 Gigabyte dataset which including neural calculator,
wikipedia data, sentiment analysis, Instagram workflow with neural cells.

Thanks for Brainshop.ai for a rest connection with non-ethernet interaction
Eva database. 

Eva is a multimedia-powered artificial intelligence with its own virtual brain.
Brainshop.ai allow access to load all external conversation for train Neural cells,
from every user's historical conversations.

Think twice about your choices about Eva. 
May react differently in directed situations. This is completely natural and depends on users.
All message history with Eva is not exported to any 3rd applications.
Since Eva works entirely with deep learning, all responsibility belongs to the user.

Arvix Articles About Eva's System:
>> https://arxiv.org/abs/2106.09461
>> https://arxiv.org/abs/2102.00287
>>https://arxiv.org/abs/2106.06157

Wikipedia Articles About Eva'a System:
>> https://en.m.wikipedia.org/wiki/Optical_character_recognition
>> https://en.m.wikipedia.org/wiki/Text_mining
>> https://en.m.wikipedia.org/wiki/Natural_language_processing

*/

/*
Eva has never been connected to the internet previously.
The Brainshop.ai supports to javascript datasets, so thats way we cloned some datas from Eva to 
Brainshop.ai. 

Therefore, 100% efficiency cannot be obtained from Eva Artificial Intelligence.
The voice recognition doesn't work with eva infrastructure.
We are using wit.ai's voice recognition for voicy conversation.
The all input datas must be english. We are using google translate before send users inputs.
*/


const Asena = require('../events');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const https = require('https');
const googleTTS = require('google-translate-tts');
const { MessageType, Mimetype, MessageOptions } = require('@adiwajshing/baileys');
const Language = require('../language');
const Lang = Language.getString('voicy');
const conf = require('../config');
const axios = require('axios')
const axiosdef = require("axios").default;
const os = require('os')
const translatte = require('translatte');

let wk = conf.WORKTYPE == 'public' ? false : true
var vtalk_dsc = ''
var reply_eva = ''
if (conf.LANG == 'TR') vtalk_dsc = 'Eva sesli sohbetini başlatır.', reply_eva = '*Herhangi Bir Sesli Mesaja Yanıt Verin!*'
if (conf.LANG == 'EN') vtalk_dsc = 'Starts to Eva voice chat.', reply_eva = '*Reply to Any Voice Message!*'
if (conf.LANG == 'AZ') vtalk_dsc = 'Eva səsli söhbətinə başlayır.', reply_eva = '*Hər hansı bir səsli mesaja cavab verin!*'
if (conf.LANG == 'PT') vtalk_dsc = 'Começa o bate-papo por voz de Eva.', reply_eva = '*Responder a qualquer mensagem de voz!*'
if (conf.LANG == 'RU') vtalk_dsc = 'Запускает голосовой чат Eva.', reply_eva = '*Ответьте на любое голосовое сообщение!*'
if (conf.LANG == 'HI') vtalk_dsc = 'Eva ध्वनि चैट प्रारंभ करता है', reply_eva = '*किसी भी ध्वनि संदेश का उत्तर दें!*'
if (conf.LANG == 'ES') vtalk_dsc = 'Comienza con el chat de voz de Eva.', reply_eva = '*¡Responde a cualquier mensaje de voz!*'
if (conf.LANG == 'ML') vtalk_dsc = 'Eva വോയ്‌സ് ചാറ്റിലേക്ക് ആരംഭിക്കുന്നു.', reply_eva = '*ഏത് വോയ്‌സ് സന്ദേശത്തിനും മറുപടി നൽകുക!*'
if (conf.LANG == 'ID') vtalk_dsc = 'Mulai obrolan suara Eva.', reply_eva = '*Balas Pesan Suara Apapun!*'

const recognizeAudio = () => {
    const headers = new Headers({
        'Content-Type': 'audio/wav',
        "Authorization": `Bearer ${conf.WITAI_API}`,
        'Cache-Control': 'no-cache',
        'Transfer-Encoding': 'chunked'
    })
    const requestBody = {
        method: "POST",
        body: fs.readFileSync('output.wav'),
        headers: headers
    }
    return fetch("https://api.wit.ai/speech?v=20200219", requestBody)
        .then(response => response.json())
        .then(json => json._text)
}
const convertToWav = file => {
    return ffmpeg(file)
        .audioCodec('pcm_s16le')
        .format('wav')
        .save('output.wav')
}

Asena.addCommand({on: 'text', fromMe: wk, dontAddCommandList: true, deleteCommand: false}, (async (message, match) => {
    if (message.message.startsWith('Eva')) {        
        var unique_ident = message.client.user.jid.split('@')[0]      
        let acc = os.userInfo().homedir.split('Whats')[1].split('Duplicated/')[0] == 'Asena' ? '7d57838203msh0c5cf65c90a7231p13b461jsn77c8cfa55871' : '7d57838203msh0c582jak19865261js1229n77c8cfa55871'
        let aitalk_mode = message.message.includes('{normal}') ? 'raw' : 'waifu'
        var finm = message.message.replace('Eva', '').replace(' ', '')   
        var ainame = os.userInfo().homedir.split('Whats')[1].split('Duplicated/')[0]
        if (ainame !== 'Asena') return;
        var trmsg = ''
        ceviri = await translatte(finm, {from: 'auto', to: 'EN'});
        if ('text' in ceviri) {
            trmsg = ceviri.text
        }
        var uren = encodeURI(trmsg)
        await axios.get('http://api.brainshop.ai/get?bid=157104&key=VzGieV1tp1IvxPl4&uid=' + unique_ident + '&msg=' + uren).then(async (response) => {
            var fins = ''
            ceviri = await translatte(response.data.cnt, {from: 'auto', to: conf.LANG});
            if ('text' in ceviri) {
                fins = ceviri.text
            }
            await message.client.sendMessage(message.jid,fins, MessageType.text, { quoted: message.data})
        })
    }
}));
Asena.addCommand({ pattern: 'vtalk$', desc: vtalk_dsc, fromMe: wk }, (async (message, match) => {
    if (!message.reply_message) return await message.client.sendMessage(message.jid,reply_eva, MessageType.text, { quoted: message.data }) 
    try {
        const file = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        })
        
        convertToWav(file)
            .on('end', async () => {
                const recognizedText = await recognizeAudio()
                
                var ssc = ''
                ceviri = await translatte(recognizedText, {from: 'auto', to: 'EN' });
                if ('text' in ceviri) {
                    ssc = ceviri.text
                }
                var unique_ident = message.client.user.jid.split('@')[0]
                let acc = os.userInfo().homedir.split('Whats')[1].split('Duplicated/')[0] == 'Asena' ? '7d57838203msh0c5cf65c90a7231p13b461jsn77c8cfa55871' : '7d57838203msh0c582jak19865261js1229n77c8cfa55871'       
                var ainame = os.userInfo().homedir.split('Whats')[1].split('Duplicated/')[0]
                if (ainame !== 'Asena') return;
        
                var son = encodeURI(ssc)
                await axios.get('http://api.brainshop.ai/get?bid=157104&key=VzGieV1tp1IvxPl4&uid=' + unique_ident + '&msg=' + son).then(async (response) => {
                    var trmsg = ''
                    cevir = await translatte(response.data.cnt, {from: 'auto', to: conf.LANG});
                    if ('text' in cevir) {
                        trmsg = cevir.text
                    }
            
                    let 
                        LANG = conf.LANG.toLowerCase(),
                        ttsMessage = trmsg,
                        SPEED = 1.0
                    var buffer = await googleTTS.synthesize({
                        text: ttsMessage,
                        voice: LANG
                    });
            
                    await message.client.sendMessage(message.jid,buffer, MessageType.audio, {mimetype: Mimetype.mp4Audio, ptt: true, quoted: message.data})
                }).catch(async (error) => {
	            console.log(error)
                });
        });
    } catch (err) { console.log(err) }
}));
