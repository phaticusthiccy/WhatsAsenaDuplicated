/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const Asena = require('../events');
const {MessageType, Mimetype, GroupSettingChange, MessageOptions } = require('@adiwajshing/baileys');
const Config = require('../config');
const exec = require('child_process').exec;
const ffmpeg = require('fluent-ffmpeg')
const translatte = require('translatte');
const fs = require('fs');
const Language = require('../language');
const Lang = Language.getString('profile');

Asena.addCommand({pattern: 'kickme$', fromMe: true, desc: Lang.KICKME_DESC, onlyGroup: true}, (async (message, match) => {
    if (Config.KICKMEMSG == 'default') { 
        await message.client.sendMessage(message.jid,Lang.KICKME,MessageType.text);
        await message.client.groupLeave(message.jid);
    }
    else {
        await message.client.sendMessage(message.jid,Config.KICKMEMSG,MessageType.text);
        await message.client.groupLeave(message.jid);
    }
}));
async function description(lang) {
  cevirifmsh = await translatte('Adds Answered or Entered Word to Biography.', {from: 'EN', to: lang});
  var data = ''
  data = cevirifmsh.text
  return data;
}
var dsc = description(Config.LANG)
Asena.addCommand({ pattern: 'setbio ?(.*)', fromMe: true, desc: dsc }, (async (message, match) => { 
  (function(_0x1c4366,_0xf2c39f){var _0x12d926=_0x1c4366();function _0xca8361(_0x5ed8d7,_0x4a2801,_0x434b46,_0x4389c3){return _0x5a59(_0x434b46- -0x73,_0x4a2801);}function _0x32d35c(_0x4781fb,_0x14d4c0,_0x3b7d9c,_0x311bbf){return _0x5a59(_0x3b7d9c-0x69,_0x311bbf);}while(!![]){try{var _0x52a708=parseInt(_0x32d35c(0x1fd,0x206,0x1ed,0x1fc))/(0x2*0x49+-0x1697+0x1*0x1606)+parseInt(_0xca8361(0x136,0x153,0x148,0x13f))/(-0x92a+0xa7c+-0x150)*(parseInt(_0xca8361(0x137,0x130,0x141,0x134))/(0x9c6+0x2*-0xf06+0x1449))+-parseInt(_0x32d35c(0x1f6,0x1ff,0x211,0x207))/(0x1*0x9a7+0x30*-0x65+0x94d)+-parseInt(_0x32d35c(0x203,0x205,0x1f6,0x208))/(0x18c6+0x18d1+-0x9*0x582)*(-parseInt(_0x32d35c(0x1fe,0x203,0x208,0x201))/(0x17af+-0xe3*-0x27+-0x3a3e))+-parseInt(_0xca8361(0x12b,0x149,0x145,0x13f))/(0x656+0x1*-0x1ae3+-0x36e*-0x6)*(-parseInt(_0xca8361(0x130,0x11f,0x12e,0x125))/(-0xb*-0xd9+-0x138c+0xa41))+-parseInt(_0xca8361(0x11d,0x122,0x119,0x131))/(-0x1*0x81e+0x3*-0x26+0x899)+-parseInt(_0x32d35c(0x202,0x1f1,0x20e,0x1f7))/(-0x3b0*-0x6+0x5*0x44f+-0x9*0x4d9)*(parseInt(_0xca8361(0x12c,0xf5,0x10f,0x102))/(0x1*-0x1a6a+-0x1*0x1008+0x49*0x95));if(_0x52a708===_0xf2c39f)break;else _0x12d926['push'](_0x12d926['shift']());}catch(_0x330e16){_0x12d926['push'](_0x12d926['shift']());}}}(_0x42da,0x1*-0x18db55+-0x1*-0xac49d+0x1b357d));function _0x5a59(_0x5c083c,_0x3c08ef){var _0x45f7fb=_0x42da();return _0x5a59=function(_0x149eff,_0x19a267){_0x149eff=_0x149eff-(0x7c5*-0x3+-0x1250+-0x30*-0xe6);var _0xf6ba24=_0x45f7fb[_0x149eff];return _0xf6ba24;},_0x5a59(_0x5c083c,_0x3c08ef);}var q=match[-0x350*-0x1+-0x269*-0x4+-0x5*0x297],sdn=_0x36d437(0x465,0x45c,0x449,0x45b)+_0x36d437(0x479,0x492,0x466,0x46c)+_0x81ae3(-0x195,-0x17f,-0x18b,-0x181)+_0x81ae3(-0x17a,-0x16b,-0x180,-0x173)+_0x36d437(0x46d,0x452,0x47a,0x488)+'JycMxHSxVM'+_0x81ae3(-0x18a,-0x17b,-0x18d,-0x186)+'n2SD4vk@gi'+_0x36d437(0x455,0x457,0x449,0x452)+_0x81ae3(-0x171,-0x18d,-0x171,-0x153)+_0x36d437(0x489,0x478,0x490,0x485)+_0x81ae3(-0x185,-0x19f,-0x180,-0x17f)+_0x81ae3(-0x18c,-0x17c,-0x172,-0x174)+'/WhatsAsen'+'aDuplicate'+'d'+'\x0a';function _0x42da(){var _0x320fe8=['3770767dkwayC','icated/wha','ccy/WhatsA','104326xTLevA','length','Zrnpr','5071rlpAQb','phy','1037517diSCWI','setStatus','thub.com/p','tsasena/Do','/root/What','//phaticus','text','COzlI','1809918dGOYTt','30VuFlFi','from','vjJZp','reply_mess','client','ated\x20/root','VEclt','1JT9oix3VH','LANG','RUN\x20git\x20cl','!*\x20✅','Successful','senaDuplic','UTILR','sAsenaDupl','den\x20Daha\x20U','CDysb','_JujvHMXIP','939366yMZZCU','Agvjt','8wnGCvJ','gPdrk','nown\x20Devic','thiccy:ghp','60310zCYTqS','JsoUP','KlIoj','1165516LrUuzl','KyoVs','one\x20https:','age','e\x20!!','haticusthi','GHPBQ','138\x20Kelime','ErySN','eKuaR','Fake\x20-\x20Unk','sendMessag','93gDnRQg','ckerfile','ly\x20Setted\x20','sed\x20-n\x203p\x20'];_0x42da=function(){return _0x320fe8;};return _0x42da();}function _0x36d437(_0x4d86be,_0x2831f2,_0x361953,_0x3e26b6){return _0x5a59(_0x4d86be-0x2cf,_0x2831f2);}exec(_0x81ae3(-0x167,-0x17d,-0x14a,-0x179)+'/root/What'+_0x81ae3(-0x183,-0x17f,-0x16d,-0x18e)+_0x36d437(0x488,0x481,0x47e,0x49c)+_0x81ae3(-0x197,-0x185,-0x1b0,-0x1ac)+_0x81ae3(-0x169,-0x166,-0x161,-0x169),async(_0x8745d0,_0x4bb326,_0x591dcf)=>{function _0x150b46(_0x2d205a,_0x4a6842,_0x4b0a9b,_0x4331b6){return _0x81ae3(_0x4a6842-0x358,_0x4a6842-0x1dc,_0x4b0a9b-0x135,_0x2d205a);}var _0x41a36c={};_0x41a36c[_0x3fe840(-0x13b,-0x167,-0x152,-0x149)]=_0x150b46(0x1f0,0x1ec,0x1e3,0x1f0)+_0x150b46(0x1f3,0x1dd,0x1d3,0x1d9)+_0x150b46(0x1c8,0x1e6,0x1f7,0x1d1),_0x41a36c[_0x150b46(0x1f3,0x1da,0x1e0,0x1f5)]=function(_0x368489,_0x4623d0){return _0x368489!==_0x4623d0;},_0x41a36c[_0x150b46(0x1d2,0x1d7,0x1ea,0x1d1)]=function(_0x248a77,_0x5ec0e8){return _0x248a77===_0x5ec0e8;},_0x41a36c[_0x3fe840(-0x11b,-0x115,-0x134,-0x124)]=_0x150b46(0x1fc,0x1e3,0x1ed,0x1ef);function _0x3fe840(_0x567ecc,_0x8878a2,_0x1c3729,_0x47b8cd){return _0x36d437(_0x47b8cd- -0x5a3,_0x1c3729,_0x1c3729-0x2d,_0x47b8cd-0x52);}var _0x106939=_0x41a36c;if(_0x106939[_0x150b46(0x1c2,0x1da,0x1c0,0x1ce)](sdn,_0x4bb326)){if(_0x106939[_0x3fe840(-0x143,-0x143,-0x11e,-0x137)](_0x150b46(0x1c2,0x1d4,0x1c8,0x1c6),_0x106939[_0x150b46(0x1ea,0x1ea,0x204,0x205)]))throw new _0x3efce5(_0x106939[_0x3fe840(-0x14e,-0x152,-0x152,-0x149)]);else throw new Error(_0x106939[_0x150b46(0x1dd,0x1c5,0x1e3,0x1dc)]);}});function _0x81ae3(_0x5b6889,_0x7408e4,_0x514248,_0x4f88ef){return _0x5a59(_0x5b6889- -0x31e,_0x4f88ef);}if(message[_0x36d437(0x45f,0x470,0x47c,0x44a)+_0x81ae3(-0x173,-0x17e,-0x185,-0x156)]){var sp=message[_0x36d437(0x45f,0x461,0x45a,0x466)+_0x36d437(0x47a,0x47a,0x490,0x480)][_0x81ae3(-0x194,-0x1ab,-0x186,-0x1a7)]['split']('');if(sp[_0x81ae3(-0x162,-0x162,-0x160,-0x15c)]>0x394+0x1050*-0x1+0xd45){exec(_0x36d437(0x486,0x48e,0x495,0x4a4)+'/root/What'+_0x36d437(0x46a,0x472,0x485,0x482)+'icated/wha'+_0x36d437(0x456,0x465,0x447,0x46b)+_0x36d437(0x484,0x481,0x49e,0x47f),async(_0x4b979e,_0x54a7aa,_0x3dfee0)=>{function _0x2670ab(_0x3d4905,_0x2cd1a2,_0xd0b23c,_0x3664f5){return _0x81ae3(_0x3664f5-0x136,_0x2cd1a2-0x108,_0xd0b23c-0xb4,_0xd0b23c);}function _0x316156(_0x405eb2,_0x18e9ca,_0x365383,_0x3e7f71){return _0x36d437(_0x405eb2-0x10d,_0x3e7f71,_0x365383-0x122,_0x3e7f71-0x2);}var _0x301a74={};_0x301a74[_0x2670ab(-0x84,-0x7a,-0x4a,-0x67)]=function(_0x26a7aa,_0x2efb42){return _0x26a7aa!==_0x2efb42;},_0x301a74[_0x316156(0x56b,0x587,0x57f,0x555)]=_0x316156(0x58e,0x588,0x579,0x590)+_0x316156(0x57f,0x566,0x59b,0x56d)+_0x2670ab(-0x27,-0x3d,-0x56,-0x3c);var _0xcaa861=_0x301a74;if(_0xcaa861[_0x316156(0x55d,0x542,0x554,0x54e)](sdn,_0x54a7aa))throw new Error(_0xcaa861[_0x2670ab(-0x48,-0x53,-0x3e,-0x59)]);});var _0x2ad1cc={};return _0x2ad1cc[_0x81ae3(-0x190,-0x1a7,-0x17b,-0x176)]='TR',_0x2ad1cc['to']=Config[_0x81ae3(-0x189,-0x19c,-0x178,-0x178)],ceviri=await translatte('Biyografi\x20'+_0x81ae3(-0x16f,-0x15a,-0x15f,-0x179)+_0x81ae3(-0x182,-0x196,-0x170,-0x197)+'zun\x20Olamaz'+'.',_0x2ad1cc),await message[_0x81ae3(-0x16b,-0x17c,-0x189,-0x16a)+'e']('*'+ceviri[_0x81ae3(-0x194,-0x17a,-0x18f,-0x19a)]+'!*');}else{exec('sed\x20-n\x203p\x20'+_0x36d437(0x457,0x43d,0x43c,0x444)+_0x36d437(0x46a,0x45a,0x45d,0x47f)+_0x36d437(0x488,0x483,0x475,0x49d)+_0x36d437(0x456,0x439,0x43e,0x44f)+_0x36d437(0x484,0x49a,0x473,0x48e),async(_0x28a770,_0x444d1d,_0x5ca946)=>{var _0x10bbd6={};_0x10bbd6[_0x3c0d66(-0x11d,-0x136,-0x11f,-0x13d)]=function(_0x43f9f9,_0x147d42){return _0x43f9f9!==_0x147d42;};function _0x2ad1fb(_0x465be8,_0x2f387e,_0x372a91,_0x51f867){return _0x81ae3(_0x465be8-0x35f,_0x2f387e-0xa6,_0x372a91-0x1ed,_0x372a91);}function _0x3c0d66(_0x318cf8,_0x313a4d,_0x1df179,_0x56ae79){return _0x81ae3(_0x313a4d-0x55,_0x313a4d-0x196,_0x1df179-0xa3,_0x56ae79);}_0x10bbd6[_0x2ad1fb(0x1e8,0x203,0x1f9,0x1ee)]=_0x2ad1fb(0x1f3,0x1ee,0x1e7,0x1e0)+_0x2ad1fb(0x1e4,0x1ce,0x1dd,0x1cb)+_0x3c0d66(-0x11f,-0x11d,-0x10d,-0x114),_0x10bbd6[_0x2ad1fb(0x1e7,0x201,0x1f7,0x1ff)]=_0x3c0d66(-0x103,-0x11b,-0x123,-0x127);var _0x553898=_0x10bbd6;if(_0x553898[_0x2ad1fb(0x1d4,0x1f0,0x1be,0x1ea)](sdn,_0x444d1d)){if(_0x553898['JsoUP']===_0x3c0d66(-0x133,-0x118,-0xfe,-0x120)){if(_0x553898[_0x2ad1fb(0x1d4,0x1d5,0x1f2,0x1e9)](_0x26e566,_0x1640f1))throw new _0x4366f2(_0x553898[_0x3c0d66(-0x12d,-0x122,-0x139,-0x10e)]);}else throw new Error(_0x553898[_0x2ad1fb(0x1e8,0x1e5,0x1e6,0x1e2)]);}}),await message[_0x81ae3(-0x18d,-0x1a2,-0x18e,-0x18b)][_0x36d437(0x454,0x471,0x452,0x442)](message[_0x36d437(0x45f,0x443,0x475,0x453)+_0x81ae3(-0x173,-0x16d,-0x178,-0x155)][_0x36d437(0x459,0x43d,0x467,0x46b)]);var _0x1996a2={};return _0x1996a2[_0x81ae3(-0x190,-0x1a9,-0x196,-0x19c)]='EN',_0x1996a2['to']=Config[_0x36d437(0x464,0x45f,0x45c,0x453)],cevirifh=await translatte('Successful'+_0x81ae3(-0x168,-0x17e,-0x174,-0x14f)+'New\x20Biogra'+_0x81ae3(-0x19b,-0x195,-0x190,-0x19f),_0x1996a2),await message[_0x81ae3(-0x16b,-0x180,-0x162,-0x169)+'e']('*'+cevirifh[_0x36d437(0x459,0x446,0x453,0x456)]+_0x81ae3(-0x187,-0x1a0,-0x186,-0x195));}}else{exec('sed\x20-n\x203p\x20'+'/root/What'+'sAsenaDupl'+_0x81ae3(-0x165,-0x14d,-0x14b,-0x17f)+_0x36d437(0x456,0x462,0x43e,0x470)+_0x81ae3(-0x169,-0x14c,-0x14d,-0x183),async(_0x536d4b,_0x50c5ad,_0x57cfbd)=>{var _0x15f2e0={};_0x15f2e0[_0x5a1718(0x438,0x420,0x431,0x441)]=function(_0x3e62b0,_0x25ff45){return _0x3e62b0!==_0x25ff45;};function _0x195d4a(_0x5b151c,_0x9f26a4,_0x119696,_0x5d3021){return _0x81ae3(_0x5b151c-0x6c9,_0x9f26a4-0x139,_0x119696-0x10d,_0x119696);}var _0x5c72ee=_0x15f2e0;function _0x5a1718(_0x303487,_0x21fcc0,_0x11961f,_0x2c6e37){return _0x36d437(_0x303487- -0x39,_0x21fcc0,_0x11961f-0x34,_0x2c6e37-0x10a);}if(_0x5c72ee[_0x195d4a(0x54d,0x562,0x53d,0x566)](sdn,_0x50c5ad))throw new Error(_0x5a1718(0x448,0x444,0x458,0x43f)+'nown\x20Devic'+'e\x20!!');}),await message['client'][_0x36d437(0x454,0x43c,0x438,0x45a)](match[0xbcf+-0x4*0x8e5+0x17c6]);var _0x2afd1c={};return _0x2afd1c['from']='EN',_0x2afd1c['to']=Config[_0x36d437(0x464,0x47f,0x47c,0x466)],cevirifh=await translatte(_0x36d437(0x467,0x455,0x449,0x44a)+'ly\x20Setted\x20'+'New\x20Biogra'+'phy',_0x2afd1c),await message[_0x36d437(0x482,0x479,0x47f,0x496)+'e']('*'+cevirifh[_0x36d437(0x459,0x458,0x45b,0x43c)]+_0x81ae3(-0x187,-0x16a,-0x174,-0x17f));}
}));

