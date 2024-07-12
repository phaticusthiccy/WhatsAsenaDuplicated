/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const Base = require('./Base');
const Image = require('./Image');

class ReplyMessage extends Base {
    constructor(client, data) {
        super(client);
        if (data) this._patch(data);
    }

    _patch(data) {
        this.id = data.stanzaId;
        this.jid = data.participant;
        if (data.quotedMessage && data.quotedMessage.imageMessage) {
            this.message = data.quotedMessage.imageMessage.caption === null ? data.message.imageMessage.caption : '';
            this.caption = data.quotedMessage.imageMessage.caption === null ? data.message.imageMessage.caption : '';
            this.url = data.quotedMessage.imageMessage.url;
            this.mimetype = data.quotedMessage.imageMessage.mimetype;
            this.height = data.quotedMessage.imageMessage.height;
            this.width = data.quotedMessage.imageMessage.width;
            this.mediaKey = data.quotedMessage.imageMessage.mediaKey;
            this.image = true;
            this.video = false;
        } else if (data.quotedMessage && data.quotedMessage.videoMessage) {
            this.message = data.quotedMessage.videoMessage.caption === null ? data.message.videoMessage.caption : '';
            this.caption = data.quotedMessage.videoMessage.caption === null ? data.message.videoMessage.caption : '';
            this.url = data.quotedMessage.videoMessage.url;
            this.mimetype = data.quotedMessage.videoMessage.mimetype;
            this.height = data.quotedMessage.videoMessage.height;
            this.width = data.quotedMessage.videoMessage.width;
            this.mediaKey = data.quotedMessage.videoMessage.mediaKey;
            this.video = true;
        } else if (data.quotedMessage && data.quotedMessage.conversation) {
            this.message = data.quotedMessage.conversation;
            this.text = data.quotedMessage.conversation;
            this.image = false;
            this.video = false;
        }

        this.key;
        this.data = data;
                
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

    async sendMessage(jid, content, options) {
        return await this.client.sendMessage(jid, content, options)
    }

    async sendTyping() {
        return await this.client.sendPresenceUpdate('composing', this.jid);
    }

    async sendRead(keys) {
        return await this.client.readMessages(keys || [this.key]);
    }

    async download(location = this.id) {
        if (this.image) {
            await this.client.downloadAndSaveMediaMessage(this.data.quotedMessage.imageMessage, location);
            return this.id + '.' + this.mimetype.split('/')[1];    
        } else {
            return false;
        }
    }
};

module.exports = ReplyMessage;
