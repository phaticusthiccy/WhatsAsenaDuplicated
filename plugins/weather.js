const Asena = require('../events');
const got = require('got');
const Config = require('../config');

const Language = require('../language');
const Lang = Language.getString('weather');

Asena.addCommand({ pattern: 'weather ?(.*)', fromMe: true, desc: Lang.WEATHER_DESC }, (async (message, match) => {
  if (match[1] === '') return await message.client.sendMessage(message.jid, { text: Lang.NEED_LOCATION, edit: message.key });
	var url = `http://api.openweathermap.org/data/2.5/weather?q=${match[1]}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=tr`;
	try {
	  	var response = await got(url);

		var json = JSON.parse(response.body);
		if (response.statusCode === 200) {
			return await message.client.sendMessage(message.jid, {
				text: '*📍 ' + Lang.LOCATION +':* ```' + json.name + '```\n\n' +
						'*☀ ' + Lang.TEMP +':* ```' + json.main.temp_max + '°```\n' + 
						'*♨ ' + Lang.FEELS_LIKE + ':* ```' + json.main.feels_like + '°```\n' +
						'*ℹ ' + Lang.DESC +':* ```' + json.weather[0].description.uppercaseSentences() + '```\n' +
						'*💧 ' + Lang.HUMI +':* ```%' + json.main.humidity + '```\n' + 
						'*💨 ' + Lang.WIND +':* ```' + json.wind.speed + 'm/s```\n' + 
						'*☁ ' + Lang.CLOUD +':* ```%' + json.clouds.all + '```\n',
				edit: message.key 
			});
    	}
  	} catch {
		return await message.client.sendMessage(message.jid, { text: Lang.NOT_FOUND, edit: message.key });
  	}
}));
