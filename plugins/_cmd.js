/*
# Copyright (C) 2020 MuhammedKpln.
#
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

// It converts wrong commands to true

const Asena = require('../events');
const Language = require('../language')
const { infoMessage, errorMessage } = require('../helpers')
const Lang = Language.getString('aiscanner')

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue),
                            costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}

function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}


Asena.addCommand({ pattern: '.*', fromMe: true }, async (message, match) => {

    const filteredCommandList = Asena.commands.filter(v => {
        try {

            if (v.pattern !== undefined) {
                const inputCommand = match.input.replace('.', '')
                const potentialCommand = v.pattern.toString()
                    .replace('/^[.!;]', '')
                    .replace('/', '')
                    .replace('/?', '')
                    .replace('?', '')
                    .replace(new RegExp(/\([^]*\)/g), '')


                if (inputCommand === potentialCommand) {
                    return new Array(v)
                } else {
                    console.log('Command does not exists.')
                }
            }
        } catch (err) {
            console.log(err)
        }

    })

    if (filteredCommandList.length < 1) {

        const similarities = []

        await message.sendMessage(infoMessage(Lang.SEARCHING));

        Asena.commands.forEach(async (command) => {

            try {
                if (command.pattern !== undefined) {
                    const inputCommand = match.input.replace('.', '')
                    const potentialCommand = command.pattern.toString()
                        .replace('/^[.!;]', '')
                        .replace('/', '')
                        .replace('?(.*)', '')
                        .replace('(?: |$)(.*)', '')
                    const c = similarity(inputCommand, potentialCommand)

                    if (c > 0.50) {
                        similarities.push(potentialCommand)
                    }
                }
            } catch (err) {
                console.log(err)
            }
        });

        if (similarities.length > 0) {
            await message.sendMessage(Lang.FOUND + similarities.join('\n') + '```');
        } else {
            await message.sendMessage(errorMessage(Lang.NOT_FOUND));
        }
    }
})
