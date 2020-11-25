/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const sql = require('./sql/greetings');

const Language = require('../language');
const Lang = Language.getString('greetings');

Asena.addCommand({pattern: 'welcome$', fromMe: true, desc: Lang.WELCOME_DESC}, (async (message, match) => {
    var hg = await sql.getMessage(message.jid);
    if (hg === false) {
        await message.sendMessage(Lang.NOT_SET_WELCOME);
    } else {
        await message.sendMessage(Lang.WELCOME_ALREADY_SETTED + hg.message + '```');
    }
}));

Asena.addCommand({pattern: 'welcome (.*)', fromMe: true, dontAddCommandList: true}, (async (message, match) => {
    if (match[1] === '') {
        return await message.sendMessage(Lang.NEED_WELCOME_TEXT);
    } else {
        if (match[1] === 'sil') { await message.sendMessage(Lang.WELCOME_DELETED); return await sql.deleteMessage(message.jid, 'welcome'); }
        await sql.setMessage(message.jid, 'welcome', match[1]);
        return await message.sendMessage(Lang.WELCOME_SETTED)
    }
}));

Asena.addCommand({pattern: 'goodbye$', fromMe: true, desc: Lang.GOODBYE_DESC}, (async (message, match) => {
    var hg = await sql.getMessage(message.jid, 'goodbye');
    if (hg === false) {
        await message.sendMessage(Lang.NOT_SET_GOODBYE)
    } else {
        await message.sendMessage(Lang.GOODBYE_ALREADY_SETTED + hg.message + '```');
    }
}));

Asena.addCommand({pattern: 'goodbye (.*)', fromMe: true, dontAddCommandList: true}, (async (message, match) => {
    if (match[1] === '') {
        return await message.sendMessage(Lang.NEED_GOODBYE_TEXT);
    } else {
        if (match[1] === 'sil') { await message.sendMessage(Lang.GOODBYE_DELETED); return await sql.deleteMessage(message.jid, 'goodbye'); }
        await sql.setMessage(message.jid, 'goodbye', match[1]);
        return await message.sendMessage(Lang.GOODBYE_SETTED)
    }
}));
