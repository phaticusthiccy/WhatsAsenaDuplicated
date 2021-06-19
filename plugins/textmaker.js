/* Codded by Phaticusthiccy

Unlimited API for Photooxy, Textpro and Instagram scraper.

Material: https://www.npmjs.com/package/textmaker-thiccy
Github: https://github.com/phaticusthiccy/TextMaker-Unlimited

This code works with unlimited and completely free an API scraper.
Don't use it for illegal purposes.
*/

const thiccysapi = require('textmaker-thiccy'); // Import NPM Package

const Asena = require('../events');
const {MessageType, GroupSettingChange, Mimetype, MessageOptions} = require('@adiwajshing/baileys');
const fs = require('fs');
const Config = require('../config')
const axios = require('axios')

var desc_msg = ''
if (Config.LANG == 'TR') desc_msg = 'Sınırsız erişime sahip textmaker araçlarını gösterir.'
if (Config.LANG == 'EN') desc_msg = 'Shows textmaker tools with unlimited access.'
if (Config.LANG == 'RU') desc_msg = 'Показывает инструменты для создания текстов с неограниченным доступом.'
if (Config.LANG == 'AZ') desc_msg = 'Sınırsız girişi olan textmaker alətləri göstərir.'
if (Config.LANG == 'PT') desc_msg = 'Mostra ferramentas textmaker com acesso ilimitado.'
if (Config.LANG == 'ID') desc_msg = 'Menampilkan alat pembuat teks dengan akses tak terbatas.'
if (Config.LANG == 'ML') desc_msg = 'പരിധിയില്ലാത്ത ആക്സസ് ഉള്ള ടെക്സ്റ്റ് മേക്കർ ഉപകരണങ്ങൾ കാണിക്കുന്നു.'
if (Config.LANG == 'HI') desc_msg = 'असीमित एक्सेस के साथ टेक्स्टमेकर टूल दिखाता है।'
if (Config.LANG == 'ES') desc_msg = 'Muestra herramientas de creación de textos con acceso ilimitado.'

let wk = Config.WORKTYPE == 'public' ? false : true

