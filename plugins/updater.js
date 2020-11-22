/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const simpleGit = require('simple-git');
const git = simpleGit();
const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const Config = require('../config');
const exec = require('child_process').exec;
const Heroku = require('heroku-client')
const heroku = new Heroku({ token: Config.HEROKU.API_KEY })

Asena.addCommand({pattern: 'update$', fromMe: true, desc: 'Güncelleme denetler.'}, (async (message, match) => {
    await git.fetch();
    var commits = await git.log([Config.BRANCH + '..origin/' + Config.BRANCH]);
    if (commits.total === 0) {
        await message.sendMessage(
            '*Botunuz tamamen güncel!*', MessageType.text
        );    
    } else {
        var degisiklikler = '*Bot için yeni güncelleme mevcut!*\n\nDeğişiklikler:\n```';
        commits['all'].map(
            (commit) => {
                degisiklikler += '🔹 [' + commit.date.substring(0, 10) + ']: ' + commit.message + ' <' + commit.author_name + '>\n';
            }
        );
        
        await message.sendMessage(
            degisiklikler + '```', MessageType.text
        ); 
    }
}));

Asena.addCommand({pattern: 'update now$', fromMe: true, desc: 'Güncelleme yapar.', dontAddCommandList: true}, (async (message, match) => {
    await git.fetch();
    var commits = await git.log([Config.BRANCH + '..origin/' + Config.BRANCH]);
    if (commits.total === 0) {
        return await message.sendMessage(
            '*Botunuz tamamen güncel!*', MessageType.text
        );    
    } else {
        var guncelleme = await message.reply('_Güncelleme yapılıyor..._');
        if (Config.HEROKU.HEROKU) {
            git.pull((async (err, update) => {
                if(update && update.summary.changes) {
                    await message.sendMessage('*✅ Güncelleme başarılı oldu!*\n_Herokuya yükleniyor_', MessageType.text);
                } else if (err) {
                    await message.sendMessage('*❌ Güncelleme başarısız oldu!*\n*Hata:* ```' + err + '```', MessageType.text);
                }
            }));

            var app = await heroku.get('/apps/' + Config.HEROKU.APP_NAME)
            var git_url = app.git_url.replace(
                "https://", "https://api:" + Config.HEROKU.API_KEY + "@"
            )

            await git.addRemote('heroku', git_url);
            await git.push('heroku', Config.BRANCH);
            
            await message.sendMessage('*✅ Güncelleme başarılı oldu!*', MessageType.text);
        } else {
            git.pull((async (err, update) => {
                if(update && update.summary.changes) {
                    await message.sendMessage('*✅ Güncelleme başarılı oldu!*\n_Değişiklikler yeniden başlatmanız gerekmektedir._', MessageType.text);
                    exec('npm install').stderr.pipe(process.stderr);
                } else if (err) {
                    await message.sendMessage('*❌ Güncelleme başarısız oldu!*\n*Hata:* ```' + err + '```', MessageType.text);
                }
            }));
            await guncelleme.delete();
        }
    }
}));