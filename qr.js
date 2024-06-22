const chalk = require('chalk');
const pino = require('pino');
const { default: makeWASocket, useMultiFileAuthState, makeInMemoryStore, fetchLatestBaileysVersion, delay } = require('@whiskeysockets/baileys');
const { StringSession } = require('./whatsasena/');
const fs = require('fs');

try {
  fs.rmSync('./whatsasena/session', { recursive: true, force: true });
  fs.rmSync('./config.env', { recursive: true, force: true });
} catch {}

let store = makeInMemoryStore({
  logger: pino().child({ level: 'silent', stream: 'store' })
});

/**
 * Initializes a WhatsApp session and generates a session string for the user.
 *
 * This function sets up a WhatsApp WebSocket connection, prints the QR code to the terminal, and sends the generated session string to the user's WhatsApp chat.
 *
 * @returns {Promise<void>} - A Promise that resolves when the session is established and the session string is sent.
 */
async function whatsAsena() {
  const Session = new StringSession();
  let { version } = await fetchLatestBaileysVersion();
  let { state, saveCreds } = await useMultiFileAuthState(
    "./whatsasena/session/"
  );
  let sock = makeWASocket({
    logger: pino({ level: "silent" }),
    printQRInTerminal: true,
    markOnlineOnConnect: false,
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    auth: state,
    version: version,
    getMessage: async (key) => {
      let jid = jidNormalizedUser(key.remoteJid);
      let msg = await store.loadMessage(jid, key.id);
      return msg?.message || "";
    },
  });
  store.bind(sock.ev);

  console.log(
    `${chalk.green.bold("Whats")}${chalk.blue.bold(
      "Asena"
    )}\n${chalk.white.italic("AsenaString Code Receiver")}\n`
  );

  sock.ev.on("connection.update", async (update) => {
    var { connection } = update;

    if (connection == "connecting") {
      console.log(
        `${chalk.blue.italic("Connecting to Whatsapp... Please Wait.")}`
      );
    } else if (connection == "open") {
      await delay(3000);
      var credentials = fs.readFileSync(
        __dirname + "/whatsasena/session/creds.json",
        "utf8"
      );
      var st = Session.createStringSession(credentials);
      console.log(chalk.green.bold("Asena String Code: "), st);

      if (!fs.existsSync("config.env")) {
        fs.writeFileSync("config.env", `ASENA_SESSION="${st}"`);
      }
      await sock.sendMessage(sock.user.id, {
        text: st,
      });
      await sock.sendMessage(sock.user.id, {
        text: "*Don't share this code with anyone!*",
      });

      console.log(
        chalk.blue.bold(
          "If you are installing locally, you can start the bot with node bot.js."
        )
      );
      process.exit(1);
    } else if (connection == "close") {
      whatsAsena();
    }
  });

  sock.ev.on("messages.upsert", async () => {});
  sock.ev.on("creds.update", saveCreds);
}

whatsAsena();
