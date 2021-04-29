/* Copyright (C) 2021 Vai838.

Licensed under the  GPL-3.0 License;

you may not use this file except in compliance with the License.

WhatsAsenaDuplicated

*/

const Asena = require('../events');

const {MessageType} = require('@adiwajshing/baileys');

const got = require('got');

const Language = require('../language');

const Lang = Language.getString('weather');

Asena.addCommand({pattern: 'pplinspace ?(.*)', fromMe: false, desc: "Provides the name and crafts of people in space currently." }, async (message, match) => {

	if (match[1] === 'xx') return await message.reply(Lang.NEED_LOCATIONA);	const url = `http://api.open-notify.org/astros.json`;

	try {

		const response = await got(url);

		const json = JSON.parse(response.body);

		if (response.statusCode === 200) return await message.client.sendMessage(message.jid, '*🕰  ' + "Number of people in space:" +'* ```' + json.number + '```\n\n\n' +

    '*🏷️  ' + "Name:" +'* ```' + json.people[0].name + '```\n' +                                                                        

		'*🛰️ ' + "Spacecraft:" +'* ```' + json.people[0].craft + '```\n\n'+

    '*🏷️  ' + "Name:" +'* ```' + json.people[1].name + '```\n' +                                                                        

		'*🛰️ ' + "Spacecraft:" +'* ```' + json.people[1].craft + '```\n\n'+                                                                            

    '*🏷️  ' + "Name:" +'* ```' + json.people[2].name + '```\n' +                                                                        

		'*🛰️ ' + "Spacecraft:" +'* ```' + json.people[2].craft + '```\n\n'+                                                                          

    '*🏷️  ' + "Name:" +'* ```' + json.people[3].name + '```\n' +                                                                        

		'*🛰️ ' + "Spacecraft:" +'* ```' + json.people[3].craft + '```\n\n'+

    '*🏷️  ' + "Name:" +'* ```' + json.people[4].name + '```\n' +                                                                        

		'*🛰️ ' + "Spacecraft:" +'* ```' + json.people[4].craft + '```\n\n'+ 

    '*🏷️  ' + "Name:" +'* ```' + json.people[5].name + '```\n' +                                                                        

		'*🛰️ ' + "Spacecraft:" +'* ```' + json.people[5].craft + '```\n\n'+

    '*🏷️  ' + "Name:" +'* ```' + json.people[6].name + '```\n' +                                                                        

		'*🛰️ ' + "Spacecraft:" +'* ```' + json.people[6].craft + '```\n\n' , MessageType.text);

	} catch {

		return await message.client.sendMessage(message.jid, "*Error*", MessageType.text);

	}

});
