/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const { Sequelize } = require('sequelize');
const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

/**
 * Converts a string to a boolean value.
 *
 * @param {string} text - The string to be converted.
 * @param {string} [fault='true'] - The string value that represents a "true" value.
 * @returns {boolean} The boolean value represented by the input string.
 */
function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}

var DATABASE_URL = process.env.DATABASE_URL === undefined ? './whatsasena.db' : process.env.DATABASE_URL;
var DEBUG = process.env.DEBUG === undefined ? false : convertToBool(process.env.DEBUG);

module.exports = {
    VERSION: 'v1.3 Global Stable',
    CHANNEL: 'https://t.me/remasterplugin',
    SESSION: process.env.ASENA_SESSION === undefined ? '' : process.env.ASENA_SESSION,
    LANG: process.env.LANGUAGE === undefined ? 'TR' : process.env.LANGUAGE.toUpperCase(),
    NOLOG: process.env.NO_LOG === undefined ? 'false' : process.env.NO_LOG,
    HANDLERS: process.env.HANDLERS === undefined ? '^[.!;]' : process.env.HANDLERS,
    SEND_READ: process.env.SEND_READ === undefined ? false : convertToBool(process.env.SEND_READ),
    BLOCKCHAT: process.env.BLOCK_CHAT === undefined ? false : process.env.BLOCK_CHAT,
    BRANCH: 'master',
    DATABASE_URL: DATABASE_URL,
    DATABASE: DATABASE_URL === './whatsasena.db' ? new Sequelize({ dialect: "sqlite", storage: DATABASE_URL, logging: DEBUG }) : new Sequelize(DATABASE_URL, { dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }, logging: DEBUG }),
    RBG_API_KEY: process.env.REMOVE_BG_API_KEY === undefined ? false : process.env.REMOVE_BG_API_KEY,
    NO_ONLINE: process.env.NO_ONLINE === undefined ? true : convertToBool(process.env.NO_ONLINE),
    SUDO: process.env.SUDO === undefined ? false : process.env.SUDO,
    DEBUG: DEBUG
};
