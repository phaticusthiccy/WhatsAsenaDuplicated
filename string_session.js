const chalk = require('chalk');
const pino = require('pino');
const { default: makeWASocket, useMultiFileAuthState, makeInMemoryStore, fetchLatestBaileysVersion, delay } = require('@whiskeysockets/baileys');
const { StringSession } = require('./whatsasena/');
const readline = require('readline-sync');
const fs = require('fs');

try {
  fs.rmSync('./whatsasena/session', { recursive: true, force: true });
  fs.rmSync('./config.env', { recursive: true, force: true });
} catch {}

let store = makeInMemoryStore({
  logger: pino().child({ level: 'silent', stream: 'store' })
});

console.log(
  `${chalk.green.bold("Whats")}${chalk.blue.bold(
    "Asena"
   )}\n${chalk.white.italic("AsenaString Code Receiver")}\n`
);

while (true) {
  console.log(chalk.yellow('[0] Cancel'));
  console.log(chalk.yellow('[1] Scan QR Code (2 devices required)'));
  console.log(chalk.yellow('[2] Pair with WhatsApp number\n'));
  let methodIndex = readline.question(chalk.blue.bold('Choose a method for string session generation: '));
  if (methodIndex == '0') {
    console.log(chalk.red.bold('Process terminated.'));
    process.exit(0);
  }
  else if (methodIndex == '1' || methodIndex == '2') {
    whatsAsena(methodIndex === '1');
    break;
  }
  else {
    console.log(chalk.red.bold('Choose a valid method, please enter 1, 2 or 0.\n'));
   }
}

try {
  fs.rmSync('./session/', { recursive: true, force: true });
} catch {}

/**
 * Initializes a WhatsApp session and generates a session string for the user.
 *
 * This function sets up a WhatsApp WebSocket connection, prints the QR code or pair code to the terminal, and sends the generated session string to the user's WhatsApp chat.
 *
 * @returns {Promise<void>} - A Promise that resolves when the session is established and the session string is sent.
 */

async function whatsAsena(qr) {
  let { version } = await fetchLatestBaileysVersion();
  let { state, saveCreds } = await useMultiFileAuthState('./session/');
  let sock = makeWASocket({
    logger: pino({ level: 'silent' }),
    printQRInTerminal: qr,
    markOnlineOnConnect: false,
    browser: ['Ubuntu', 'Chrome', '20.0.04'],
    auth: state,
    version: version,
    getMessage: async (key) => {
      let jid = jidNormalizedUser(key.remoteJid);
      let msg = await store.loadMessage(jid, key.id);
      return msg?.message || "";
    },
  });
  store.bind(sock.ev);

  if (!qr && !sock.authState.creds.registered) {
    let number = readline.question(chalk.blue.bold("Enter your WhatsApp number with country code (eg: +90xxx): "));
    try {
      await delay(3000);
      var code = await sock.requestPairingCode(number.replace(/\D/g, ''));
    } catch (e) {
      console.log(chalk.red("Please enter a valid whatsapp number with country code!"));
      process.exit(0);
    }
    console.log(chalk.green("Your WhatsApp Pairing Pode is:"));
    console.log(chalk.brightGreen.bold(code));
  }

  sock.ev.on('connection.update', async (update) => {
    let { connection } = update;
    if (connection == "connecting") {
      console.log(
        `${chalk.blue.italic("Connecting to Whatsapp... Please Wait.")}`
      );
    } else if (connection === 'open') {
      await delay(3000);
      let credentials = fs.readFileSync(
        __dirname + "/whatsasena/session/creds.json",
        "utf8"
      );
      let st = Session.createStringSession(credentials);
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
    } else if (connection === 'close') {
      await whatsAsena(qr);
    }
  });

  sock.ev.on('messages.upsert', async () => {});
  sock.ev.on('creds.update', saveCreds);
}
