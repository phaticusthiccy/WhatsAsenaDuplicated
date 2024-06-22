const Asena = require('../events');
const got = require('got');
const fs = require('fs');
const { PluginDB, installPlugin } = require('./sql/plugin');

const Language = require('../language');
const Lang = Language.getString('_plugin');

Asena.addCommand({ pattern: 'install ?(.*)', fromMe: true, desc: Lang.INSTALL_DESC, usage: '{}install https://gist.github.com/.../...' }, (async (message, match) => {

try {
  if (match[1] == '') return await message.client.sendMessage(message.jid, { text: Lang.NEED_URL + '.install https://gist.github.com/phaticusthiccy/4232b1c8c4734e1f06c3d991149c6fbd', edit: message.key });
  try {
    var url = new URL(match[1]);
  } catch {
    return await message.client.sendMessage(message.jid, { text: Lang.INVALID_URL, edit: message.key });
  }
  if (url.host === 'gist.github.com') {
    url.host = 'gist.githubusercontent.com';
    url = url.toString() + '/raw';
  } else {
    url = url.toString();
  }
  var response = await got(url);
  if (response.statusCode == 200) {
    var plugin_name = response.body.match(/addCommand\({.*pattern: ["'](.*)["'].*}/);
    if (plugin_name.length >= 1) {
      plugin_name = "__" + plugin_name[1];
    } else {
      plugin_name = "__" + Math.random().toString(36).substring(8);
    }

    plugin_name = plugin_name.split(" ")[0]
    fs.writeFileSync("./plugins/" + plugin_name + '.js', response.body);
    try {
      require("./" + plugin_name);
    } catch (e) {
      fs.unlinkSync("./plugins/" + plugin_name + '.js');
      return await message.client.sendMessage(message.jid, { text: Lang.INVALID_PLUGIN + ' ```' + e + '```', edit: message.key });
    }
    var plugins = (await PluginDB.findAll()).map((plugin) => plugin.dataValues.name);
    if (plugins.includes(plugin_name)) {
      return await message.client.sendMessage(message.jid, { text: Lang.DUPLICATE, edit: message.key });
    } 
    await installPlugin(url, plugin_name);
    return await message.client.sendMessage(message.jid, { text: Lang.INSTALLED, edit: message.key });
  } else {
    return await message.client.sendMessage(message.jid, { text: Lang.INVALID_URL, edit: message.key });
  }
} catch (e) {
  return console.log(e)
}
}));

Asena.addCommand({ pattern: 'plugin$', fromMe: true, desc: Lang.PLUGIN_DESC }, (async (message, match) => {
  var mesaj = Lang.INSTALLED_FROM_REMOTE;
  var plugins = await PluginDB.findAll();
  if (plugins.length < 1) {
    return await message.client.sendMessage(message.jid, { text: Lang.NO_PLUGIN, edit: message.key });
  } else {
    plugins.map(
       (plugin) => {
         mesaj += '```' + plugin.dataValues.name.replace("__", "") + '```: ' + plugin.dataValues.url + '\n\n';
       }
    );
    return await message.client.sendMessage(message.jid, { text: mesaj, edit: message.key });
  }
}));

Asena.addCommand({ pattern: 'remove(?: |$)(.*)', fromMe: true, desc: Lang.REMOVE_DESC, usage: '{}remove plugin_name' }, (async (message, match) => {
  if (match[1] === '') return await message.client.sendMessage(message.jid, { text: Lang.NEED_PLUGIN, edit: message.key });
  match[1] = match[1].startsWith('__') ? match[1] : '__' + match[1];
  try {
    var plugin = await PluginDB.findAll({
      where: {
        name: match[1]
      }
    });
    if (plugin.length < 1) {
      return await message.client.sendMessage(message.jid, { text: Lang.NOT_FOUND_PLUGIN, edit: message.key });
    } else {
      await plugin[0].destroy();
      delete require.cache[require.resolve("./" + match[1] + '.js')]
      fs.unlinkSync("./plugins/" + match[1] + '.js');
      Asena.deleteCommand(match[1].replace('__', ''));
      await message.client.sendMessage(message.jid, { text: Lang.DELETED, edit: message.key });
      return;
    }
  } catch (e) { 
    console.log(e)
    return await message.client.sendMessage(message.jid, { text: Lang.NOT_FOUND_PLUGIN, edit: message.key });
  }
}));

// ! This command exlusively for developers!
Asena.addCommand({pattern: "var ?(.*)", fromMe: true, dontAddCommandList: true }, (async (message, match) => {
  var data = await eval(match[1]);
  return console.log(data);
}))