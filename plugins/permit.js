const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const Axios = require('axios');
const Config = require('../config');
const pmpermit = require('/root/WhatsAsenaDuplicated/plugins/pmpermit');
const ds = "PM Permit iznini açar."
const dds = "PM Permit iznini kapatır."
Asena.addCommand({pattern: 'approve$', desc: ds, onlyPm: true}, (async (message, match) => { 
    pmpermit.permitacton(message.jid.split("@")[0])
    await message.client.sendMessage(message.jid,'PM İzni Verildi!', MessageType.text);
}));
Asena.addCommand({pattern: 'disapprove$', desc: dds, onlyPm: true}, (async (message, match) => { 
    pmpermit.nopermitacton(message.jid.split("@")[0])
    await message.client.sendMessage(message.jid,'PM İzni Kaldırıldı!', MessageType.text);
}));

Asena.addCommand({on: 'text', fromMe: false, onlyPm: true, deleteCommand: false, dontAddCommandList: true }, (async (message, match) => {
    if (Config.PMPERMİT) { // Pm check for pmpermit module
        var pmpermitcheck = await pmpermit.handler(message.jid.split("@")[0])
        if (pmpermitcheck == "permitted") {
            
        } else if (pmpermitcheck.mute == true && message.jid.isMuted == false) { // mute 
            await message.client.sendMessage(message.jid, pmpermitcheck.msg, MessageType.text)
            var unmuteDate = new Date();
            unmuteDate.setSeconds(Number(unmuteDate.getSeconds()) + Number(config.pmpermit_mutetime));
            await message.client.modifyChat (message.jid, ChatModification.mute, unmuteDate * 60)
        } else if (message.jid.isMuted == true) {
            
        } else if (pmpermitcheck == "error") {
            
        } else {
            await message.client.sendMessage(message.jid, pmpermitcheck.msg, MessageType.text)
        }
    }
}));
