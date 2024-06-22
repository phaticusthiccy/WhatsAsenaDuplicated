const Asena = require('../events');

const Language = require('../language');
const Lang = Language.getString('admin');

/**
 * Checks if the specified user is an admin in the group associated with the given message.
 *
 * @param {object} message - The message object containing the group information.
 * @param {string} [user=message.key.participant] - The user ID to check for admin status. Defaults to the participant of the message.
 * @returns {Promise<boolean>} - True if the user is an admin, false otherwise.
 */
async function checkImAdmin(message, user = message.key.participant) {
  try {
    var grup = await message.client.groupMetadata(message.jid);
    var sonuc = grup["participants"].map((member) => {
      if (
        member.id.split("@")[0] == user.split("@")[0] &&
        member.hasOwnProperty("admin") &&
        (member.admin == "superadmin" || member.admin == "admin")
      )
        return true;
      return false;
    });
    return sonuc.includes(true);
  } catch (e) {
    console.log(e);
  }
}

Asena.addCommand({ pattern: 'ban ?(.*)', fromMe: true, onlyGroup: true, desc: Lang.BAN_DESC }, (async (message, match) => {
    var admin = await checkImAdmin(message);
    if (!admin) return await message.client.sendMessage(message.jid, { text: Lang.IM_NOT_ADMIN, edit: message.key });

    if (message.reply_message) {
      await message.client.sendMessage(message.jid, { text: '@' + message.reply_message.data.participant.split('@')[0] + '```, ' + Lang.BANNED + '```', edit: message.key }, { mentions: [message.reply_message.data.participant] });
      await message.client.groupParticipantsUpdate(message.jid, [message.reply_message.data.participant], 'remove');
    } else if (message.mention.length > 0) {
      var etiketler = message.mention.map(user => '@' + user.split('@')[0]).join(',');
      await message.client.sendMessage(message.jid, { text: etiketler + '```, ' + Lang.BANNED + '```', edit: message.key }, { mentions: message.mention });
      await message.client.groupParticipantsUpdate(message.jid, message.mention, 'remove');
    } else {
      await message.client.sendMessage(message.jid, { text: Lang.GIVE_ME_USER, edit: message.key });
    }
}));

Asena.addCommand({ pattern: 'add(?: |$)(.*)', fromMe: true, onlyGroup: true, desc: Lang.ADD_DESC }, (async (message, match) => {
    var im = await checkImAdmin(message);
    if (!im) return await message.client.sendMessage(message.jid, { text: Lang.IM_NOT_ADMIN, edit: message.key });

    if (match[1] !== '') {
      await message.client.groupParticipantsUpdate(message.jid, match[1].split(' '), 'add');
      await message.client.sendMessage(message.jid, { text: '```' + user + ' ' + Lang.ADDED + '```', edit: message.key });
    } else if (message.reply_message) {
      await message.client.groupParticipantsUpdate(message.jid, [message.reply_message.data.participant], 'add');
    } else {
      return await message.client.sendMessage(message.jid, { text: Lang.GIVE_ME_USER, edit: message.key });
    }
}));

Asena.addCommand({ pattern: 'promote ?(.*)', fromMe: true, onlyGroup: true, desc: Lang.PROMOTE_DESC }, (async (message, match) => {    
    var im = await checkImAdmin(message);
    if (!im) return await message.client.sendMessage(message.jid, { text: Lang.IM_NOT_ADMIN, edit: message.key });

    if (message.reply_message) {
      var checkAlready = await checkImAdmin(message, message.reply_message.data.participant);
      if (checkAlready) {
        return await message.client.sendMessage(message.jid, { text: Lang.ALREADY_PROMOTED, edit: message.key });
      }
      await message.client.sendMessage(message.jid, { text: '@' + message.reply_message.data.participant.split('@')[0] + Lang.PROMOTED, edit: message.key }, { mentions: [message.reply_message.data.participant] });
      await message.client.groupParticipantsUpdate(message.jid, [message.reply_message.data.participant], 'promote');
    } else if (message.mention.length > 0) {
      var etiketler = '';
      message.mention.map(async (user) => {
        var checkAlready = await checkImAdmin(message, user);
        if (checkAlready) {
          return await message.client.sendMessage(message.jid, { text: Lang.ALREADY_PROMOTED, edit: message.key });
        }
        etiketler += '@' + user.split('@')[0] + ', ';
      });
      await message.client.sendMessage(message.jid, { text: etiketler + Lang.PROMOTED, edit: message.key }, { mentions: message.mention });
      await message.client.groupParticipantsUpdate(message.jid, message.mention, 'promote');
    } else {
      return await message.client.sendMessage(message.jid, { text: Lang.GIVE_ME_USER, edit: message.key });
    }
}));

