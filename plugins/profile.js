/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');

Asena.addCommand({pattern: 'kickme', fromMe: true, desc: 'Yazdığınız gruptan sizi çıkarır.', onlyGroup: true}, (async (message, match) => {    
    await message.sendMessage('```Güle Güle! Ben gidiyorum 🤠```');
    await message.client.groupLeave(message.jid);
}));
