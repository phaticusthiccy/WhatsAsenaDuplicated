/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const exec = require('child_process').exec;
const os = require("os");

Asena.addCommand({pattern: 'term ?(.*)', fromMe: true, desc: 'Sunucuda shellinde komut çalıştırmanıza imkan tanır.', usage: '.term ls'}, (async (message, match) => {    
    var user = os.userInfo().username;
    if (match[1] === '') return await message.sendMessage('*Bana bir kod ver!*');

    exec(match[1], async (err, stdout, stderr) => {
        if (err) {
            return await message.sendMessage('```' + user + ':~# ' + match[1] + '\n' + err + '```');
        }
        
        return await message.sendMessage('```' + user + ':~# ' + match[1] + '\n' + stdout + '```');
      });
}));
