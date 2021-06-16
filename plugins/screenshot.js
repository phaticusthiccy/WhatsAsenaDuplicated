/* Codded by @phaticusthiccy
Telegram: t.me/phaticusthiccy
Instagram: www.instagram.com/kyrie.baran
*/

const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const axios = require('axios');
const request = require('request');
const got = require("got");
const Config = require('../config');

const Language = require('../language');
const Lang = Language.getString('webss');

if (Config.WORKTYPE == 'private') {

    Asena.addCommand({pattern: 'ss ?(.*)', fromMe: true, desc: Lang.SS_DESC}, (async (message, match) => {

        if (match[1] === '') return await message.sendMessage(Lang.LİNK);

        var webimage = await axios.get(`https://shot.screenshotapi.net/screenshot?&url=${match[1]}&output=image&file_type=png&wait_for_event=load`, { responseType: 'arraybuffer' })

        await message.sendMessage(Buffer.from(webimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Made by WhatsAsena'})

    }));

    Asena.addCommand({pattern: 'spdf ?(.*)', fromMe: true, desc: Lang.SPDF_DESC }, (async (message, match) => {

        if (match[1] === '') return await message.sendMessage(Lang.LİNK);

        var webimage = await axios.get(`https://api.html2pdf.app/v1/generate?url=${match[1]}&apiKey=begC4dFAup1b8LyRXxAfjetfqDg2uYx8PWmh9YJ59tTZXiUyh2Vs72HdYQB68vyc`, { responseType: 'arraybuffer' })

        await message.sendMessage(Buffer.from(webimage.data), MessageType.document, {mimetype: Mimetype.pdf})

    }));   
}
else if (Config.WORKTYPE == 'public') {

    Asena.addCommand({pattern: 'ss ?(.*)', fromMe: false, desc: Lang.SS_DESC}, (async (message, match) => {

        if (match[1] === '') return await message.sendMessage(Lang.LİNK);

        var webimage = await axios.get(`https://shot.screenshotapi.net/screenshot?&url=${match[1]}&output=image&file_type=png&wait_for_event=load`, { responseType: 'arraybuffer' })

        await message.sendMessage(Buffer.from(webimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Made by WhatsAsena'})

    }));

    Asena.addCommand({pattern: 'spdf ?(.*)', fromMe: false, desc: Lang.SPDF_DESC }, (async (message, match) => {

        if (match[1] === '') return await message.sendMessage(Lang.SPDF_LINK);

        var webimage = await axios.get(`https://api.html2pdf.app/v1/generate?url=${match[1]}&apiKey=begC4dFAup1b8LyRXxAfjetfqDg2uYx8PWmh9YJ59tTZXiUyh2Vs72HdYQB68vyc`, { responseType: 'arraybuffer' })

        await message.sendMessage(Buffer.from(webimage.data), MessageType.document, {mimetype: Mimetype.pdf})

    }));
}

