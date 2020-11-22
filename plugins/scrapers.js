/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const Asena = require('../events');
const {MessageType,Mimetype} = require('@adiwajshing/baileys');
const translatte = require('translatte');
const config = require('../config');
//============================== CURRENCY =============================================
const { exchangeRates } = require('exchange-rates-api');
const ExchangeRatesError = require('exchange-rates-api/src/exchange-rates-error.js')
//============================== TTS ==================================================
const fs = require('fs');
const https = require('https');
const googleTTS = require('google-tts-api');
//=====================================================================================
//============================== YOUTUBE ==============================================
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const yts = require( 'yt-search' )
const got = require("got");
const ID3Writer = require('browser-id3-writer');
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: 'acc6302297e040aeb6e4ac1fbdfd62c3',
    clientSecret: '0e8439a1280a43aba9a5bc0a16f3f009'
});
//=====================================================================================


Asena.addCommand({pattern: 'trt(?: |$)(\\S*) ?(\\S*)', desc: 'Google çeviri ile çeviri yapar. Bir mesaja yanıt vermeniz gerekmektedir.', usage: '.trt tr it (Türkçeden İtalyaca Çeviri)', fromMe: true}, (async (message, match) => {
    if (!message.reply_message) {
        return await message.reply('```Lütfen bir mesaja yanıt verin!```');
    }

    ceviri = await translatte(message.reply_message.message, {from: match[1] === '' ? 'auto' : match[1], to: match[2] === '' ? config.LANG : match[2]});
    if ('text' in ceviri) {
        return await message.reply('*▶️ Dil:* ```' + (match[1] === '' ? 'auto' : match[1]) + '```\n'
        + '*◀️ Çevirilen Dil*: ```' + (match[2] === '' ? config.LANG : match[2]) + '```\n'
        + '*🔎 Çeviri:* ```' + ceviri.text + '```');
    } else {
        return await message.reply('*❌ Çeviri de bir hata oluştu!*')
    }
}));

Asena.addCommand({pattern: 'currency(?: ([0-9.]+) ([a-zA-Z]+) ([a-zA-Z]+)|$|(.*))', fromMe: true}, (async (message, match) => {
    if(match[1] === undefined || match[2] == undefined || match[3] == undefined) {
        return await message.reply('```Sözdizimi hatası!```');
    }
    let opts = {
        amount: parseFloat(match[1]).toFixed(2).replace(/\.0+$/,''),
        from: match[2].toUpperCase(),
        to: match[3].toUpperCase()
    }
    try {
        result = await exchangeRates().latest().symbols([opts.to]).base(opts.from).fetch()
        result = parseFloat(result).toFixed(2).replace(/\.0+$/,'')
        await message.reply(`\`\`\`${opts.amount} ${opts.from} = ${result} ${opts.to}\`\`\``)
    }
    catch(err) {
        if (err instanceof ExchangeRatesError) 
            await message.reply("```Döviz dönüşümü yapılamadı, yanlış birim yazdınız!```")
        else {
            await message.reply("```Bir hata oluştu, döviz dönüşümü yapılamadı!```")
            console.log(err)
        }
    }
}));

