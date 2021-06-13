/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const exec = require('child_process').exec;
const os = require("os");
const Config = require('../config')
const Language = require('../language');
const Lang = Language.getString('evaluators');
const SLang = Language.getString('conventer');

Asena.addCommand({pattern: 'term?(.*)', fromMe: true, desc: Lang.TERM_DESC}, (async (message, match) => {    
    var user = message.client.user.name
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.GIVE_ME_CODE,MessageType.text);

    exec(match[1], async (err, stdout, stderr) => {
        if (err) {
            return await message.client.sendMessage(message.jid,'```' + user + ':~# ' + match[1] + '\n' + err + '```',MessageType.text);
        }
        
        return await message.client.sendMessage(message.jid,'```' + user + ':~# ' + match[1] + '\n' + stdout + '```',MessageType.text);
      });
}));
let wk = Config.WORKTYPE == 'public' ? false : true
Asena.addCommand({pattern: 'mediainfo$', fromMe: wk, desc: Lang.MDESC}, (async (message, match) => {    
    if (message.reply_message.video) {
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage           
        });
        exec('mv ' + location + ' /root/WhatsAsenaDuplicated/vid.mp4')
        exec('ffprobe -hide_banner -loglevel fatal -show_error -show_format -show_streams -show_programs -show_chapters -show_private_data -print_format json /root/WhatsAsenaDuplicated/vid.mp4', async (err, st, stderr) => {
            if (err) {
                return await message.client.sendMessage(message.jid,'*Error:* \n\n' + err,MessageType.text);
            }
            var stdout = JSON.parse(st)
            let
                vsize = Config.LANG == 'TR' || Config.LANG == 'AZ' ? '*Video Boyutu:* ' : '*Video Size:* '
                vlength = Config.LANG == 'TR' || Config.LANG == 'AZ' ? '\n*Video Uzunluğu:* ' : '\n*Video Length:* '
                second = Config.LANG == 'TR' || Config.LANG == 'AZ' ? ' Saniye' : ' Second'
                vrvalue = Config.LANG == 'TR' || Config.LANG == 'AZ' ? '\n*Video Çözünürlük Değeri:* ' : '\n*Video Resolution Value:* '
                vpvalue = Config.LANG == 'TR' || Config.LANG == 'AZ' ? '\n*Video Pixel Değerleri:* ' : '\n*Video Pixel Value:* '
                vpformat = Config.LANG == 'TR' || Config.LANG == 'AZ' ? '\n*Video Pixel Formatı:* ' : '\n*Video Pixel Format:* '
                vcprofile = Config.LANG == 'TR' || Config.LANG == 'AZ' ? '\n*Video Kodek Profili:* ' : '\n*Video Codec Profile:* '
                vctag = Config.LANG == 'TR' || Config.LANG == 'AZ' ? '\n*Video Kodek Tagı:* ' : '\n*Video Codec Tag:* '
                srvalue = Config.LANG == 'TR' || Config.LANG == 'AZ' ? '\n*Örnek En-Boy Oranı:* ' : '\n*Example Aspect Ratio:* '
                vrvalue = Config.LANG == 'TR' || Config.LANG == 'AZ' ? '\n*İzlenebilir En-Boy Oranı:* ' : '\n*Viewable Aspect Ratio:* '
                vfps = Config.LANG == 'TR' || Config.LANG == 'AZ' ? '\n*Video FPS Değeri:* ' : '\n*Video FPS Value:* '
                vavgfps = Config.LANG == 'TR' || Config.LANG == 'AZ' ? '\n*Video Ortalama FPS Değeri:* ' : '\n*Video Average FPS Value:* '
                sctip = Config.LANG == 'TR' || Config.LANG == 'AZ' ? '\n*Ses Kodek Türü:* ' : '\n*Audio Codec Type:* '
                sctag = Config.LANG == 'TR' || Config.LANG == 'AZ' ? '\n*Ses Kodek Tagı:* ' : '\n*Audio Codec Tag:* '
                shzvalue = Config.LANG == 'TR' || Config.LANG == 'AZ' ? '\n*Ses KHz Oranı:* ' : '\n*Audio KHz Rate:* '
                schannel = Config.LANG == 'TR' || Config.LANG == 'AZ' ? '\n*Ses Kanalları:* ' : '\n*Audio Channels:* '
                schome = Config.LANG == 'TR' || Config.LANG == 'AZ' ? '\n*Ses Kanalı Yerleşimi:* ' : '\n*Audio Channel Layout:* '
            var msgi = vsize + stdout.format.size / 1000000 + 'MB' + vlength + stdout.streams[0].duration + second + vrvalue + stdout.streams[0].width + 'p' + vpvalue + stdout.streams[0].width + 'x' + stdout.streams[0].height + vpformat + stdout.streams[0].pix_fmt + vcprofile + stdout.streams[0].codec_name + vctag + stdout.streams[0].codec_tag_string + srvalue + stdout.streams[0].sample_aspect_ratio + vrvalue + stdout.streams[0].display_aspect_ratio + vfps + stdout.streams[0].r_frame_rate.split('/')[0] + vavgfps + stdout.streams[0].avg_frame_rate.split('/')[0] + sctip + stdout.streams[1].codec_name + sctag + stdout.streams[1].codec_tag_string + shzvalue + stdout.streams[1].sample_rate + schannel + stdout.streams[1].channels + schome + stdout.streams[1].channel_layout            
            return await message.client.sendMessage(message.jid,msgi,MessageType.text);
        });
    } else { return await message.client.sendMessage(message.jid,SLang.MP4TOAUDİO_NEEDREPLY, MessageType.text)
    }
}));
