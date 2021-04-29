const Asena = require('../events');
const { MessageType } = require('@adiwajshing/baileys');
const { similarity } = require('../similarity')
const Language = require('../language');
const Lang = Language.getString('aiscanner');
const pb = require('../config');
let me = pb.WORKTYPE == 'public' ? false : true
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
        'log',
        'report',
        'tagadmin',
        'gaymeter',
        'roll',
        'faceai',
        'colorai',
        'superai',
        'waifuai',
        'animai',
        'moodai',
        'dreamai',
        'ttiai',
        'neuraltalkai',
        'nudityai',
        'toonai',
        'ganstyle',
        'textai',
        'x2mp4',
        'x4mp4',
        'gif',
        'agif',
        'mp4enhance',
        'mp4blur',
        'interp',
        'mp4slowmo',
        'mp4stab',
        'mp4rainbow',
        'mp4color',
        'mp4art',
        'mp4negative',
        'mp4vintage',
        'mp4bw',
        'mp4reverse',
        'mp4edge',
        'mp4image',
        'spectrum',
        'waves',
        'frequency',
        'avec',
        'volumeaudio',
        'cqtaudio',
        'mp3eq',
        'mp3crusher',
        'mp3reverse',
        'mp3pitch',
        'mp3low',
        'x2mp3',
        'mp3volume',
        'bwimage',
        'vintageimage',
        'edgeimage',
        'enhanceimage',
        'blurimage',
        'grenimage',
        'negativeimage',
        'rainbowimage',
        'colorimage',
        'artimage',
        'degis',
        'scan',
        'whois',
        'lesmeter',
        'asena' ]
        let sml = '';
        let string = match['input'].split(' ')[0];
        string = string.slice(1, match['input'].split(' ')[0].length);
        let msg = Lang.FOUND
        for (let i = 0; i < command.length; i++) {
            let smlarity = similarity(command[i], string)
            if (smlarity == 1) {
                index1 = command[i].split('')
                index2 = string.split('')
                for (let j = 0; j < index1.length; j++) {
                    while (index1[j] != index2[j]) {
                        return await message.client.sendMessage(message.jid, msg + command[i] + '```', MessageType.text)
                    }
                }
                return;
            }
            if (smlarity > 0.6 && smlarity !== 0) {
                sml += command[i] + '```'
            }
        }
        if(sml.length < 1) return;
        await message.client.sendMessage(message.jid, msg + sml, MessageType.text)

    }));
