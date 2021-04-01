/*
# Copyright (C) 2020 MuhammedKpln.
# edited by Vai838

# WhatsAsena is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# WhatsAsena is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.
#

*/

const Asena = require('../events')
const { MessageType } = require('@adiwajshing/baileys')
const axios = require('axios')
const cn = require('../config');

const Language = require('../language')
const { errorMessage, infoMessage } = require('../helpers')
const Lang = Language.getString('instagram')
const Tlang = Language.getString('tiktok')

if (cn.WORKTYPE == 'private') {

    Asena.addCommand({ pattern: 'insta ?(.*)', fromMe: true, usage: Lang.USAGE, desc: Lang.DESC }, async (message, match) => {

        const userName = match[1]

        if (!userName) return await message.sendMessage(errorMessage(Lang.NEED_WORD))

        await message.sendMessage(infoMessage(Lang.LOADING))

        await axios
          .get(`https://videfikri.com/api/igstalk/?username=${userName}`)
          .then(async (response) => {
            const {
              profile_hd,
              username,
              bio,
              followers,
              following,
              full_name,
              is_private,
            } = response.data.result

            const profileBuffer = await axios.get(profile_hd, {
              responseType: 'arraybuffer',
            })

            const msg = `
            *${Lang.NAME}*: ${full_name}
            *${Lang.USERNAME}*: ${username}
            *${Lang.BIO}*: ${bio}
            *${Lang.FOLLOWERS}*: ${followers}
            *${Lang.FOLLOWS}*: ${following}
            *${Lang.ACCOUNT}*: ${is_private ? Lang.HIDDEN : Lang.PUBLIC}`

            await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
              caption: msg,
            })
          })
          .catch(
            async (err) => await message.sendMessage(errorMessage(Lang.NOT_FOUND + userName)),
          )
      },
    )

    Asena.addCommand({ pattern: 'tiktok ?(.*)', fromMe: true, desc: Tlang.TİKTOK }, async (message, match) => {

        const userName = match[1]

        if (!userName) return await message.client.sendMessage(message.jid, Tlang.NEED, MessageType.text)

        await message.client.sendMessage(message.jid, Tlang.DOWN, MessageType.text)

        await axios
          .get(`https://api.xteam.xyz/dl/tiktok?url=${userName}&APIKEY=ab9942f95c09ca89`)
          .then(async (response) => {
            const {
              server_1,
            } = response.data

            const profileBuffer = await axios.get(server_1, {
              responseType: 'arraybuffer',
            })

            await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {
              caption: 'Made by WhatsAsena',
            })
          })
          .catch(
            async (err) => await message.client.sendMessage(message.jid, Tlang.NOT + userName, MessageType.text),
          )
      },
    )
}
else if (cn.WORKTYPE == 'public') {

    Asena.addCommand({ pattern: 'insta ?(.*)', fromMe: false, usage: Lang.USAGE, desc: Lang.DESC }, async (message, match) => {

        const userName = match[1]

        if (!userName) return await message.sendMessage(errorMessage(Lang.NEED_WORD))

        await message.sendMessage(infoMessage(Lang.LOADING))

        await axios
          .get(`https://videfikri.com/api/igstalk/?username=${userName}`)
          .then(async (response) => {
            const {
              profile_hd,
              username,
              bio,
              followers,
              following,
              full_name,
              is_private,
            } = response.data.result

            const profileBuffer = await axios.get(profile_hd, {
              responseType: 'arraybuffer',
            })

            const msg = `
            *${Lang.NAME}*: ${full_name}
            *${Lang.USERNAME}*: ${username}
            *${Lang.BIO}*: ${bio}
            *${Lang.FOLLOWERS}*: ${followers}
            *${Lang.FOLLOWS}*: ${following}
            *${Lang.ACCOUNT}*: ${is_private ? Lang.HIDDEN : Lang.PUBLIC}`

            await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
              caption: msg,
            })
          })
          .catch(
            async (err) => await message.sendMessage(errorMessage(Lang.NOT_FOUND + userName)),
          )
      },
    )

    Asena.addCommand({ pattern: 'tiktok ?(.*)', fromMe: false, desc: Tlang.TİKTOK }, async (message, match) => {

        const userName = match[1]

        if (!userName) return await message.client.sendMessage(message.jid, Tlang.NEED, MessageType.text)

        await message.client.sendMessage(message.jid, Tlang.DOWN, MessageType.text)

        await axios
          .get(`https://api.xteam.xyz/dl/tiktok?url=${userName}&APIKEY=ab9942f95c09ca89`)
          .then(async (response) => {
            const {
              server_1,
            } = response.data

            const profileBuffer = await axios.get(server_1, {
              responseType: 'arraybuffer',
            })

            await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {
              caption: 'Made by WhatsAsena',
            })
          })
          .catch(
            async (err) => await message.client.sendMessage(message.jid, Tlang.NOT + userName, MessageType.text),
          )
      },
    )
}
