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
const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, makeInMemoryStore, jidNormalizedUser, delay } = require('@whiskeysockets/baileys');
const { Message, StringSession, Image, Video } = require('./whatsasena/');
const { GreetingsDB, getMessage } = require("./plugins/sql/greetings");
const pino = require('pino');
const plugindb = require('./plugins/sql/plugin');
const got = require('got');

/**
 * Checks if the required configuration files exist, and exits the process if they do not.
 * This code is executed when the bot is first started, to ensure the necessary setup has been completed.
 * If the `config.env` file or the `whatsasena/session` directory do not exist, it logs an error message
 * and instructs the user to run `node qr.js` to configure the bot.
 */
if (!fs.existsSync("./config.env") || !fs.existsSync("./whatsasena/session")) {
  console.log(
    chalk.red.bold("WhatsAsena"),
    chalk.white.bold("is not configured yet!")
  );
  console.log(
    chalk.white.italic("Please run"),
    chalk.white.bold("node qr.js"),
    chalk.white.italic("to configure WhatsAsena!")
  );
  process.exit();
}

fs.readdirSync('./plugins/sql/').forEach(plugin => {
    if (path.extname(plugin).toLowerCase() == '.js') {
        require('./plugins/sql/' + plugin);
    }
});

const Language = require('./language');
const Lang = Language.getString('_asena');

/**
 * Extends the String prototype to provide a simple string formatting function.
 *
 * This function allows you to insert values into a string by using curly braces `{}` as placeholders.
 * The values to be inserted are passed as arguments to the function.
 *
 * Example:
 *
 * const message = 'Hello, {0}! You are {1} years old.'.format('John', 30);
 * console.log(message); // Output: Hello, John! You are 30 years old.
 *
 */
String.prototype.format = function () {
  var i = 0,
    args = arguments;
  return this.replace(/{}/g, function () {
    return typeof args[i] != "undefined" ? args[i++] : "";
  });
};

/**
 * Converts a string to a new string with the first character of each sentence capitalized.
 *
 * @param {string} str - The input string to be converted.
 * @returns {string} The new string with the first character of each sentence capitalized.
 */
String.prototype.uppercaseSentences = function() {
  const sentences = this.split(/[.!?][\s\n]+/);
  const uppercasedSentences = sentences.map(sentence => {
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
  });
  return uppercasedSentences.join('');
};


/**
 * Removes all occurrences of the specified elements from the array.
 * @param {...*} elements - The elements to remove from the array.
 * @returns {Array} The modified array.
 */