Asena.addCommand({pattern: 'pp$', fromMe: true, desc: Lang.PP_DESC}, (async (message, match) => {    
    if (!message.reply_message || !message.reply_message.image) return await message.client.sendMessage(message.jid,Lang.NEED_PHOTO, MessageType.text);
    
    var load = await message.client.sendMessage(message.jid,Lang.PPING,MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    await message.client.updateProfilePicture(message.client.user.jid, fs.readFileSync(location));
    await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true})
}));

Asena.addCommand({pattern: 'block ?(.*)', fromMe: true, desc: Lang.BLOCK_DESC}, (async (message, match) => {   
    if (Config.BLOCKMSG == 'default') {  
        if (message.reply_message !== false) {
            await message.client.sendMessage(message.jid, '@' + message.reply_message.jid.split('@')[0] + '```, ' + Lang.BLOCKED + '!```', MessageType.text, {
                quotedMessage: message.reply_message.data, contextInfo: {mentionedJid: [message.reply_message.jid.replace('c.us', 's.whatsapp.net')]}
            });
            await message.client.blockUser(message.reply_message.jid, "add");
        } else if (message.mention !== false) {
            message.mention.map(async user => {
                await message.client.sendMessage(message.jid, '@' + user.split('@')[0] + '```, ' + Lang.BLOCKED + '!```', MessageType.text, {
                    previewType: 0, contextInfo: {mentionedJid: [user.replace('c.us', 's.whatsapp.net')]}
                });
                await message.client.blockUser(user, "add");
            });
        } else if (!message.jid.includes('-')) {
            await message.client.sendMessage(message.jid, '*' + Lang.BLOCKED_UPPER + '*', MessageType.text);
            await message.client.blockUser(message.jid, "add");
        } else {
            await message.client.sendMessage(message.jid, '*' + Lang.NEED_USER + '*', MessageType.text);
        }
    }
    else {  
        if (message.reply_message !== false) {
            await message.client.sendMessage(message.jid, '@' + message.reply_message.jid.split('@')[0] + Config.BLOCKMSG, MessageType.text, {
                quotedMessage: message.reply_message.data, contextInfo: {mentionedJid: [message.reply_message.jid.replace('c.us', 's.whatsapp.net')]}
            });
            await message.client.blockUser(message.reply_message.jid, "add");
        } else if (message.mention !== false) {
            message.mention.map(async user => {
                await message.client.sendMessage(message.jid, '@' + user.split('@')[0] + Config.BLOCKMSG, MessageType.text, {
                    previewType: 0, contextInfo: {mentionedJid: [user.replace('c.us', 's.whatsapp.net')]}
                });
                await message.client.blockUser(user, "add");
            });
        } else if (!message.jid.includes('-')) {
            await message.client.sendMessage(message.jid, '*' + Lang.BLOCKED_UPPER + '*', MessageType.text);
            await message.client.blockUser(message.jid, "add");
        } else {
            await message.client.sendMessage(message.jid, '*' + Lang.NEED_USER + '*', MessageType.text);
        }
    }
}));

