/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const config = require('./config');
var Commands = [];

String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
      return typeof args[i] != 'undefined' ? args[i++] : '';
    });
};

/**
 * Adds a new command to the list of available commands.
 *
 * @param {Object} info - An object containing information about the command.
 * @param {boolean} [info.fromMe=true] - Whether the command can only be executed by the bot.
 * @param {boolean} [info.onlyGroup=false] - Whether the command can only be executed in a group chat.
 * @param {boolean} [info.onlyPm=false] - Whether the command can only be executed in a private chat.
 * @param {string} [info.desc=''] - A description of the command, which can use placeholders from the `config.HANDLERS` object.
 * @param {string} [info.usage=''] - Usage information for the command, which can use placeholders from the `config.HANDLERS[2]` object.
 * @param {boolean} [info.dontAddCommandList=false] - Whether the command should not be added to the command list.
 * @param {function} func - The function to be executed when the command is triggered.
 * @returns {Object} - The information object for the added command.
 */
function addCommand(info, func) {
  let types = ["photo", "image", "text", "message"];

  let infos = {
    fromMe: info["fromMe"] === undefined ? true : info["fromMe"],
    onlyGroup: info["onlyGroup"] === undefined ? false : info["onlyGroup"],
    onlyPm: info["onlyPm"] === undefined ? false : info["onlyPm"],
    desc:
      info["desc"] === undefined ? "" : info["desc"].format(config.HANDLERS),
    usage:
      info["usage"] === undefined
        ? ""
        : info["usage"].format(config.HANDLERS[2]),
    dontAddCommandList:
      info["dontAddCommandList"] === undefined
        ? false
        : info["dontAddCommandList"],
    function: func,
  };

  if (info["on"] === undefined && info["pattern"] === undefined) {
    infos.on = "message";
    infos.fromMe = false;
  } else if (info["on"] !== undefined && types.includes(info["on"])) {
    infos.on = info["on"];

    if (info["pattern"] !== undefined) {
      infos.pattern = new RegExp(
        "^" +
          (info["handler"] === undefined || info["handler"] === true
            ? config.HANDLERS
            : "") +
          info.pattern,
        info["flags"] !== undefined ? info["flags"] : ""
      );
    }
  } else {
    infos.pattern = new RegExp(
      "^" +
        (info["handler"] === undefined || info["handler"] === true
          ? config.HANDLERS
          : "") +
        info.pattern,
      info["flags"] !== undefined ? info["flags"] : ""
    );
  }

  Commands.push(infos);
  return infos;
}

/**
 * Deletes a command from the `Commands` array based on the provided pattern.
 *
 * @param {string} pattern_toDel - The pattern of the command to be deleted.
 * @returns {void}
 */
function deleteCommand(pattern_toDel) {
  let fnd = Commands.findIndex(
    (obj) =>
      obj.pattern
        .toString()
        .match(/(\W*)([A-Za-züşiğ öç1234567890]*)/)[2]
        .trim() == pattern_toDel
  );
  Commands[fnd].deleted = true;
  Commands[fnd].dontAddCommandList = true;
  return;
}
module.exports = {
    addCommand: addCommand,
    commands: Commands,
    deleteCommand: deleteCommand
}
