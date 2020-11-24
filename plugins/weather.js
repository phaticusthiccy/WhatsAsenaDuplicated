/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const got = require('got');

Asena.addCommand({pattern: 'weather ?(.*)', desc: 'Hava durumu getirir.', usage: '.weather Bakü'}, async (message, match) => {
	if (match[1] === '') return await message.reply('*Lütfen bir konum yazın!*\n*Örnek:* ```.weather Bakü```');
	const url = `http://api.openweathermap.org/data/2.5/weather?q=${match[1]}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=tr`;
	try {
		const response = await got(url);
	} catch {
		return await message.reply('```Böyle bir şehir bulamadım. 😖```');
	}
	
	const json = JSON.parse(response.body);

	if (response.statusCode === 200) {
		return await message.reply('*📍 Konum:* ```' + match[1] + '```\n\n' +
		'*☀ Sıcaklık:* ```' + json.main.temp_max + '°```\n' + 
		'*ℹ Açıklama:* ```' + json.weather[0].description + '```\n' +
		'*☀ Nem:* ```%' + json.main.humidity + '```\n' + 
		'*💨 Rüzgar Hızı:* ```' + json.wind.speed + 'm/s```\n' + 
		'*☁ Bulut:* ```%' + json.clouds.all + '```\n');
	} else {
		return await message.reply('```Böyle bir şehir bulamadım. 😖```');
	}
});