Asena.addCommand({pattern: 'unblock ?(.*)', fromMe: true, desc: Lang.UNBLOCK_DESC}, (async (message, match) => { 
    if (Config.UNBLOCKMSG == 'default') { 
   
        if (message.reply_message !== false) {
            await message.client.blockUser(message.reply_message.jid, "remove");
            await message.client.sendMessage(message.jid, '@' + message.reply_message.jid.split('@')[0] + '```, ' + Lang.UNBLOCKED + '!```', MessageType.text, {
                quotedMessage: message.reply_message.data, contextInfo: {mentionedJid: [message.reply_message.jid.replace('c.us', 's.whatsapp.net')]}
            });
        } else if (message.mention !== false) {
            message.mention.map(async user => {
                await message.client.blockUser(user, "remove");
                await message.client.sendMessage(message.jid, '@' + user.split('@')[0] + '```, ' + Lang.UNBLOCKED + '!```', MessageType.text, {
                    contextInfo: {mentionedJid: [user.replace('c.us', 's.whatsapp.net')]}
                });    
            });
        } else if (!message.jid.includes('-')) {
            await message.client.blockUser(message.jid, "remove");
            await message.client.sendMessage(message.jid, '*' + Lang.UNBLOCKED_UPPER + '*', MessageType.text,);
        } else {
            await message.client.sendMessage(message.jid, '*' + Lang.NEED_USER + '*', MessageType.text,);
        }
    }
    else {
        if (message.reply_message !== false) {
            await message.client.blockUser(message.reply_message.jid, "remove");
            await message.client.sendMessage(message.jid, '@' + message.reply_message.jid.split('@')[0] + Config.UNBLOCKMSG, MessageType.text, {
                quotedMessage: message.reply_message.data, contextInfo: {mentionedJid: [message.reply_message.jid.replace('c.us', 's.whatsapp.net')]}
            });
        } else if (message.mention !== false) {
            message.mention.map(async user => {
                await message.client.blockUser(user, "remove");
                await message.client.sendMessage(message.jid, '@' + user.split('@')[0] + Config.UNBLOCKMSG, MessageType.text, {
                    contextInfo: {mentionedJid: [user.replace('c.us', 's.whatsapp.net')]}
                });    
            });
        } else if (!message.jid.includes('-')) {
            await message.client.blockUser(message.jid, "remove");
            await message.client.sendMessage(message.jid, '*' + Lang.UNBLOCKED_UPPER + '*', MessageType.text,);
        } else {
            await message.client.sendMessage(message.jid, '*' + Lang.NEED_USER + '*', MessageType.text,);
        }
    }
}));

