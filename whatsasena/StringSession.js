/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const fs = require('fs');
const path = require('path');

class StringSession {
    constructor() {
    }

    deCrypt(string = undefined) {
        if ('ASENA_SESSION' in process.env && string === undefined) {
            string = process.env.SESSION;
        } else if (string !== undefined) {
            if (fs.existsSync(string)) {
                string = fs.readFileSync(string, {encoding:'utf8', flag:'r'});
            }
        }
        
        var split = string.split(';;;');
        if (split.length >= 2) {
            string = JSON.parse(Buffer.from(split[split.length - 1], 'base64').toString('utf-8'));
        }

        var creds = path.join(__dirname, 'session', 'creds.json');
        fs.writeFileSync(creds, string);
        var exists = fs.existsSync(creds);

        return exists;
    }

    createStringSession(dict) {
        return 'ASENA;;;' + Buffer.from(JSON.stringify(dict)).toString('base64');
    }
}

module.exports = StringSession;
