/* Codded by @phaticusthiccy

Telegram: t.me/phaticusthiccy

Instagram: www.instagram.com/kyrie.baran

*/

const Asena = require('../events');

const {MessageType,Mimetype} = require('@adiwajshing/baileys');

const fs = require('fs');

const ffmpeg = require('fluent-ffmpeg');

const {execFile} = require('child_process');

const cwebp = require('cwebp-bin');

Asena.addCommand({pattern: 'x4mp4', fromMe: true}, (async (message, match) => {    

    if (message.reply_message === false) return await message.sendMessage('*Bana Kalitesini Düşecek Bir Video Ver!*');

    var downloading = await message.client.sendMessage(message.jid,'```Video Düzenleniyor..```',MessageType.text);

    var location = await message.client.downloadAndSaveMediaMessage({

        key: {

            remoteJid: message.reply_message.jid,

            id: message.reply_message.id

        },

        message: message.reply_message.data.quotedMessage

    });

    ffmpeg(location)

        .withSize('25%')

        .format('mp4')

        .save('output.mp4')

        .on('end', async () => {

            await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video);

        });

    return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Asena.addCommand({pattern: 'x2mp4', fromMe: true}, (async (message, match) => {    

    if (message.reply_message === false) return await message.sendMessage('*Bana Kalitesini Düşecek Bir Video Ver!*');

    var downloading = await message.client.sendMessage(message.jid,'```Video Düzenleniyor..```',MessageType.text);

    var location = await message.client.downloadAndSaveMediaMessage({

        key: {

            remoteJid: message.reply_message.jid,

            id: message.reply_message.id

        },

        message: message.reply_message.data.quotedMessage

    });

    ffmpeg(location)

        .withSize('50%')

        .format('mp4')

        .save('output.mp4')

        .on('end', async () => {

            await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video);

        });

    return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Asena.addCommand({pattern: 'xmedia', fromMe: true}, (async (message, match) => {    

    await message.sendMessage('*Codded by @phaticusthiccy*\n💻Usage: *.mp4enhance*\nℹ️Desc: 🇹🇷 Videnun kalitesini artırır.\n🇬🇧 Enhance video’s quality.\n\n💻Usage: *.x4mp4*\nℹ️Desc: 🇹🇷 Video Kalitesini 4 kat düşürür.\n🇬🇧 Reduce video’s quality by 75%.\n\n💻Usage: *.x2mp4*\nℹ️Desc: 🇹🇷 Video Kalitesini 2 kat düşürür.\n🇬🇧 Reduce video’s quality by 50%.\n\n💻Usage: *.mp4vintage*\nℹ️Desc: 🇹🇷 Videoya nostaji efekti uygular.\n🇬🇧 Applies a nostalgic effect to video.\n\n💻Usage: *.mp4bw*\nℹ️Desc: 🇹🇷 Videoya monochrome efekti uygular.\n🇬🇧 Applies a monochrome effect to video.\n\n💻Usage: *.mp4reverse*\nℹ️Desc: 🇹🇷 Videoyu tersten oynatır.\n🇬🇧 Plays the video in reverse.\n\n💻Usage: *.mp4image*\nℹ️Desc: 🇹🇷 Fotoğrafı 5 saniyelik videoya çevirir.\n🇬🇧 Converts photo to 5 sec video.\n\n💻Usage: *.spectrum*\nℹ️Desc: 🇹🇷 Sesin spektrum görüntüsünü video yapar.\n🇬🇧 Converts the spectrum of sound into video.\n\n💻Usage: *.waves*\nℹ️Desc: 🇹🇷 Sesin dalga aralığını videoya çevirir.\n🇬🇧 Converts the wave range of sound to video.\n\n💻Usage: *.frequency*\nℹ️Desc: 🇹🇷 Sesin frekans aralığını videoya çevirir.\n🇬🇧 Converts the frequency range of sound to video.\n\n💻Usage: *.avec*\nℹ️Desc: 🇹🇷 Sesin farklı bir histogramını videoya çevirir.\n🇬🇧 Converts the histogram of sound to video.\n\n💻Usage: *.volumeaudio*\nℹ️Desc: 🇹🇷 Sesin Desibel Değerini Videoya Dönüştürür.\n🇬🇧 Converts the decibel value of the sound into video.\n\n💻Usage: *.cqtaudio*\nℹ️Desc: 🇹🇷 Ses CQT değerini videoya çevirir.\n🇬🇧 Converts the CQT value of audio to video.\n\n💻Usage: *.mp3eq*\nℹ️Desc: 🇹🇷 Sesi kristal berraklık düzeyinde ayarlar.🇬🇧 Adjusts the sound to a crystal clear level.\n\n💻Usage: *.mp3crusher*\nℹ️Desc: 🇹🇷 Sesi bozar ve gülünç hale getirir.\n🇬🇧 Distorts the sound, makes ridiculous.\n\n💻Usage: *.mp3reverse*\nℹ️Desc: 🇹🇷 Sesi Tersen Oynatır.\n🇬🇧 Plays the sound in reverse.\n\n💻Usage: *.bwimage*\nℹ️Desc: 🇹🇷 Fotoğrafa monochrome efekti uygular.\n🇬🇧 Applies a monochrome effect to image.\n\n💻Usage: *.vintageimage*\nℹ️Desc: 🇹🇷 Fotoğrafa vintage efekti uygular.\n🇬🇧 Applies a vinatge effect to video.');

}));

Asena.addCommand({pattern: 'mp4image', fromMe: true}, (async (message, match) => {    

    if (message.reply_message === false) return await message.sendMessage('*Bir Fotoğrafa Yanıt Vermelisin!*');

    var downloading = await message.client.sendMessage(message.jid,'```Fotoğraf Videoya Dönüştürülüyor..```',MessageType.text);

    var location = await message.client.downloadAndSaveMediaMessage({

        key: {

            remoteJid: message.reply_message.jid,

            id: message.reply_message.id

        },

        message: message.reply_message.data.quotedMessage

    });

    ffmpeg(location)

        .loop(6)

        .fps(19)

        .videoBitrate(400)

        .format('mp4')

        .save('output.mp4')

        .on('end', async () => {

            await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video);

        });

    return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Asena.addCommand({pattern: 'spectrum', fromMe: true}, (async (message, match) => {    

    if (message.reply_message === false) return await message.sendMessage('*Bir Ses Dosyasına Yanıt Vermelisin!*');

    var downloading = await message.client.sendMessage(message.jid,'```Ses Spektrumu Çıkartılıyor..```',MessageType.text);

    var location = await message.client.downloadAndSaveMediaMessage({

        key: {

            remoteJid: message.reply_message.jid,

            id: message.reply_message.id

        },

        message: message.reply_message.data.quotedMessage

    });

    ffmpeg(location)

        .outputOptions(["-y", "-filter_complex", "[0:a]showspectrum=s=720x1280,format=yuv420p[v]", "-map", "[v]", "-map 0:a"])

        .save('output.mp4')

        .on('end', async () => {

            await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, {mimetype: Mimetype.mpeg});

        });

    return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Asena.addCommand({pattern: 'waves', fromMe: true}, (async (message, match) => {    

    if (message.reply_message === false) return await message.sendMessage('*Bir Ses Dosyasına Yanıt Vermelisin!*');

    var downloading = await message.client.sendMessage(message.jid,'```Ses Dalgaları Videoya Dönüştürülüyor..```',MessageType.text);

    var location = await message.client.downloadAndSaveMediaMessage({

        key: {

            remoteJid: message.reply_message.jid,

            id: message.reply_message.id

        },

        message: message.reply_message.data.quotedMessage

    });

    ffmpeg(location)

        .outputOptions(["-y", "-filter_complex", "[0:a]showwaves=s=720x1280:mode=line:rate=25,format=yuv420p[v]", "-map", "[v]", "-map 0:a"])

        .save('output.mp4')

        .on('end', async () => {

            await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, {mimetype: Mimetype.mpeg});

        });

    return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Asena.addCommand({pattern: 'frequency', fromMe: true}, (async (message, match) => {    

    if (message.reply_message === false) return await message.sendMessage('*Bir Ses Dosyasına Yanıt Vermelisin!*');

    var downloading = await message.client.sendMessage(message.jid,'```Ses Frekansı Videoya Dönüştürülüyor..```',MessageType.text);

    var location = await message.client.downloadAndSaveMediaMessage({

        key: {

            remoteJid: message.reply_message.jid,

            id: message.reply_message.id

        },

        message: message.reply_message.data.quotedMessage

    });

    ffmpeg(location)

        .outputOptions(["-y", "-filter_complex", "[0:a]showfreqs=s=720x1280:mode=line:fscale=log,format=yuv420p[v]", "-map", "[v]", "-map 0:a"])

        .save('output.mp4')

        .on('end', async () => {

            await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, {mimetype: Mimetype.mpeg});

        });

    return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Asena.addCommand({pattern: 'avec', fromMe: true}, (async (message, match) => {    

    if (message.reply_message === false) return await message.sendMessage('*Bir Ses Dosyasına Yanıt Vermelisin!*');

    var downloading = await message.client.sendMessage(message.jid,'```Ses Histogram Videsuna Dönüştürülüyor..```',MessageType.text);

    var location = await message.client.downloadAndSaveMediaMessage({

        key: {

            remoteJid: message.reply_message.jid,

            id: message.reply_message.id

        },

        message: message.reply_message.data.quotedMessage

    });

    ffmpeg(location)

        .outputOptions(["-y", "-filter_complex", "[0:a]avectorscope=s=720x1280,format=yuv420p[v]", "-map", "[v]", "-map 0:a"])

        .save('output.mp4')

        .on('end', async () => {

            await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, {mimetype: Mimetype.mpeg});

        });

    return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Asena.addCommand({pattern: 'volumeaudio', fromMe: true}, (async (message, match) => {    

    if (message.reply_message === false) return await message.sendMessage('*Bir Ses Dosyasına Yanıt Vermelisin!*');

    var downloading = await message.client.sendMessage(message.jid,'```Ses Desibel Değeri Videoya Dönüştürülüyor..```',MessageType.text);

    var location = await message.client.downloadAndSaveMediaMessage({

        key: {

            remoteJid: message.reply_message.jid,

            id: message.reply_message.id

        },

        message: message.reply_message.data.quotedMessage

    });

    ffmpeg(location)

        .outputOptions(["-y", "-filter_complex", "[0:a]showvolume=f=1:b=4:w=720:h=68,format=yuv420p[vid]", "-map", "[vid]", "-map 0:a"])

        .save('output.mp4')

        .on('end', async () => {

            await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, {mimetype: Mimetype.mpeg});

        });

    return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Asena.addCommand({pattern: 'cqtaudio', fromMe: true}, (async (message, match) => {    

    if (message.reply_message === false) return await message.sendMessage('*Bir Ses Dosyasına Yanıt Vermelisin!*');

    var downloading = await message.client.sendMessage(message.jid,'```Ses CQT Değeri Videoya Dönüştürülüyor..```',MessageType.text);

    var location = await message.client.downloadAndSaveMediaMessage({

        key: {

            remoteJid: message.reply_message.jid,

            id: message.reply_message.id

        },

        message: message.reply_message.data.quotedMessage

    });

    ffmpeg(location)

        .outputOptions(["-y", "-filter_complex", "[0:a]showcqt=s=1280x720,format=yuv420p[v]", "-map", "[v]", "-map 0:a"])

        .save('output.mp4')

        .on('end', async () => {

            await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, {mimetype: Mimetype.mpeg});

        });

    return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Asena.addCommand({pattern: 'mp3eq', fromMe: true}, (async (message, match) => {    

    if (message.reply_message === false) return await message.sendMessage('*Bir Ses Dosyasına Yanıt Vermelisin!*');

    var downloading = await message.client.sendMessage(message.jid,'```Ses’e Equalizer Ayarlanıyor...```',MessageType.text);

    var location = await message.client.downloadAndSaveMediaMessage({

        key: {

            remoteJid: message.reply_message.jid,

            id: message.reply_message.id

        },

        message: message.reply_message.data.quotedMessage

    });

    ffmpeg(location)

        .outputOptions(["-y", "-af", "superequalizer=1b=10:2b=10:3b=1:4b=5:5b=7:6b=5:7b=2:8b=3:9b=4:10b=5:11b=6:12b=7:13b=8:14b=8:15b=9:16b=9:17b=10:18b=10[a];[a]loudnorm=I=-16:TP=-1.5:LRA=14", "-ar 48k"])

        .save('output.mp3')

        .on('end', async () => {

            await message.sendMessage(fs.readFileSync('output.mp3'), MessageType.audio, {mimetype: Mimetype.mp4Audio, ptt: false});

        });

    return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Asena.addCommand({pattern: 'mp3crusher', fromMe: true}, (async (message, match) => {    

    if (message.reply_message === false) return await message.sendMessage('*Bir Ses Dosyasına Yanıt Vermelisin!*');

    var downloading = await message.client.sendMessage(message.jid,'```Ses’e Crusher Ayarlanıyor...```',MessageType.text);

    var location = await message.client.downloadAndSaveMediaMessage({

        key: {

            remoteJid: message.reply_message.jid,

            id: message.reply_message.id

        },

        message: message.reply_message.data.quotedMessage

    });

    ffmpeg(location)

        .outputOptions(["-y", "-filter_complex", "acrusher=level_in=8:level_out=18:bits=8:mode=log:aa=1"])

        .save('output.mp3')

        .on('end', async () => {

            await message.sendMessage(fs.readFileSync('output.mp3'), MessageType.audio, {mimetype: Mimetype.mp4Audio, ptt: false});

        });

    return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Asena.addCommand({pattern: 'mp3reverse', fromMe: true}, (async (message, match) => {    

    if (message.reply_message === false) return await message.sendMessage('*Bir Ses Dosyasına Yanıt Vermelisin!*');

    var downloading = await message.client.sendMessage(message.jid,'```Ses Tersten Oynatılıyor..```',MessageType.text);

    var location = await message.client.downloadAndSaveMediaMessage({

        key: {

            remoteJid: message.reply_message.jid,

            id: message.reply_message.id

        },

        message: message.reply_message.data.quotedMessage

    });

    ffmpeg(location)

        .outputOptions(["-y", "-filter_complex", "areverse"])

        .save('output.mp3')

        .on('end', async () => {

            await message.sendMessage(fs.readFileSync('output.mp3'), MessageType.audio, {mimetype: Mimetype.mp4Audio, ptt: false});

        });

    return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Asena.addCommand({pattern: 'mp4vintage', fromMe: true}, (async (message, match) => {    

    if (message.reply_message === false) return await message.sendMessage('*Bir Videoua Yanıt Vermelisin!*');

    var downloading = await message.client.sendMessage(message.jid,'```Videoya Vintage Efekti Uygulanıyor..```',MessageType.text);

    var location = await message.client.downloadAndSaveMediaMessage({

        key: {

            remoteJid: message.reply_message.jid,

            id: message.reply_message.id

        },

        message: message.reply_message.data.quotedMessage

    });

    ffmpeg(location)

        .outputOptions(["-y", "-vf", "curves=vintage,format=yuv420p"])

        .fps(22)

        .save('output.mp4')

        .on('end', async () => {

            await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, {mimetype: Mimetype.mpeg});

        });

    return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Asena.addCommand({pattern: 'mp4reverse', fromMe: true}, (async (message, match) => {    

    if (message.reply_message === false) return await message.sendMessage('*Bir Videoya Yanıt Vermelisin!*');

    var downloading = await message.client.sendMessage(message.jid,'```Video Tersten Oynatılıyor..```',MessageType.text);

    var location = await message.client.downloadAndSaveMediaMessage({

        key: {

            remoteJid: message.reply_message.jid,

            id: message.reply_message.id

        },

        message: message.reply_message.data.quotedMessage

    });

    ffmpeg(location)

        .outputOptions(["-y", "-vf", "reverse", "-af", "areverse"])

        .format('mp4')

        .fps(22)

        .save('output.mp4')

        .on('end', async () => {

            await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, {mimetype: Mimetype.mpeg});

        });

    return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Asena.addCommand({pattern: 'mp4bw', fromMe: true}, (async (message, match) => {    

    if (message.reply_message === false) return await message.sendMessage('*Bir Videoya Yanıt Vermelisin!*');

    var downloading = await message.client.sendMessage(message.jid,'```Videoya Monochrome Efekti Uygulanıyor..```',MessageType.text);

    var location = await message.client.downloadAndSaveMediaMessage({

        key: {

            remoteJid: message.reply_message.jid,

            id: message.reply_message.id

        },

        message: message.reply_message.data.quotedMessage

    });

    ffmpeg(location)

        .outputOptions(["-y", "-vf", "hue=s=0"])

        .format('mp4')

        .save('output.mp4')

        .on('end', async () => {

            await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, {mimetype: Mimetype.mpeg});

        });

    return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Asena.addCommand({pattern: 'bwimage', fromMe: true}, (async (message, match) => {    

    if (message.reply_message === false) return await message.sendMessage('*Bir Fotoğrafa Yanıt Vermelisin!*');

    var downloading = await message.client.sendMessage(message.jid,'```Fotoğrafa Monochrome Efekti Uygulanıyor..```',MessageType.text);

    var location = await message.client.downloadAndSaveMediaMessage({

        key: {

            remoteJid: message.reply_message.jid,

            id: message.reply_message.id

        },

        message: message.reply_message.data.quotedMessage

    });

    ffmpeg(location)

        .outputOptions(["-y", "-vf", "hue=s=0"])

        .toFormat('gif')

        .videoBitrate(1000)

        .save('output.jpg')

        .on('end', async () => {

            await message.sendMessage(fs.readFileSync('output.jpg'), MessageType.image, {mimetype: Mimetype.jpg});

        });

    return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Asena.addCommand({pattern: 'vintageimage', fromMe: true}, (async (message, match) => {    

    if (message.reply_message === false) return await message.sendMessage('*Bir Fotoğrafa Yanıt Vermelisin!*');

    var downloading = await message.client.sendMessage(message.jid,'```Fotoğrafa Vintage Efekti Uygulanıyor..```',MessageType.text);

    var location = await message.client.downloadAndSaveMediaMessage({

        key: {

            remoteJid: message.reply_message.jid,

            id: message.reply_message.id

        },

        message: message.reply_message.data.quotedMessage

    });

    ffmpeg(location)

        .outputOptions(["-y", "-vf", "curves=vintage"])

        .toFormat('gif')

        .videoBitrate(1000)

        .save('output.jpg')

        .on('end', async () => {

            await message.sendMessage(fs.readFileSync('output.jpg'), MessageType.image, {mimetype: Mimetype.jpg});

        });

    return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Asena.addCommand({pattern: 'mp4enhance', fromMe: true}, (async (message, match) => {    

    if (message.reply_message === false) return await message.sendMessage('*Bir Videoya Yanıt Vermelisin!*');

    var downloading = await message.client.sendMessage(message.jid,'```Video Enhance Ediliyor..```',MessageType.text);

    var location = await message.client.downloadAndSaveMediaMessage({

        key: {

            remoteJid: message.reply_message.jid,

            id: message.reply_message.id

        },

        message: message.reply_message.data.quotedMessage

    });

    ffmpeg(location)

        .outputOptions(["-y", "-vf", "unsharp=3:3:1.5"])

        .format('mp4')

        .save('output.mp4')

        .on('end', async () => {

            await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, {mimetype: Mimetype.mpeg});

        });

    return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));
