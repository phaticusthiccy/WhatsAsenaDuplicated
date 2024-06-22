/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const Base = require('./Base');
const ReplyMessage = require('./ReplyMessage');

class Message extends Base {
    constructor(client, data) {
        super(client);
        if (data) this._patch(data);
    }

    _patch(data) {
        this.id = data.key.id === undefined ? undefined : data.key.id;
        this.jid = data.key.remoteJid;
        this.fromMe = data.key.fromMe;
        this.message = data.message.extendedTextMessage === null ? data.message.conversation : data.message.extendedTextMessage.text;
        this.unreadCount = data.unreadCount;
        this.timestamp = typeof(data.messageTimestamp) === 'object' ? data.messageTimestamp.low : data.messageTimestamp;
        this.key = data.key;
        this.data = data;
        
        if (data.message.hasOwnProperty('extendedTextMessage') &&
                data.message.extendedTextMessage.hasOwnProperty('contextInfo') === true && 
                data.message.extendedTextMessage.contextInfo.hasOwnProperty('quotedMessage')) { 
            this.reply_message = new ReplyMessage(this.client, data.message.extendedTextMessage.contextInfo); } else {
                this.reply_message = false;
            }
        
        if (data.message.hasOwnProperty('extendedTextMessage') &&
        data.message.extendedTextMessage.hasOwnProperty('contextInfo') === true && 
        data.message.extendedTextMessage.contextInfo.hasOwnProperty('mentionedJid')) {
            this.mention = data.message.extendedTextMessage.contextInfo.mentionedJid;
        } else {
            this.mention = false;
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

    async sendMessage(jid, content, options) {
        return await this.client.sendMessage(jid, content, options)
    }

    async sendTyping() {
        return await this.client.sendPresenceUpdate('composing', this.jid);
    }

    async sendRead(keys) {
        return await this.client.readMessages(keys || [this.key]);
    }

    async editMessage(jid, content, options) {
        return await this.client.e(jid, content, options)
    }
};

module.exports = Message;
