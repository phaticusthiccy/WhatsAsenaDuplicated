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
const googleTTS = require('google-translate-tts');
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
const Language = require('../language');
const Lang = Language.getString('scrapers');

const wiki = require('wikijs').default;
var gis = require('g-i-s');

Asena.addCommand({pattern: 'trt(?: |$)(\\S*) ?(\\S*)', desc: Lang.TRANSLATE_DESC, usage: Lang.TRANSLATE_USAGE, fromMe: true}, (async (message, match) => {
    if (!message.reply_message) {
        return await message.reply(Lang.NEED_REPLY);
    }

    ceviri = await translatte(message.reply_message.message, {from: match[1] === '' ? 'auto' : match[1], to: match[2] === '' ? config.LANG : match[2]});
    if ('text' in ceviri) {
        return await message.reply('*▶️ ' + Lang.LANG + ':* ```' + (match[1] === '' ? 'auto' : match[1]) + '```\n'
        + '*◀️ ' + Lang.FROM + '*: ```' + (match[2] === '' ? config.LANG : match[2]) + '```\n'
        + '*🔎 ' + Lang.RESULT + ':* ```' + ceviri.text + '```');
    } else {
        return await message.reply(Lang.TRANSLATE_ERROR)
    }
}));

Asena.addCommand({pattern: 'currency(?: ([0-9.]+) ([a-zA-Z]+) ([a-zA-Z]+)|$|(.*))', fromMe: true}, (async (message, match) => {
    if(match[1] === undefined || match[2] == undefined || match[3] == undefined) {
        return await message.reply(Lang.CURRENCY_ERROR);
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
            await message.reply(Lang.INVALID_CURRENCY)
        else {
            await message.reply(Lang.UNKNOWN_ERROR)
            console.log(err)
        }
    }
}));

Asena.addCommand({pattern: 'tts (.*)', fromMe: true, desc: Lang.TTS_DESC}, (async (message, match) => {
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
    
    var buffer = await googleTTS.synthesize({
        text: ttsMessage,
        voice: LANG
    });
    await message.sendMessage(buffer, MessageType.audio, {mimetype: Mimetype.mp4Audio, ptt: true});
}));

Asena.addCommand({pattern: 'song ?(.*)', fromMe: true, desc: Lang.SONG_DESC}, (async (message, match) => { 
    if (match[1] === '') return await message.sendMessage(Lang.NEED_TEXT_SONG);    
    let arama = await yts(match[1]);
    arama = arama.all;
    if(arama.length < 1) return await message.sendMessage(Lang.NO_RESULT);
    var reply = await message.sendMessage(Lang.DOWNLOADING_SONG);

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

            reply = await message.reply(Lang.UPLOADING_SONG);
            await message.sendMessage(Buffer.from(writer.arrayBuffer), MessageType.audio, {mimetype: Mimetype.mp4Audio, ptt: false});
        });
}));

Asena.addCommand({pattern: 'video ?(.*)', fromMe: true, desc: Lang.VIDEO_DESC}, (async (message, match) => { 
    if (match[1] === '') return await message.sendMessage(Lang.NEED_VIDEO);    
    
    try {
        var arama = await yts({videoId: ytdl.getURLVideoID(match[1])});
    } catch {
        return await message.sendMessage(Lang.NO_RESULT);
    }

    var reply = await message.reply(Lang.DOWNLOADING_VIDEO);

    var yt = ytdl(arama.videoId, {filter: format => format.container === 'mp4' && ['720p', '480p', '360p', '240p', '144p'].map(() => true)});
    yt.pipe(fs.createWriteStream('./' + arama.videoId + '.mp4'));

    yt.on('end', async () => {
        await reply.delete();
        reply = await message.reply(Lang.UPLOADING_VIDEO);
        await message.sendMessage(fs.readFileSync('./' + arama.videoId + '.mp4'), MessageType.video, {mimetype: Mimetype.mp4});
        await reply.delete();
    });
}));

Asena.addCommand({pattern: 'yt ?(.*)', fromMe: true, desc: Lang.YT_DESC}, (async (message, match) => { 
    if (match[1] === '') return await message.sendMessage(Lang.NEED_WORDS);    
    var reply = await message.reply(Lang.GETTING_VIDEOS);

    try {
        var arama = await yts(match[1]);
    } catch {
        return await message.sendMessage(Lang.NOT_FOUND);
    }
    
    var mesaj = '';
    arama.all.map((video) => {
        mesaj += '*' + video.title + '* - ' + video.url + '\n'
    });

    await message.sendMessage(mesaj);
    await reply.delete();
}));

Asena.addCommand({pattern: 'wiki ?(.*)', fromMe: true, desc: Lang.WIKI_DESC}, (async (message, match) => { 
    if (match[1] === '') return await message.sendMessage(Lang.NEED_WORDS);    
    var reply = await message.reply(Lang.SEARCHING);

    var arama = await wiki({ apiUrl: 'https://' + config.LANG + '.wikipedia.org/w/api.php' })
        .page(match[1]);

    var info = await arama.rawContent();
    await message.reply(info);
    await reply.delete();
}));

Asena.addCommand({pattern: 'img ?(.*)', fromMe: true, desc: Lang.IMG_DESC}, (async (message, match) => { 
    if (match[1] === '') return await message.sendMessage(Lang.NEED_WORDS);    

    gis(match[1], async (error, result) => {
        for (var i = 0; i < (result.length < 5 ? result.length : 5); i++) {
            var get = got(result[i].url);
            var stream = get.buffer();
            
            stream.then(async (image) => {
                await message.sendMessage(image, MessageType.image);
            });
        }

        message.reply(Lang.IMG.format((result.length < 5 ? result.length : 5), match[1]))
    });
}));