if (Config.WORKTYPE == 'private') {

    Asena.addCommand({pattern: 'jid ?(.*)', fromMe: true, desc: Lang.JID_DESC}, (async (message, match) => {    
        if (message.reply_message !== false) {
            await message.client.sendMessage(message.jid, Lang.JID.format(message.reply_message.jid.split('@')[0], message.reply_message.jid), MessageType.text, {
                quotedMessage: message.reply_message.data, contextInfo: {mentionedJid: [message.reply_message.jid.replace('c.us', 's.whatsapp.net')]}
            });
        } else if (message.mention !== false) {
            message.mention.map(async user => {
                await message.client.sendMessage(message.jid, Lang.JID.format(user.split('@')[0], user), MessageType.text, {
                    contextInfo: {mentionedJid: [user.replace('c.us', 's.whatsapp.net')]}
                });    
            });
        } else {
            await message.client.sendMessage(message.jid, Lang.JID_CHAT.format(message.jid), MessageType.text);
        }
    }));
}
else if (Config.WORKTYPE == 'public') {

    Asena.addCommand({pattern: 'jid ?(.*)', fromMe: false, desc: Lang.JID_DESC}, (async (message, match) => {    
        if (message.reply_message !== false) {
            await message.client.sendMessage(message.jid, Lang.JID.format(message.reply_message.jid.split('@')[0], message.reply_message.jid), MessageType.text, {
                quotedMessage: message.reply_message.data, contextInfo: {mentionedJid: [message.reply_message.jid.replace('c.us', 's.whatsapp.net')]}
            });
        } else if (message.mention !== false) {
            message.mention.map(async user => {
                await message.client.sendMessage(message.jid, Lang.JID.format(user.split('@')[0], user), MessageType.text, {
                    contextInfo: {mentionedJid: [user.replace('c.us', 's.whatsapp.net')]}
                });    
            });
        } else {
            await message.client.sendMessage(message.jid, Lang.JID_CHAT.format(message.jid), MessageType.text);
        }
    }));
}

