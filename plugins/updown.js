const Asena = require('../events');
const { MessageType } = require('@adiwajshing/baileys');
const { similarity } = require('../similarity')

Asena.addCommand({ pattern: '.', fromMe: true, dontAddCommandList: true }, (async (message, match) => {
    if(message.fromMe) return
    let command = [ 
    'xmedia',
    'install',
    'plugin',
    'remove',
    'ban',
    'add',
    'promote',
    'demote',
    'mute',
    'unmute',
    'invite',
    'afk',
    'carbon',
    'mp4audio',
    'imagesticker',
    'deepai',
    'term',
    'ffmpeg',
    'filter',
    'stop',
    'welcome',
    'goodbye',
    'help',
    'restart',
    'shutdown',
    'dyno',
    'setvar',
    'delvar',
    'getvar',
    'locate',
    'meme',
    'neko',
    'notes',
    'save',
    'deleteNotes',
    'ocr',
    'kickme',
    'pp',
    'block',
    'unblock',
    'jid',
    'removebg',
    'scam',
    'trt',
    'currency',
    'tts',
    'song',
    'video',
    'yt',
    'wiki',
    'img',
    'github',
    'lyric',
    'covid',
    'ss',
    'insta',
    'tiktok',
    'animesay',
    'changesay',
    'trumpsay',
    'audio spam',
    'foto spam',
    'sticker spam',
    'vid spam',
    'killspam',
    'spam',
    'sticker',
    'alive',
    'sysd',
    'tagall',
    'tblend',
    'ttp',
    'att',
    'glowttp',
    'unvoice',
    'update',
    'voicy',
    'wallpaper',
    'weather',
    'speedtest',
    'ping',
    'short',
    'asena' ]
    let sml = '';
    let string = match['input'].split(' ')[0];
    string = string.slice(1, match['input'].split(' ')[0].length);
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
            sml += '\n*' + command[i] + '*'
        }
    }
    if(sml.length < 1) return;
    await message.client.sendMessage(message.jid, msg + sml, MessageType.text)

}));