Array.prototype.remove = function () {
  var what,
    a = arguments,
    L = a.length,
    ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

var level = config.DEBUG == true ? 'debug' : 'silent';
var store = makeInMemoryStore({
  logger: pino().child({ level: level, stream: 'store' })
});

var first_run = true;

/**
 * Initializes the WhatsAsena bot and sets up the necessary event handlers.
 *
 * This function is responsible for:
 * - Creating a new WhatsApp session using the provided session string or generating a new one.
 * - Fetching the latest version of the Baileys library.
 * - Initializing the multi-file auth state.
 * - Creating a WhatsApp socket connection with the specified configuration.
 * - Binding the socket events to the appropriate handlers.
 * - Synchronizing the database.
 * - Handling connection updates, including reconnection on connection close.
 * - Installing and loading external plugins.
 * - Sending a "WhatsAsena is active now..." message on first run.
 * - Handling incoming messages, including processing commands and responding to events like group joins/leaves.
 *
 * @async
 * @function whatsAsena
 * @returns {Promise<void>} - A Promise that resolves when the bot is fully initialized.
*/
async function whatsAsena() {
  var Session = new StringSession();
  var session = Session.deCrypt(config.SESSION);
  var { version } = await fetchLatestBaileysVersion();
  var { state, saveCreds } = await useMultiFileAuthState(
    __dirname + "/whatsasena/session/"
  );
  const sock = makeWASocket({
    logger: pino({ level: level }),
    printQRInTerminal: !session,
    markOnlineOnConnect: false,
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    auth: state,
    version: version,
    patchMessageBeforeSending: (message) => {
      let requiresPatch = !!(
        message.buttonsMessage ||
        message.listMessage ||
        message.templateMessage
      );
      if (requiresPatch) {
        message = {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2,
              },
              ...message,
            },
          },
        };
      }
      return message;
    },
    getMessage: async (key) => {
      var jid = jidNormalizedUser(key.remoteJid);
      var msg = await store.loadMessage(jid, key.id);
      return msg?.message || "";
    },
  });
  store.bind(sock.ev);
  await config.DATABASE.sync();

  sock.ev.on("creds.update", saveCreds);
  sock.ev.on("connection.update", async (update) => {
    if (
      Object.keys(update).length == 1 &&
      (Object.keys(update)[0] == "isOnline" ||
        Object.keys(update)[0] == "receivedPendingNotifications")
    ) return;

    console.log(
      `${chalk.green.bold("Whats")}${chalk.blue.bold(
        "Asena"
      )}\n${chalk.white.bold("Version:")} ${chalk.red.bold(
        config.VERSION
      )}\n\n${chalk.blue.italic("ℹ️ Connecting to WhatsApp... Please Wait.")}`
    );
    if (update.connection == "close") {
      console.log(chalk.red.bold("Connection Closed: Reconnecting..."));
      return whatsAsena();
    }

    console.log(chalk.blueBright.italic("⬇️ Installing External Plugins..."));

    var plugins = await plugindb.PluginDB.findAll();
    plugins.map(async (plugin) => {
      try {
        if (!fs.existsSync("./plugins/" + plugin.dataValues.name + ".js")) {
          //console.log(plugin.dataValues.name);
          var response = await got(plugin.dataValues.url);
          if (response.statusCode == 200) {
            fs.writeFileSync(
              "./plugins/" + plugin.dataValues.name + ".js",
              response.body
            );
            require("./plugins/" + plugin.dataValues.name + ".js");
          }
        }
      } catch (e) {
        console.log(
          chalk.yellow.bold("❌ Failed to load: " + plugin.dataValues.name)
        );
        console.log(e);
      }
    });

    console.log(chalk.blueBright.italic("⬇️ Installing Plugins..."));

    fs.readdirSync("./plugins").forEach((plugin) => {
      if (path.extname(plugin).toLowerCase() == ".js") {
        require("./plugins/" + plugin);
      }
    });

    console.log(chalk.green.bold("✅ Plugins Installed!"));

    if (first_run) {
      first_run = false;
      await sock.sendMessage(sock.user.id, {
        text: "🐺 WhatsAsena is active now...",
      });
    }
  });

  sock.ev.on("messages.upsert", async (msg) => {
    msg = msg.messages[0];
    if (msg.key && msg.key.remoteJid == "status@broadcast") return;
    if (config.NO_ONLINE) {
      await sock.sendPresenceUpdate("unavailable", msg.key.remoteJid);
    }

    if (msg.messageStubType === 32 || msg.messageStubType === 28) {
      var gb = await getMessage(msg.key.remoteJid, "goodbye");
      if (gb !== false) {
        await sock.sendMessage(msg.key.remoteJid, {
          text: gb.message,
        });
      }
      return;
    } else if (msg.messageStubType === 27 || msg.messageStubType === 31) {
      var gb = await getMessage(msg.key.remoteJid);
      if (gb !== false) {
        await sock.sendMessage(msg.key.remoteJid, {
          text: gb.message,
        });
      }
      return;
    }

    if (config.BLOCKCHAT !== false) {
      var chats = config.BLOCKCHAT.split(",");
      if (
        msg.key.remoteJid.endsWith("@g.us")
          ? chats.includes(msg.key.remoteJid.split("@")[0])
          : chats.includes(
              msg.participant
                ? msg.participant.split("@")[0]
                : msg.key.remoteJid.split("@")[0]
            )
      )
        return;
    }

    events.commands.map(async (command) => {
      if (
        msg.message &&
        msg.message.imageMessage &&
        msg.message.imageMessage.caption
      ) {
        var text_msg = msg.message.imageMessage.caption;
      } else if (
        msg.message &&
        msg.message.videoMessage &&
        msg.message.videoMessage.caption
      ) {
        var text_msg = msg.message.videoMessage.caption;
      } else if (msg.message) {
        var text_msg =
          msg.message.extendedTextMessage === null
            ? msg.message.conversation
            : msg.message.extendedTextMessage.text;
      } else {
        var text_msg = undefined;
      }

      if (
        (command.on !== undefined &&
          (command.on === "image" || command.on === "photo") &&
          msg.message &&
          msg.message.imageMessage !== null &&
          (command.pattern === undefined ||
            (command.pattern !== undefined &&
              command.pattern.test(text_msg)))) ||
        (command.pattern !== undefined && command.pattern.test(text_msg)) ||
        (command.on !== undefined && command.on === "text" && text_msg) ||
        // Video
        (command.on !== undefined &&
          command.on === "video" &&
          msg.message &&
          msg.message.videoMessage !== null &&
          (command.pattern === undefined ||
            (command.pattern !== undefined && command.pattern.test(text_msg))))
      ) {
        var sendMsg = false;
        var chat = msg.key.remoteJid;

        if (
          (config.SUDO !== false &&
            msg.key.fromMe === false &&
            command.fromMe === true &&
            (msg.participant && config.SUDO.includes(",")
              ? config.SUDO.split(",").includes(msg.participant.split("@")[0])
              : msg.participant.split("@")[0] == config.SUDO ||
                config.SUDO.includes(",")
              ? config.SUDO.split(",").includes(msg.key.remoteJid.split("@")[0])
              : msg.key.remoteJid.split("@")[0] == config.SUDO)) ||
          command.fromMe === msg.key.fromMe ||
          (command.fromMe === false && !msg.key.fromMe)
        ) {
          if (!command.onlyPm === chat.endsWith("@g.us")) sendMsg = true;
          else if (command.onlyGroup === chat.endsWith("@g.us")) sendMsg = true;

          if (command.onlyPm == true && chat.endsWith("@g.us") && !command.hasOwnProperty("deleted")) {
            return await sock.sendMessage(msg.key.remoteJid, {
              text: Lang.ONLY_IN_PM,
              edit: msg.key
            });
          }
          if (command.onlyGroup == true && chat.endsWith("@s.whatsapp.net") && !command.hasOwnProperty("deleted")) {
            return await sock.sendMessage(msg.key.remoteJid, {
              text: Lang.ONLY_IN_GROUPS,
              edit: msg.key
            });
          }
        }

        if (sendMsg) {
          if (config.SEND_READ && command.on === undefined) {
            await sock.readMessages(msg.key);
          }

          var match = text_msg.match(command.pattern);
          if (
            command.on !== undefined &&
            (command.on === "image" || command.on === "photo") &&
            msg.message.imageMessage !== null
          ) {
            var whats = new Image(sock, msg);
          } else if (
            command.on !== undefined &&
            command.on === "video" &&
            msg.message.videoMessage !== null
          ) {
            var whats = new Video(sock, msg);
          } else {
            var whats = new Message(sock, msg);
          }

          try {
            if (!command.hasOwnProperty("deleted")) {
              try {
                await sock.sendMessage(msg.key.remoteJid, { text: Lang.LOADING_EDIT, edit: msg.key });
              } catch {}
              await command.function(whats, match);
            }
          } catch (error) {
            if (config.NOLOG) return;
            await sock.sendMessage(sock.user.id, {
              text:
                "*-- ERROR REPORT [WHATSASENA] --*" +
                "\n*WhatsAsena an error has occurred!*" +
                "\n_This error log may include your number or the number of an opponent. Please be careful with it!_" +
                "\n_This message should have gone to your number (saved messages)._\n\n" +
                "*Error:* ```" +
                error +
                "```\n\n",
            });
          }
        }
      }
    });
  });
}

whatsAsena();
