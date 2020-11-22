/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const speedTest = require('speedtest-net');

// https://github.com/ddsol/speedtest.net/blob/master/bin/index.js#L86
function speedText(speed) {
    let bits = speed * 8;
    const units = ['', 'K', 'M', 'G', 'T'];
    const places = [0, 1, 2, 3, 3];
    let unit = 0;
    while (bits >= 2000 && unit < 4) {
      unit++;
      bits /= 1000;
    }

    return `${bits.toFixed(places[unit])} ${units[unit]}bps`;
}
Asena.addCommand({pattern: 'speedtest', fromMe: true, deleteCommand: false, desc: 'İndirme ve Yükleme hızını ölçer.'}, (async (message, match) => {
    var msg = await message.reply('```Hız testi yapılıyor...```');
    await message.delete();
    var st = await speedTest({acceptLicense: true, acceptGdpr: true});
    
    await message.sendMessage('*Hız testi yapıldı!*\n\n' + 
    '*ISP:* ```' + st.isp + '```\n' +
    '*Ping:* ```' + st.ping.latency + 'ms```\n' +
    '*Yükleme:* ```' + speedText(st.upload.bandwidth) + '```\n' +
    '*İndirme:* ```' + speedText(st.download.bandwidth) + '```\n'
    );

    await msg.delete();
}));

Asena.addCommand({pattern: 'ping', fromMe: true, deleteCommand: false, desc: 'Pinginizi ölçer.'}, (async (message, match) => {
  var start = new Date().getTime();
  var msg = await message.reply('```Ping!```');
  var end = new Date().getTime();

  await msg.delete();
  await message.sendMessage('*Pong!*\n```' + (end - start) + 'ms```');
}));