Asena.addCommand({ pattern: 'demote ?(.*)', fromMe: true, onlyGroup: true, desc: Lang.DEMOTE_DESC }, (async (message, match) => {    
    var im = await checkImAdmin(message);
    if (!im) return await message.client.sendMessage(message.jid, { text: Lang.IM_NOT_ADMIN, edit: message.key });

    if (message.reply_message) {
      var checkAlready = await checkImAdmin(message, message.reply_message.data.participant);
      if (!checkAlready) {
        return await message.client.sendMessage(message.jid, { text: Lang.ALREADY_NOT_ADMIN, edit: message.key });
      }
      await message.client.sendMessage(message.jid, { text: '@' + message.reply_message.data.participant.split('@')[0] + Lang.DEMOTED, edit: message.key }, { mentions: [message.reply_message.data.participant] });
      await message.client.groupParticipantsUpdate(message.jid, [message.reply_message.data.participant], 'demote');
    } else if (message.mention.length > 0) {
      var etiketler = '';
      message.mention.map(async (user) => {
        var checkAlready = await checkImAdmin(message, user);
        if (!checkAlready) {
          return await message.client.sendMessage(message.jid, { text: Lang.ALREADY_NOT_ADMIN, edit: message.key });
        }
        etiketler += '@' + user.split('@')[0] + ',';
      });
      await message.client.sendMessage(message.jid, { text: etiketler + Lang.DEMOTED, edit: message.key }, { mentions: message.mention });
      await message.client.groupParticipantsUpdate(message.jid, [message.mention], 'demote');
    } else {
      return await message.client.sendMessage(message.jid, { text: Lang.GIVE_ME_USER, edit: message.key });
    }
}));

Asena.addCommand({ pattern: 'mute$', fromMe: true, onlyGroup: true, desc: Lang.MUTE_DESC }, (async (message, match) => {  
    var im = await checkImAdmin(message);
    if (!im) return await message.client.sendMessage(message.jid, { text: Lang.IM_NOT_ADMIN, edit: message.key });
    await message.client.groupSettingUpdate(message.jid, 'announcement');
    await message.client.sendMessage(message.jid, { text: Lang.MUTED, edit: message.key });
    var units = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
    var ms = (time) => parseInt(time.slice(0, -1)) * units[time.slice(-1)];

    if (match[1].match(/^\d+[smhd]$/)) {
      await new Promise(r => setTimeout(r, ms(match[1])));
      await message.client.groupSettingUpdate(message.jid, 'not_announcement');
      await message.client.sendMessage(message.jid, { text: Lang.UNMUTED, edit: message.key });
    }
}));

Asena.addCommand({ pattern: 'unmute$', fromMe: true, onlyGroup: true, desc: Lang.UNMUTE_DESC }, (async (message, match) => {    
    var im = await checkImAdmin(message);
    if (!im) return await message.client.sendMessage(message.jid, { text: Lang.IM_NOT_ADMIN, edit: message.key });
    await message.client.groupSettingUpdate(message.jid, 'not_announcement');
    await message.client.sendMessage(message.jid, { text: Lang.UNMUTED, edit: message.key });
}));

Asena.addCommand({ pattern: 'invite$', fromMe: true, onlyGroup: true, desc: Lang.INVITE_DESC }, (async (message, match) => {    
    var im = await checkImAdmin(message);
    if (!im) return await message.client.sendMessage(message.jid, { text: Lang.IM_NOT_ADMIN, edit: message.key });
    var invite = await message.client.groupInviteCode(message.jid);
    await message.client.sendMessage(message.jid, { text: Lang.INVITE + ' https://chat.whatsapp.com/' + invite, edit: message.key });
}));

module.exports = {
    checkImAdmin: checkImAdmin
};
