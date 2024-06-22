/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const Base = require('./Base');
const Message = require('./Message');
const ReplyMessage = require('./ReplyMessage');

class Video extends Base {
    constructor(client, data) {
        super(client);
        if (data) this._patch(data);
    }

    _patch(data) {
        this.id = data.key.id === undefined ? undefined : data.key.id;
        this.jid = data.key.remoteJid;
        this.fromMe = data.key.fromMe;
        this.caption = data.message.videoMessage.caption === null ? data.message.videoMessage.caption : '';
        this.url = data.message.videoMessage.url;
        this.timestamp = typeof(data.messageTimestamp) === 'object' ? data.messageTimestamp.low : data.messageTimestamp;
        this.mimetype = data.message.videoMessage.mimetype;
        this.height = data.message.videoMessage.height;
        this.width = data.message.videoMessage.width;
        this.mediaKey = data.message.videoMessage.mediaKey;
        this.key = data.key;
        this.data = data;
        
        if (data.message.videoMessage.hasOwnProperty('contextInfo') && data.message.contextInfo.quotedMessage) { 
            this.reply_message = new ReplyMessage(this.client, data.message.videoMessage.contextInfo); }
        else {
            this.reply_message = false;
        }
        
        return super._patch(data);
    }

    async delete() {
        return await this.client.sendMessage(this.jid, {
          delete: this.key
        })
    }

    async reply(text) {
        var message = await this.client.sendMessage(this.jid, {
          text: text
        }, { quoted: this.id })
        return new Message(this.client, message)
    }

    async sendMessage(content, options) {
        return await this.client.sendMessage(this.jid, content, options)
    }

    async sendTyping() {
        return await this.client.sendPresenceUpdate('composing', this.jid);
    }

    async sendRead(keys) {
        return await this.client.readMessages(keys || [this.key]);
    }

    async download(location = this.id) {
        await this.client.downloadAndSaveMediaMessage(this.data, location);
        return this.id + '.' + this.mimetype.split('/')[1];
    }
};

module.exports = Video;
