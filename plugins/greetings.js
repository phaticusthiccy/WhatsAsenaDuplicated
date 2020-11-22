/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const sql = require('./sql/greetings');

Asena.addCommand({pattern: 'welcome$', fromMe: true, desc: 'Hoşgeldin mesajı ayarlar. Eğer mesaj yazmazsanız hoşgeldin mesajını getirir.'}, (async (message, match) => {
    var hg = await sql.getMessage(message.jid);
    if (hg === false) {
        await message.sendMessage('*Hoşgeldin mesajı ayarlamadınız!*\n**Ayarlamak için:** ```.welcome hoşgeldin mesajınız```');
    } else {
        await message.sendMessage('*✅ Hoşgeldin mesajı ayarlanmış!*\n*Mesaj:* ```' + hg.message + '```');
    }
}));

Asena.addCommand({pattern: 'welcome (.*)', fromMe: true, dontAddCommandList: true}, (async (message, match) => {
    if (match[1] === '') {
        return await message.sendMessage('**Hoşgeldin mesajı ayarlayabilmek için mesaj yazmanız gerekmekte.**\n**Örnek:** ```.welcome HOŞGELDİN!```');
    } else {
        if (match[1] === 'sil') { await message.sendMessage('*✅ Hoşgeldin mesajını başarıyla silindi!*'); return await sql.deleteMessage(message.jid, 'welcome'); }
        await sql.setMessage(message.jid, 'welcome', match[1]);
        return await message.sendMessage('*✅ Hoşgeldin mesajını başarıyla ayarlandı!*')
    }
}));

Asena.addCommand({pattern: 'goodbye$', fromMe: true, desc: 'Görüşürüz mesajı ayarlar. Eğer mesaj yazmazsanız görüşürüz mesajını getirir.'}, (async (message, match) => {
    var hg = await sql.getMessage(message.jid, 'goodbye');
    if (hg === false) {
        await message.sendMessage('*Görüşürüz mesajı ayarlamadınız!*\n*Ayarlamak için:* ```.goodbye Görüşürüz mesajınız```')
    } else {
        await message.sendMessage('*✅ Görüşürüz mesajı ayarlanmış!*\n*Mesaj:* ```' + hg.message + '```');
    }
}));

Asena.addCommand({pattern: 'goodbye (.*)', fromMe: true, dontAddCommandList: true}, (async (message, match) => {
    if (match[1] === '') {
        return await message.sendMessage('*Görüşürüz mesajı ayarlayabilmek için mesaj yazmanız gerekmekte.*\n*Örnek:* ```.goodbye Görüşürüz!```');
    } else {
        if (match[1] === 'sil') { await message.sendMessage('*✅ Görüşürüz mesajını başarıyla silindi!*'); return await sql.deleteMessage(message.jid, 'goodbye'); }
        await sql.setMessage(message.jid, 'goodbye', match[1]);
        return await message.sendMessage('*✅ Görüşürüz mesajını başarıyla ayarlandı!*')
    }
}));