Asena.addCommand({pattern: 'textmaker$', fromMe: wk, desc: desc_msg}, (async (message, match) => {
    var t1 = ''
    var t2 = ''
    var t3 = ''
    var t4 = ''
    var t5 = ''
    var t6 = ''
    var t7 = ''
    var t8 = ''
    var t9 = ''
    var t10 = ''
    var t11 = ''
    var t12 = ''
    var t13 = ''
    var t14 = ''
    if (Config.LANG == 'TR' || Config.LANG == 'AZ') {
        t1 = 'Şeytan Temalı Logo Yapar.' // https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html
        t2 = 'Ayı İkonu İçeren Logo Yapar.' // https://textpro.me/online-black-and-white-bear-mascot-logo-creation-1012.html
        t3 = 'Neon Efekti İçeren Logo Yapar.' // https://textpro.me/create-a-futuristic-technology-neon-light-text-effect-1006.html
        t4 = '2. Bir Neon Efekti İçeren Logo Yapar.' // https://textpro.me/neon-text-effect-online-879.html
        t5 = 'Yıldırım Temalı Logo Yapar.' // https://textpro.me/thunder-text-effect-online-881.html
        t6 = 'Joker Temalı Logo Yapar.' // https://textpro.me/create-logo-joker-online-934.html
        t7 = 'Ninja Temalı Logo Yapar.' // https://textpro.me/create-ninja-logo-online-935.html
        t8 = 'Parıltı Temalı Logo Yapar.' // https://textpro.me/advanced-glow-text-effect-873.html
        t9 = 'Bokeh Efekti İçeren Logo Yapar.' // https://textpro.me/bokeh-text-effect-876.html
        t10 = 'Kurt İkonu İçeren Logo Yapar.' // https://textpro.me/create-wolf-logo-galaxy-online-936.html
        t11 = 'Siyah Beyaz Marvel Logosu Yapar.' // https://textpro.me/create-logo-style-marvel-studios-online-971.html
        t12 = 'Renkli Marvel Logosu Yapar.' // https://textpro.me/create-logo-style-marvel-studios-ver-metal-972.html
        t13 = 'Avengers Logosu Yapar.' // https://textpro.me/create-3d-avengers-logo-online-974.html
        t14 = 'Glitch Efekti İçeren Logo Yapar.' // https://textpro.me/create-glitch-text-effect-style-tik-tok-983.html
    }
    else {
        t1 = 'Makes Devil Themed Logo.' // https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html
        t2 = 'Makes Logo With Bear Icon.' // https://textpro.me/online-black-and-white-bear-mascot-logo-creation-1012.html
        t3 = 'Makes Logo With Neon Effect.' // https://textpro.me/create-a-futuristic-technology-neon-light-text-effect-1006.html
        t4 = 'Makes Logo With Second Neon Effect.' // https://textpro.me/neon-text-effect-online-879.html
        t5 = 'Makes Lightning Themed Logo.' // https://textpro.me/thunder-text-effect-online-881.html
        t6 = 'Makes Joker Themed Logo.' // https://textpro.me/create-logo-joker-online-934.html
        t7 = 'Makes Ninja Themed Logos.' // https://textpro.me/create-ninja-logo-online-935.html
        t8 = 'Makes Glitter Themed Logo.' // https://textpro.me/advanced-glow-text-effect-873.html
        t9 = 'Makes Logo With Bokeh Effect.' // https://textpro.me/bokeh-text-effect-876.html
        t10 = 'Makes Logo With Wolf Icon.' // https://textpro.me/create-wolf-logo-galaxy-online-936.html
        t11 = 'Makes Black And White Marvel Logo.' // https://textpro.me/create-logo-style-marvel-studios-online-971.html
        t12 = 'Makes Colorful Marvel Logo.' // https://textpro.me/create-logo-style-marvel-studios-ver-metal-972.html
        t13 = 'Makes The Avengers Logo.' // https://textpro.me/create-3d-avengers-logo-online-974.html
        t14 = 'Makes Logo With Glitch Effect.' // https://textpro.me/create-glitch-text-effect-style-tik-tok-983.html
    }
    var usage_cmd = ''
    var command_cmd = ''
    if (Config.LANG == 'TR' || Config.LANG == 'AZ') {
        usage_cmd = '⌨️ *Örnek:* '
        command_cmd = '\n💻 *Komut:* '
    } else { 
        usage_cmd = '*⌨️ Example:* '
        command_cmd = '\n💻 *Command:* '
    }
    const msg = command_cmd + '.textdevil \n' + t1 + '\n' + usage_cmd + '.textdevil Phaticusthiccy' +
        command_cmd + '.textbear \n' + t2 + '\n' + usage_cmd + '.textbear Phaticusthiccy' +
        command_cmd + '.textwolf \n' + t10 + '\n' + usage_cmd + '.textwolf Developer;Phaticusthiccy' +
        command_cmd + '.textneon \n' + t3 + '\n' + usage_cmd + '.textneon Phaticusthiccy' +
        command_cmd + '.text2neon \n' + t4 + '\n' + usage_cmd + '.text2neon Phaticusthiccy' +
        command_cmd + '.textlight \n' + t5 + '\n' + usage_cmd + '.textlight Phaticusthiccy' +
        command_cmd + '.textjoker \n' + t6 + '\n' + usage_cmd + '.textjoker Phaticusthiccy' +
        command_cmd + '.textninja \n' + t7 + '\n' + usage_cmd + '.textninja Developer;Phaticusthiccy' +
        command_cmd + '.textglit \n' + t8 + '\n' + usage_cmd + '.textglit Phaticusthiccy' +
        command_cmd + '.textbokeh \n' + t9 + '\n' + usage_cmd + '.textbokeh Phaticusthiccy' +
        command_cmd + '.textmarvel \n' + t11 + '\n' + usage_cmd + '.textmarvel Developer;Phaticusthiccy' +
        command_cmd + '.text2marvel \n' + t12 + '\n' + usage_cmd + '.text2marvel Developer;Phaticusthiccy' +
        command_cmd + '.textavengers \n' + t13 + '\n' + usage_cmd + '.textavengers Developer;Phaticusthiccy' +
        command_cmd + '.textglitch \n' + t14 + '\n' + usage_cmd + '.textglitch Developer;Phaticusthiccy' 
    await message.client.sendMessage(message.jid,msg, MessageType.text, { quoted: message.data })
}));
Asena.addCommand({pattern: 'textdevil ?(.*)', fromMe: wk, dontAddCommandList: true}, (async (message, match) => {
    thiccysapi.textpro("https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html",
        `${match[1]}`
        ).then(async (data) => { 
          try { 
              var img = await axios.get(data, { responseType: 'arraybuffer' })
              await message.sendMessage(Buffer.from(img.data), MessageType.image, { mimetype: Mimetype.png, caption: 'Made by WhatsAsena' })
          } catch(err) { 
              console.log(err)
          } 
    });
}));
Asena.addCommand({pattern: 'textbear ?(.*)', fromMe: wk, dontAddCommandList: true}, (async (message, match) => {
    thiccysapi.textpro("https://textpro.me/online-black-and-white-bear-mascot-logo-creation-1012.html",
        `${match[1]}`
        ).then(async (data) => { 
          try { 
              var img = await axios.get(data, { responseType: 'arraybuffer' })
              await message.sendMessage(Buffer.from(img.data), MessageType.image, { mimetype: Mimetype.png, caption: 'Made by WhatsAsena' })
          } catch(err) { 
              console.log(err)
          } 
    });
}));
Asena.addCommand({pattern: 'textwolf ?(.*)', fromMe: wk, dontAddCommandList: true}, (async (message, match) => {
    var topText, bottomText; 
    if (match[1].includes(';')) {
        var split = match[1].split(';');
        topText = split[0];
        bottomText = split[1];
    } else {
        topText = match[1];
        bottomText = '';
    }
    thiccysapi.textpro("https://textpro.me/create-wolf-logo-galaxy-online-936.html",
        [`${topText}`], [`${bottomText}`]
        ).then(async (data) => { 
          try { 
              var img = await axios.get(data, { responseType: 'arraybuffer' })
              await message.sendMessage(Buffer.from(img.data), MessageType.image, { mimetype: Mimetype.png, caption: 'Made by WhatsAsena' })
          } catch(err) { 
              console.log(err)
          } 
    });
}));
Asena.addCommand({pattern: 'textneon ?(.*)', fromMe: wk, dontAddCommandList: true}, (async (message, match) => {
    thiccysapi.textpro("https://textpro.me/create-a-futuristic-technology-neon-light-text-effect-1006.html",
        `${match[1]}`
        ).then(async (data) => { 
          try { 
              var img = await axios.get(data, { responseType: 'arraybuffer' })
              await message.sendMessage(Buffer.from(img.data), MessageType.image, { mimetype: Mimetype.png, caption: 'Made by WhatsAsena' })
          } catch(err) { 
              console.log(err)
          } 
    });
}));
Asena.addCommand({pattern: 'text2neon ?(.*)', fromMe: wk, dontAddCommandList: true}, (async (message, match) => {
    thiccysapi.textpro("https://textpro.me/neon-text-effect-online-879.html",
        `${match[1]}`
        ).then(async (data) => { 
          try { 
              var img = await axios.get(data, { responseType: 'arraybuffer' })
              await message.sendMessage(Buffer.from(img.data), MessageType.image, { mimetype: Mimetype.png, caption: 'Made by WhatsAsena' })
          } catch(err) { 
              console.log(err)
          } 
    });
}));
Asena.addCommand({pattern: 'textlight ?(.*)', fromMe: wk, dontAddCommandList: true}, (async (message, match) => {
    thiccysapi.textpro("https://textpro.me/thunder-text-effect-online-881.html",
        `${match[1]}`
        ).then(async (data) => { 
          try { 
              var img = await axios.get(data, { responseType: 'arraybuffer' })
              await message.sendMessage(Buffer.from(img.data), MessageType.image, { mimetype: Mimetype.png, caption: 'Made by WhatsAsena' })
          } catch(err) { 
              console.log(err)
          } 
    });
}));
Asena.addCommand({pattern: 'textjoker ?(.*)', fromMe: wk, dontAddCommandList: true}, (async (message, match) => {
    thiccysapi.textpro("https://textpro.me/create-logo-joker-online-934.html",
        `${match[1]}`
        ).then(async (data) => { 
          try { 
              var img = await axios.get(data, { responseType: 'arraybuffer' })
              await message.sendMessage(Buffer.from(img.data), MessageType.image, { mimetype: Mimetype.png, caption: 'Made by WhatsAsena' })
          } catch(err) { 
              console.log(err)
          } 
    });
}));
Asena.addCommand({pattern: 'textninja ?(.*)', fromMe: wk, dontAddCommandList: true}, (async (message, match) => {
    var topText, bottomText; 
    if (match[1].includes(';')) {
        var split = match[1].split(';');
        topText = split[0];
        bottomText = split[1];
    } else {
        topText = match[1];
        bottomText = '';
    }
    thiccysapi.textpro("https://textpro.me/create-ninja-logo-online-935.html",
        [`${topText}`], [`${bottomText}`]
        ).then(async (data) => { 
          try { 
              var img = await axios.get(data, { responseType: 'arraybuffer' })
              await message.sendMessage(Buffer.from(img.data), MessageType.image, { mimetype: Mimetype.png, caption: 'Made by WhatsAsena' })
          } catch(err) { 
              console.log(err)
          } 
    });
}));
Asena.addCommand({pattern: 'textglit ?(.*)', fromMe: wk, dontAddCommandList: true}, (async (message, match) => {
    thiccysapi.textpro("https://textpro.me/advanced-glow-text-effect-873.html",
        `${match[1]}`
        ).then(async (data) => { 
          try { 
              var img = await axios.get(data, { responseType: 'arraybuffer' })
              await message.sendMessage(Buffer.from(img.data), MessageType.image, { mimetype: Mimetype.png, caption: 'Made by WhatsAsena' })
          } catch(err) { 
              console.log(err)
          } 
    });
}));
Asena.addCommand({pattern: 'textbokeh ?(.*)', fromMe: wk, dontAddCommandList: true}, (async (message, match) => {
    thiccysapi.textpro("https://textpro.me/bokeh-text-effect-876.html",
        `${match[1]}`
        ).then(async (data) => { 
          try { 
              var img = await axios.get(data, { responseType: 'arraybuffer' })
              await message.sendMessage(Buffer.from(img.data), MessageType.image, { mimetype: Mimetype.png, caption: 'Made by WhatsAsena' })
          } catch(err) { 
              console.log(err)
          } 
    });
}));
Asena.addCommand({pattern: 'textmarvel ?(.*)', fromMe: wk, dontAddCommandList: true}, (async (message, match) => {
    var topText, bottomText; 
    if (match[1].includes(';')) {
        var split = match[1].split(';');
        topText = split[0];
        bottomText = split[1];
    } else {
        topText = match[1];
        bottomText = 'ㅤ';
    }
    thiccysapi.textpro("https://textpro.me/create-logo-style-marvel-studios-online-971.html",
        [`${topText}`], [`${bottomText}`]
        ).then(async (data) => { 
          try { 
              var img = await axios.get(data, { responseType: 'arraybuffer' })
              await message.sendMessage(Buffer.from(img.data), MessageType.image, { mimetype: Mimetype.png, caption: 'Made by WhatsAsena' })
          } catch(err) { 
              console.log(err)
          } 
    });
}));
Asena.addCommand({pattern: 'text2marvel ?(.*)', fromMe: wk, dontAddCommandList: true}, (async (message, match) => {
    var topText, bottomText; 
    if (match[1].includes(';')) {
        var split = match[1].split(';');
        topText = split[0];
        bottomText = split[1];
    } else {
        topText = match[1];
        bottomText = 'ㅤ';
    }
    thiccysapi.textpro("https://textpro.me/create-3d-avengers-logo-online-974.html",
        [`${topText}`], [`${bottomText}`]
        ).then(async (data) => { 
          try { 
              var img = await axios.get(data, { responseType: 'arraybuffer' })
              await message.sendMessage(Buffer.from(img.data), MessageType.image, { mimetype: Mimetype.png, caption: 'Made by WhatsAsena' })
          } catch(err) { 
              console.log(err)
          } 
    });
}));
Asena.addCommand({pattern: 'textavengers ?(.*)', fromMe: wk, dontAddCommandList: true}, (async (message, match) => {
    var topText, bottomText; 
    if (match[1].includes(';')) {
        var split = match[1].split(';');
        topText = split[0];
        bottomText = split[1];
    } else {
        topText = match[1];
        bottomText = 'ㅤ';
    }
    thiccysapi.textpro("https://textpro.me/create-3d-avengers-logo-online-974.html",
        [`${topText}`], [`${bottomText}`]
        ).then(async (data) => { 
          try { 
              var img = await axios.get(data, { responseType: 'arraybuffer' })
              await message.sendMessage(Buffer.from(img.data), MessageType.image, { mimetype: Mimetype.png, caption: 'Made by WhatsAsena' })
          } catch(err) { 
              console.log(err)
          } 
    });
}));
Asena.addCommand({pattern: 'textglitch ?(.*)', fromMe: wk, dontAddCommandList: true}, (async (message, match) => {
    var topText, bottomText; 
    if (match[1].includes(';')) {
        var split = match[1].split(';');
        topText = split[0];
        bottomText = split[1];
    } else {
        topText = match[1];
        bottomText = 'ㅤ';
    }
    thiccysapi.textpro("https://textpro.me/create-glitch-text-effect-style-tik-tok-983.html",
        [`${topText}`], [`${bottomText}`]
        ).then(async (data) => { 
          try { 
              var img = await axios.get(data, { responseType: 'arraybuffer' })
              await message.sendMessage(Buffer.from(img.data), MessageType.image, { mimetype: Mimetype.png, caption: 'Made by WhatsAsena' })
          } catch(err) { 
              console.log(err)
          } 
    });
}));
