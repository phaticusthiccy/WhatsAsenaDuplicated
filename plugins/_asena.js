/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const Asena = require('../events');
const Config = require('../config');
const {MessageType} = require('@adiwajshing/baileys');
const Language = require('../language');

const Lang = Language.getString('_asena');

Asena.addCommand({pattern: 'asena', fromMe: true}, (async (message, match) => {
    var CMD_HELP = '';

    Asena.commands.map(
        async (command) =>  {
            if (command.dontAddCommandList || command.pattern === undefined) return;
            try {
                var match = command.pattern.toString().match(/(\W*)([A-Za-zğüşiöç]*)/);
            } catch {
                var match = [command.pattern];
            }

            var HANDLER = '';

            if (/\[(\W*)\]/.test(Config.HANDLERS)) {
                HANDLER = Config.HANDLERS.match(/\[(\W*)\]/)[1][0];
            } else {
                HANDLER = '.';
            }
            CMD_HELP += '*🛠 ' + Lang.COMMAND + ':* ```' + (match.length >= 3 ? (HANDLER + match[2]) : command.pattern) + (command.desc === '' ? '```\n\n' : '```\n');
            if (command.desc !== '') CMD_HELP += '*💬 ' + Lang.DESC + ':* ```' + command.desc + (command.usage === '' ? '```\n\n' : '```\n');
            if (command.usage !== '') CMD_HELP += '*⌨️ ' + Lang.EXAMPLE + ':* ```' + command.usage + '```\n\n';
        }
    );
    
    await message.client.sendMessage(
        message.jid, CMD_HELP, MessageType.text
    );
}));