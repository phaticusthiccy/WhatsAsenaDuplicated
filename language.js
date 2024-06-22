const Config = require('./config');
const fs = require('fs');
const chalk = require('chalk');

if (fs.existsSync('./language/' + Config.LANG + '.json')) {
    console.log(
        chalk.green.bold('Loading ' + Config.LANG + ' language...')
    );

    var json = JSON.parse(fs.readFileSync('./language/' + Config.LANG + '.json'));
} else {
    console.log(
        chalk.red.bold('You entered an invalid language. English language was chosen.')
    );

    var json = JSON.parse(fs.readFileSync('./language/EN.json'));
}

/**
 * Retrieves a string value from the application's string dictionary.
 * @param {string} file - The key to use for looking up the string in the dictionary.
 * @returns {string} The string value associated with the provided key.
 */
function getString(file) {
  try {
    var fileToLoad = json["STRINGS"][file];
    fileToLoad.LOADING_EDIT = "_" + json.LOADING + "_"
    return fileToLoad
  } catch {}
}

module.exports = {
    language: json,
    getString: getString
}