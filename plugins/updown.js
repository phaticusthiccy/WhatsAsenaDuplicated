/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const Asena = require('../events');
const { MessageType } = require('@adiwajshing/baileys');
const { similarity } = require('../similarity')

Asena.addCommand({ pattern: '.', fromMe: true, dontAddCommandList: true }, (async (message, match) => {
    if(message.fromMe) return
    let command = ['song', 'sticker', 'video', 'alive', 'asena'];//add more
    let sml = '';
    let string = match['input'].split(' ')[0];
    string = string.slice(1, match['input'].split("''")[0].length);
    let msg = `Command ${string} not found, Try these\n`
    for (let i = 0; i < command.length; i++) {
        let smlarity = similarity(command[i], string)
        if (smlarity == 1) {
            index1 = command[i].split('')
            index2 = string.split('')
            for (let j = 0; j < index1.length; j++) {
                while (index1[j] != index2[j]) {
                    return await message.client.sendMessage(message.jid, msg + '\n*' + command[i] + '*', MessageType.text)
                }
            }
            return;
        }
        if (smlarity > 0.6 && smlarity !==0) {
            console.log(i,command[i])
            sml += '\n*' + command[i] + '*'
        }
    }
    if(sml.length < 1) return;
    await message.client.sendMessage(message.jid, msg + sml, MessageType.text)

}));
