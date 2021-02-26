/* 
Heroku plugin for WhatsAsena - W4RR10R
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
WhatsAsena - Yusuf Usta
*/

const Asena = require('../events');
const Config = require('../config');
const Heroku = require('heroku-client');
const {secondsToHms} = require('./afk');
const got = require('got');
const Language = require('../language');
const Lang = Language.getString('heroku');

const heroku = new Heroku({
    token: Config.HEROKU.API_KEY
});


let baseURI = '/apps/' + Config.HEROKU.APP_NAME;

Asena.addCommand({pattern: 'restart', fromMe: true, desc: Lang.RESTART_DESC}, (async (message, match) => {

    await message.client.sendMessage(message.jid,Lang.RESTART_MSG, MessageType.text);
    console.log(baseURI);
    await heroku.delete(baseURI + '/dynos').catch(async (error) => {
        await message.client.sendMessage(message.jid,error.message, MessageType.text);
    });
}));

Asena.addCommand({pattern: 'shutdown', fromMe: true, desc: Lang.SHUTDOWN_DESC}, (async(message, match) => {

    await heroku.get(baseURI + '/formation').then(async (formation) => {
        forID = formation[0].id;
        await message.client.sendMessage(message.jid,Lang.SHUTDOWN_MSG, MessageType.text);
        await heroku.patch(baseURI + '/formation/' + forID, {
            body: {
                quantity: 0
            }
        });
    }).catch(async (err) => {
        await message.client.sendMessage(message.jid,error.message, MessageType.text);
    });
}));

Asena.addCommand({pattern: 'dyno', fromMe: true, desc: Lang.DYNO_DESC}, (async (message, match) => {

    heroku.get('/account').then(async (account) => {
        // have encountered some issues while calling this API via heroku-client
        // so let's do it manually
        url = "https://api.heroku.com/accounts/" + account.id + "/actions/get-quota"
        headers = {
            "User-Agent": "Chrome/80.0.3987.149 Mobile Safari/537.36",
            "Authorization": "Bearer " + Config.HEROKU.API_KEY,
            "Accept": "application/vnd.heroku+json; version=3.account-quotas",
        }
        await got(url, {headers: headers}).then(async (res) => {
           const resp = JSON.parse(res.body);
           total_quota = Math.floor(resp.account_quota);
           quota_used = Math.floor(resp.quota_used);         
           percentage = Math.round((quota_used / total_quota) * 100);
           remaining = total_quota - quota_used;
           await message.client.sendMessage(
                message.jid,
                Lang.DYNO_TOTAL + ": ```{}```\n\n".format(secondsToHms(total_quota))  + 
                Lang.DYNO_USED + ": ```{}```\n".format(secondsToHms(quota_used)) +  
                Lang.PERCENTAGE + ": ```{}```\n\n".format(percentage) +
                Lang.DYNO_LEFT + ": ```{}```\n".format(secondsToHms(remaining)),
                MessageType.text
           );
        }).catch(async (err) => {
            await message.client.sendMessage(message.jid,err.message, MessageType.text);     
        });        
    });
}));

Asena.addCommand({pattern: 'setvar ?(.*)', fromMe: true, desc: Lang.SETVAR_DESC}, (async(message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.KEY_VAL_MISSING, MessageType.text);
    if ((varKey = match[1].split(':')[0]) && (varValue = match[1].split(':')[1])) {
        await heroku.patch(baseURI + '/config-vars', {
            body: {
                [varKey]: varValue
            }
        }).then(async (app) => {
            await message.client.sendMessage(message.jid,Lang.SET_SUCCESS.format(varKey, varValue), MessageType.text);
        });
    } else {
        await message.client.sendMessage(message.jid,Lang.INVALID, MessageType.text);
    }
}));


Asena.addCommand({pattern: 'delvar ?(.*)', fromMe: true, desc: Lang.DELVAR_DESC}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.KEY_VAL_MISSING, MessageType.text);
    await heroku.get(baseURI + '/config-vars').then(async (vars) => {
        key = match[1].trim();
        for (vr in vars) {
            if (key == vr) {
                await heroku.patch(baseURI + '/config-vars', {
                    body: {
                        [key]: null
                    }
                });
                return await message.client.sendMessage(message.jid,Lang.DEL_SUCCESS.format(key), MessageType.text);
            }
        }
        await message.client.sendMessage(message.jid,Lang.NOT_FOUND, MessageType.text);
    }).catch(async (error) => {
        await message.client.sendMessage(message.jid,error.message, MessageType.text);
    });

}));

Asena.addCommand({pattern: 'getvar ?(.*)', fromMe: true, desc: Lang.GETVAR_DESC}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.KEY_VAL_MISSING, MessageType.text);
    await heroku.get(baseURI + '/config-vars').then(async (vars) => {
        for (vr in vars) {
            if (match[1].trim() == vr) return await message.sendMessage("```{} - {}```".format(vr, vars[vr]));
        }
        await message.client.sendMessage(message.jid,Lang.NOT_FOUND, MessageType.text);
    }).catch(async (error) => {
        await message.client.sendMessage(message.jid,error.message, MessageType.text);
    });
}));
