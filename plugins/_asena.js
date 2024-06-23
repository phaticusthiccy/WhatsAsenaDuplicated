const Asena = require("../events");
const Config = require("../config");

const Language = require("../language");
const Lang = Language.getString("_asena");

Asena.addCommand(
  { pattern: "asena ?(.*)", fromMe: true, dontAddCommandList: true },
  async (message, match_c) => {
    let CMD_HELP = "";

    Asena.commands = Asena.commands.sort((a, b) => {
      let aPattern = a.pattern.toString().match(/(\W*)([A-Za-züşiğ öç1234567890]*)/)[2].trim();
      let bPattern = b.pattern.toString().match(/(\W*)([A-Za-züşiğ öç1234567890]*)/)[2].trim();
      return aPattern.localeCompare(bPattern);
    });

    Asena.commands.map(async (command) => {
      if (match_c[1] !== "") {
        let match1 = command.pattern
          .toString()
          .match(/(\W*)([A-Za-zğüşıiöç1234567890 ]*)/);
        let mmatch1 = command.pattern
          .toString()
          .match(/(\W*)([A-Za-züşiğ öç1234567890]*)/)[2]
          .trim();
        if (mmatch1.toLowerCase() == match_c[1].toLowerCase()) {
          let HANDLER = "";

          if (/\[(\W*)\]/.test(Config.HANDLERS)) {
            HANDLER = Config.HANDLERS.match(/\[(\W*)\]/)[1][0];
          } else {
            HANDLER = ".";
          }
          if (command.desc == "" && command.usage !== "") {
            CMD_HELP +=
              "*🛠 " +
              Lang.COMMAND +
              ":* ```" +
              (match1.length >= 3 ? HANDLER + mmatch1 : command.pattern) +
              "```\n" +
              "*⌨️ " +
              Lang.EXAMPLE +
              ":* ```" +
              command.usage +
              "```\n\n";
          }
          if (command.desc !== "" && command.usage == "") {
            CMD_HELP +=
              "*🛠 " +
              Lang.COMMAND +
              ":* ```" +
              (match1.length >= 3 ? HANDLER + mmatch1 : command.pattern) +
              "```\n" +
              "*💬 " +
              Lang.DESC +
              ":* ```" +
              command.desc +
              "``` \n\n";
          }
          if (command.desc !== "" && command.usage !== "") {
            CMD_HELP +=
              "*🛠 " +
              Lang.COMMAND +
              ":* ```" +
              (match1.length >= 3 ? HANDLER + mmatch1 : command.pattern) +
              "```\n" +
              "*💬 " +
              Lang.DESC +
              ":* ```" +
              command.desc +
              "```\n" +
              "*⌨️ " +
              Lang.EXAMPLE +
              ":* ```" +
              command.usage +
              "```\n\n";
          }
          if (command.desc == "" && command.usage == "") {
            CMD_HELP +=
              "*🛠 " +
              Lang.COMMAND +
              ":* ```" +
              (match1.length >= 3 ? HANDLER + mmatch1 : command.pattern) +
              "```\n\n";
          }
          return;
        }
      } else {
        if (command.dontAddCommandList || command.pattern === undefined) return;
        try {
          let match = command.pattern
            .toString()
            .match(/(\W*)([A-Za-zğüşıiöç1234567890 ]*)/);
          let mmatch = command.pattern
            .toString()
            .match(/(\W*)([A-Za-züşiğ öç1234567890]*)/)[2]
            .trim();
        } catch {
          let match = [command.pattern];
        }

        var HANDLER = "";

        if (/\[(\W*)\]/.test(Config.HANDLERS)) {
          HANDLER = Config.HANDLERS.match(/\[(\W*)\]/)[1][0];
        } else {
          HANDLER = ".";
        }
        if (command.desc == "" && command.usage !== "") {
          CMD_HELP +=
            "*🛠 " +
            Lang.COMMAND +
            ":* ```" +
            (match.length >= 3 ? HANDLER + mmatch : command.pattern) +
            "```\n" +
            "*⌨️ " +
            Lang.EXAMPLE +
            ":* ```" +
            command.usage +
            "```\n\n";
        }
        if (command.desc !== "" && command.usage == "") {
          CMD_HELP +=
            "*🛠 " +
            Lang.COMMAND +
            ":* ```" +
            (match.length >= 3 ? HANDLER + mmatch : command.pattern) +
            "```\n" +
            "*💬 " +
            Lang.DESC +
            ":* ```" +
            command.desc +
            "``` \n\n";
        }
        if (command.desc !== "" && command.usage !== "") {
          CMD_HELP +=
            "*🛠 " +
            Lang.COMMAND +
            ":* ```" +
            (match.length >= 3 ? HANDLER + mmatch : command.pattern) +
            "```\n" +
            "*💬 " +
            Lang.DESC +
            ":* ```" +
            command.desc +
            "```\n" +
            "*⌨️ " +
            Lang.EXAMPLE +
            ":* ```" +
            command.usage +
            "```\n\n";
        }
        if (command.desc == "" && command.usage == "") {
          CMD_HELP +=
            "*🛠 " +
            Lang.COMMAND +
            ":* ```" +
            (match.length >= 3 ? HANDLER + mmatch : command.pattern) +
            "```\n\n";
        }
      }
    });

    return await message.client.sendMessage(message.jid, {
      text: CMD_HELP.trim(),
      edit: message.key,
    });
  }
);
