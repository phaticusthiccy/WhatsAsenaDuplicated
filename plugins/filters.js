/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const FilterDb = require('./sql/filters');
const filters = require('./sql/filters');

Asena.addCommand({pattern: 'filter ?(.*)', fromMe: true, desc: 'Filtre ekler. Yazdığınız filtreyi birisi yazarsa yazdığınıı cevabı gönderir. Eğer sadece filter yazarsanız eklediğiniz filtreleri getirir.', usage: '.filter "merhaba" "merhaba, nasılsın?"'}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);

    if (match === null) {
        filtreler = await FilterDb.getFilter(message.jid);
        if (filtreler === false) {
            await message.sendMessage('*❌ Bu sohbette hiç filter yok!*')
        } else {
            var mesaj = '*🔎 Bu sohbetdeki filtreleriniz:*\n';
            filtreler.map((filter) => mesaj += '```' + filter.dataValues.pattern + '```\n');
            await message.sendMessage(mesaj);
        }
    } else {
        if (match.length < 2) {
            return await message.sendMessage('*❌ Lütfen cevap yazın!*\n*Örnek:* ```.filter "sa" "as"');
        }
        await FilterDb.setFilter(message.jid, match[0].replace(/['"“]+/g, ''), match[1].replace(/['"“]+/g, ''), match[0][0] === "'" ? true : false);
        await message.sendMessage('*✅ Başarılı bir şekilde* ```' + match[0].replace(/['"]+/g, '') + '``` *filtresi ayarlandı!*');
    }
}));

Asena.addCommand({pattern: 'stop ?(.*)', fromMe: true, desc: "Ekledğiniz filtreyi durdurur.", usage: '.stop "merhaba"'}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);
    if (match === null) {
        return await message.sendMessage('*❌ Lütfen bir filtre yazın!*\n*Örnek:* ```.stop "merhaba"```')
    }

    del = await FilterDb.deleteFilter(message.jid, match[0].replace(/['"“]+/g, ''));
    
    if (!del) {
        await message.sendMessage('*❌ Zaten böyle bir filtre yok!*')
    } else {
        await message.sendMessage('*✅ Filtreniz başarılı bir şekilde silindi!*')
    }
}));


Asena.addCommand({on: 'text', fromMe: false}, (async (message, match) => {
    var filtreler = await FilterDb.getFilter(message.jid);
    if (!filtreler) return; 
    filtreler.map(
        async (filter) => {
            pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : '\\b' + filter.dataValues.pattern, 'g');
            if (pattern.test(message.message)) {
                await message.reply(filter.dataValues.text);
            }
        }
    );
}));