Asena.addCommand({pattern: 'tts (.*)', fromMe: true, desc: 'Yazıyı sese çevirir.'}, (async (message, match) => {
    if(match[1] === undefined || match[1] == "")
        return;
    
    let 
        LANG = config.LANG,
        ttsMessage = match[1],
        SPEED = 1.0

    if(langMatch = match[1].match("\\{([a-z]{2})\\}")) {
        LANG = langMatch[1]
        ttsMessage = ttsMessage.replace(langMatch[0], "")
    } 
    if(speedMatch = match[1].match("\\{([0].[0-9]+)\\}")) {
        SPEED = parseFloat(speedMatch[1])
        ttsMessage = ttsMessage.replace(speedMatch[0], "")
    }
    
    let url = await googleTTS(ttsMessage, LANG, SPEED)
    const filePath = "translate_tts.mp3"
    const file = fs.createWriteStream(filePath);
    const request = https.get(url, async response => {
        if (response.statusCode !== 200) {
            await message.reply("```Hata, yazdığınız cümlenin konuşma sentezi yapılamadı!```")
            fs.unlink(filePath, async () => {})
            return;
        }
        fileInfo = {
            mime: response.headers['content-type'],
            size: parseInt(response.headers['content-length'], 10),
        };
        response.pipe(file);
    });
    file.on('finish', async () => {
        const buffer = fs.readFileSync(filePath)
        await message.sendMessage(buffer, MessageType.audio, {mimetype: Mimetype.mp4Audio, ptt: true});
        fs.unlink(filePath, async () => {})
    });
    let error = async function(err) {
        console.log(err)
        fs.unlink(filePath, async () => {
            await message.reply("```Hata, yazdığınız cümlenin konuşma sentezi yapılamadı!```")
        });
    }
    request.on('error', error)
    file.on('error', error)
    request.end();
}));

Asena.addCommand({pattern: 'song ?(.*)', fromMe: true, desc: 'Yazdığınız şarkıyı yükler.'}, (async (message, match) => { 
    if (match[1] === '') return await message.sendMessage('*Lütfen bir şarkı yazın!*\n*Örnek:* ```.song flört - rasta baba```');    
    let arama = await yts(match[1]);
    arama = arama.all;
    if(arama.length < 1) return await message.sendMessage('*Hiçbir şey bulamadım :(*\n');
    var reply = await message.reply('```Şarkınız indiriliyor...```');

    let title = arama[0].title.replace(' ', '+');
    let stream = ytdl(arama[0].videoId, {
        quality: 'highestaudio',
    });
    
    got.stream(arama[0].image).pipe(fs.createWriteStream(title + '.jpg'));
    ffmpeg(stream)
        .audioBitrate(320)
        .save('./' + title + '.mp3')
        .on('end', async () => {
            const writer = new ID3Writer(fs.readFileSync('./' + title + '.mp3'));
            writer.setFrame('TIT2', arama[0].title)
                .setFrame('TPE1', [arama[0].author.name])
                .setFrame('APIC', {
                    type: 3,
                    data: fs.readFileSync(title + '.jpg'),
                    description: arama[0].description
                });
            writer.addTag();

            await reply.delete();
            reply = await message.reply('```Şarkınız yükleniyor...```');
            await message.sendMessage(Buffer.from(writer.arrayBuffer), MessageType.audio, {mimetype: Mimetype.mp4Audio, ptt: false});
            await reply.delete();
        });
}));

Asena.addCommand({pattern: 'video ?(.*)', fromMe: true, desc: 'Youtubedan video indirir.'}, (async (message, match) => { 
    if (match[1] === '') return await message.sendMessage('*Lütfen bir video adresi yazın!*\n*Örnek:* ```.video https://www.youtube.com/watch?v=nAFlVm5qeBc```');    
    
    try {
        var arama = await yts({videoId: ytdl.getURLVideoID(match[1])});
    } catch {
        return await message.sendMessage('*Hiçbir şey bulamadım :(*\n');
    }

    var reply = await message.reply('```Videonuz indiriliyor...```');

    var yt = ytdl(arama.videoId, {filter: format => format.container === 'mp4' && ['720p', '480p', '360p', '240p', '144p'].map(() => true)});
    yt.pipe(fs.createWriteStream('./' + arama.videoId + '.mp4'));

    yt.on('end', async () => {
        await reply.delete();
        reply = await message.reply('```Videonuz yükleniyor...```');
        await message.sendMessage(fs.readFileSync('./' + arama.videoId + '.mp4'), MessageType.video, {mimetype: Mimetype.mp4});
        await reply.delete();
    });
}));