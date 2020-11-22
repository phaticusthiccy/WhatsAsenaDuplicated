const Asena = require('../events');
/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const {MessageType, GroupSettingChange} = require('@adiwajshing/baileys');

async function checkImAdmin(message, user = message.client.user.jid) {
    var grup = await message.client.groupMetadata(message.jid);
    var sonuc = grup['participants'].map((member) => {
        if (member.id.split('@')[0] === user.split('@')[0] && member.isAdmin) return true; else; return false;
    });
    return sonuc.includes(true);
}

Asena.addCommand({pattern: 'ban ?(.*)', fromMe: true, onlyGroup: true, desc: 'Gruptan kişi banlar. Yanıt verin ya da komutun yanına kişiyi etiketleyin.'}, (async (message, match) => {  
    var im = await checkImAdmin(message);
    if (!im) return await message.sendMessage('*Bu grupta admin değilim!*');

    if (message.reply_message !== false) {
        await message.sendMessage('@' + message.reply_message.data.participant.split('@')[0] + '```, gruptan çıkarıldı!```', MessageType.text, {contextInfo: {mentionedJid: [message.reply_message.data.participant]}});
        await message.client.groupRemove(message.jid, [message.reply_message.data.participant]);
    } else if (message.reply_message === false && message.mention !== false) {
        var etiketler = '';
        message.mention.map(async (user) => {
            etiketler += '@' + user.split('@')[0] + ',';
        });

        await message.sendMessage(etiketler + '``` gruptan çıkarıldı!```', MessageType.text, {contextInfo: {mentionedJid: message.mention}});
        await message.client.groupRemove(message.jid, message.mention);
    } else {
        return await message.sendMessage('*Bana bir kullanıcı ver!*');
    }
}));

Asena.addCommand({pattern: 'add ?(.*)', fromMe: true, onlyGroup: true, desc: 'Gruba kişi ekler.', usage: '.add 905xxxxxxxxx'}, (async (message, match) => {  
    var im = await checkImAdmin(message);
    if (!im) return await message.sendMessage('*Bu grupta admin değilim!*');
    
    if (match[1] !== '') {
        match[1].split(' ').map(async (user) => {
            await message.client.groupAdd(message.jid, [user + "@s.whatsapp.net"]);
            await message.sendMessage('```' + user + ' gruba eklendi!```');
        });
    } else {
        return await message.sendMessage('*Bana bir kullanıcı ver!*');
    }
}));

Asena.addCommand({pattern: 'promote ?(.*)', fromMe: true, onlyGroup: true, desc: 'Herhangi bir kişiyi admin yapar.'}, (async (message, match) => {    
    var im = await checkImAdmin(message);
    if (!im) return await message.sendMessage('*Bu grupta admin değilim!*');

    if (message.reply_message !== false) {
        var checkAlready = await checkImAdmin(message, message.reply_message.data.participant);
        if (checkAlready) {
            return await message.sendMessage('```Zaten admin olan birisini nasıl admin yapayım?```', MessageType.text);
        }

        await message.sendMessage('@' + message.reply_message.data.participant.split('@')[0] + '```, admin yapıldı!```', MessageType.text, {contextInfo: {mentionedJid: [message.reply_message.data.participant]}});
        await message.client.groupMakeAdmin(message.jid, [message.reply_message.data.participant]);
    } else if (message.reply_message === false && message.mention !== false) {
        var etiketler = '';
        message.mention.map(async (user) => {
            var checkAlready = await checkImAdmin(message, user);
            if (checkAlready) {
                return await message.sendMessage('```Zaten admin olan birisini nasıl admin yapayım?```', MessageType.text);
            }

            etiketler += '@' + user.split('@')[0] + ',';
        });

        await message.sendMessage(etiketler + '``` admin yapıldı!```', MessageType.text, {contextInfo: {mentionedJid: message.mention}});
        await message.client.groupMakeAdmin(message.jid, message.mention);
    } else {
        return await message.sendMessage('*Bana bir kullanıcı ver!*');
    }
}));

Asena.addCommand({pattern: 'demote ?(.*)', fromMe: true, onlyGroup: true, desc: 'Herhangi bir adminden yetkisini düşürür.'}, (async (message, match) => {    
    var im = await checkImAdmin(message);
    if (!im) return await message.sendMessage('*Bu grupta admin değilim!*');

    if (message.reply_message !== false) {
        var checkAlready = await checkImAdmin(message, message.reply_message.data.participant.split('@')[0]);
        if (!checkAlready) {
            return await message.sendMessage('```Zaten admin olmayan birisini nasıl yetkisini alayım?```', MessageType.text);
        }

        await message.sendMessage('@' + message.reply_message.data.participant.split('@')[0] + '```, yetkisi düşürüldü!```', MessageType.text, {contextInfo: {mentionedJid: [message.reply_message.data.participant]}});
        await message.client.groupDemoteAdmin(message.jid, [message.reply_message.data.participant]);
    } else if (message.reply_message === false && message.mention !== false) {
        var etiketler = '';
        message.mention.map(async (user) => {
            var checkAlready = await checkImAdmin(message, user);
            if (!checkAlready) {
                return await message.sendMessage('```Zaten admin olmayan birisini nasıl yetkisini alayım?```', MessageType.text);
            }
            
            etiketler += '@' + user.split('@')[0] + ',';
        });

        await message.sendMessage(etiketler + '``` yetkisi düşürüldü!```', MessageType.text, {contextInfo: {mentionedJid: message.mention}});
        await message.client.groupDemoteAdmin(message.jid, message.mention);
    } else {
        return await message.sendMessage('*Bana bir kullanıcı ver!*');
    }
}));

Asena.addCommand({pattern: 'mute ?(.*)', fromMe: true, onlyGroup: true, desc: 'Grubu sohbetini kapatır. Yalnızca adminler mesaj gönderebilir.'}, (async (message, match) => {    
    var im = await checkImAdmin(message);
    if (!im) return await message.sendMessage('*Bu grupta admin değilim!*');
    await message.client.groupSettingChange(message.jid, GroupSettingChange.messageSend, true);
    await message.sendMessage('```Grup sohbeti kapatıldı!```');
}));

Asena.addCommand({pattern: 'unmute ?(.*)', fromMe: true, onlyGroup: true, desc: 'Grubu sohbetini açar. Herkes mesaj gönderebilir.'}, (async (message, match) => {    
    var im = await checkImAdmin(message);
    if (!im) return await message.sendMessage('*Bu grupta admin değilim!*');
    await message.client.groupSettingChange(message.jid, GroupSettingChange.messageSend, false);
    await message.sendMessage('```Grup sohbeti açıldı!```');
}));

Asena.addCommand({pattern: 'invite ?(.*)', fromMe: true, onlyGroup: true, desc: 'Grubun davet linkini getirir.'}, (async (message, match) => {    
    var im = await checkImAdmin(message);
    if (!im) return await message.sendMessage('*Bu grupta admin değilim!*');
    var invite = await message.client.groupInviteCode(message.jid);
    await message.sendMessage('```Davet linki:``` https://chat.whatsapp.com/' + invite);
}));

module.exports = {
    checkImAdmin: checkImAdmin
};