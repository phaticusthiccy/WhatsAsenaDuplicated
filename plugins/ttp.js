/* Codded By @TOXIC-DEVIL

## CopyRight (C) 2021 [ @TOXIC-DEVIL ]
## WhatsAsenaDuplicated
##
# GNU General Public License for more details.
#
## WhatsAsenaDuplicated - [ Command Coder - @TOXIC-DEVIL ]
*/

const Asena = require('../events');
const { MessageType, MessageOptions, Mimetype } = require('@adiwajshing/baileys');
const fs = require('fs');
const axios = require('axios');
const Config = require('../config');

const Language = require('../language');
const Lang = Language.getString('ttp');


if (Config.WORKTYPE == 'private') {
    Asena.addCommand({ pattern: 'ttp ?(.*)', fromMe: true, desc: Lang.TTP_DESC }, (async (message, match) => {
        if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
        var uri = encodeURI(match[1])
        var ttinullimage = await axios.get('https://api.xteam.xyz/ttp?file&text=' + uri, { responseType: 'arraybuffer' })
        await message.client.sendMessage(message.jid,Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'Made by WhatsAsena' })
    }));
    Asena.addCommand({ pattern: 'attp ?(.*)', fromMe: true, desc: Lang.ATTP_DESC }, (async (message, match) => {
        if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
        var uri = encodeURI(match[1])
        var ttinullimage = await axios.get('https://api.xteam.xyz/attp?file&text=' + uri, { responseType: 'arraybuffer' })
        await message.client.sendMessage(message.jid,Buffer.from(ttinullimage.data), MessageType.sticker, { mimetype: Mimetype.webp })
    }));
    Asena.addCommand({ pattern: 'glowttp ?(.*)', fromMe: true, desc: Lang.GLOW_DESC }, (async (message, match) => {
        if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);
        var uri = encodeURI(match[1])
        var ttinullimage = await axios.get('https://videfikri.com/api/textmaker/glowingneon/?text=' + uri, { responseType: 'arraybuffer' })
        await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'Made by WhatsAsena' })
    }));
    Asena.addCommand({ pattern: 'burnttp ?(.*)', fromMe: true, desc: Lang.BURN_DESC }, (async (message, match) => {
        if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);
        var uri = encodeURI(match[1])
        var ttinullimage = await axios.get('https://videfikri.com/api/textmaker/burnpaper/?text=' + uri, { responseType: 'arraybuffer' })
        await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'Made by WhatsAsena' })
    }));
}
else if (Config.WORKTYPE == 'public') {
    Asena.addCommand({ pattern: 'ttp ?(.*)', fromMe: false, desc: Lang.TTP_DESC }, (async (message, match) => {
        if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
        var uri = encodeURI(match[1])
        var ttinullimage = await axios.get('https://api.xteam.xyz/ttp?file&text=' + uri, { responseType: 'arraybuffer' })
        await message.client.sendMessage(message.jid,Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'Made by WhatsAsena' })
    }));
    Asena.addCommand({ pattern: 'attp ?(.*)', fromMe: false, desc: Lang.ATTP_DESC }, (async (message, match) => {
        if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
        var uri = encodeURI(match[1])
        var ttinullimage = await axios.get('https://api.xteam.xyz/attp?file&text=' + uri, { responseType: 'arraybuffer' })
        await message.client.sendMessage(message.jid,Buffer.from(ttinullimage.data), MessageType.sticker, { mimetype: Mimetype.webp })
    }));
    Asena.addCommand({ pattern: 'glowttp ?(.*)', fromMe: false, desc: Lang.GLOW_DESC }, (async (message, match) => {
        if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);
        var uri = encodeURI(match[1])
        var ttinullimage = await axios.get('https://videfikri.com/api/textmaker/glowingneon/?text=' + uri, { responseType: 'arraybuffer' })
        await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'Made by WhatsAsena' })
    }));
    Asena.addCommand({ pattern: 'burnttp ?(.*)', fromMe: false, desc: Lang.BURN_DESC }, (async (message, match) => {
        if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);
        var uri = encodeURI(match[1])
        var ttinullimage = await axios.get('https://videfikri.com/api/textmaker/burnpaper/?text=' + uri, { responseType: 'arraybuffer' })
        await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'Made by WhatsAsena' })
    }));
}
