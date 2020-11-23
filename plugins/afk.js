/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');

var AFK = {
    isAfk: false,
    reason: false,
    lastseen: 0
};

// https://stackoverflow.com/a/37096512
function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " saat, " : " saat, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " dakika, " : " dakika, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " saniye" : " saniye") : "";
    return hDisplay + mDisplay + sDisplay; 
}

Asena.addCommand({on: 'text', fromMe: false, deleteCommand: false}, (async (message, match) => {   
    if (AFK.isAfk && ((!message.jid.includes('-')) || (message.jid.includes('-') && 
        (( message.mention !== false && message.mention.length !== 0 ) || message.reply_message !== false)))) {
        if (message.jid.includes('-') && (message.mention !== false && message.mention.length !== 0)) {
            message.mention.map(async (jid) => {
                if (message.client.user.jid.split('@')[0] === jid.split('@')[0]) {
                    await message.reply('```Bip bop! Bu bir bot. Sahibim şu an burada değil.```\n' + 
                    (AFK.reason !== false ? '\n*Sebep:* ```' + AFK.reason + '```' : '') + 
                    (AFK.lastseen !== 0 ? '\n*Son Görülme:* ```' + secondsToHms(Math.round((new Date()).getTime() / 1000) - AFK.lastseen) + ' önce```' : ''));            
                }
            })
        } else if (message.jid.includes('-') && message.reply_message !== false) {
            if (message.reply_message.jid.split('@')[0] === message.client.user.jid.split('@')[0]) {
                await message.reply('```Bip bop! Bu bir bot. Sahibim şu an burada değil.```\n' + 
                    (AFK.reason !== false ? '\n*Sebep:* ```' + AFK.reason + '```' : '') + 
                    (AFK.lastseen !== 0 ? '\n*Son Görülme:* ```' + secondsToHms(Math.round((new Date()).getTime() / 1000) - AFK.lastseen) + ' önce```' : ''));
            }
        } else {
            await message.reply('```Bip bop! Bu bir bot. Sahibim şu an burada değil.```\n' + 
            (AFK.reason !== false ? '\n*Sebep:* ```' + AFK.reason + '```' : '') + 
            (AFK.lastseen !== 0 ? '\n*Son Görülme:* ```' + secondsToHms(Math.round((new Date()).getTime() / 1000) - AFK.lastseen) + ' önce```' : ''));    
        }
    }
}));

Asena.addCommand({on: 'text', fromMe: true, deleteCommand: false}, (async (message, match) => {
    if (AFK.isAfk && !message.message.includes('Artık AFK\'yım!') && !message.message.includes('Bip bop! Bu bir bot. Sahibim şu an burada değil.') &&  !message.message.includes('*-- HATA RAPORU [WHATSASENA] --*')) {
        AFK.lastseen = 0;
        AFK.reason = false;
        AFK.isAfk = false;

        await message.sendMessage('```Artık AFK değilim!```');
    }
}));

Asena.addCommand({pattern: 'afk ?(.*)', fromMe: true, deleteCommand: false, desc: 'Sizi AFK yapar.'}, (async (message, match) => {     
    if (!AFK.isAfk) {
        AFK.lastseen = Math.round((new Date()).getTime() / 1000);
        if (match[1] !== '') { AFK.reason = match[1]; }
        AFK.isAfk = true;

        await message.sendMessage('*Artık AFK\'yım!*' + (AFK.reason !== false ? ('\n*Sebep:* ```' + AFK.reason + '```') : ''));
    }
}));

