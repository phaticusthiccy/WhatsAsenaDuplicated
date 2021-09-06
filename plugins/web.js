/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const TinyURL = require('tinyurl');
const Config = require('../config');
const WhatsAsenaStack = require('whatsasena-npm')
const os = require("os");
const fs = require('fs');
const Language = require('../language');
const exec = require('child_process').exec;
const Lang = Language.getString('web');
const SLang = Language.getString('webss');
/*
var LANG = { RES: '' }
if (Config.LANG == 'TR') LANG.RES == '*Komut Bulunamadı!*\n*Benzer Komut:*'
if (Config.LANG == 'EN') LANG.RES == '*Command not Found!*\n*Similar Command:*'
if (Config.LANG == 'AZ') LANG.RES == '*Komanda tapılmadı!*\n*Oxşar əmr:*'
if (Config.LANG == 'PT') LANG.RES == '*Comando não encontrado!*\n*Comando Similar:*'
if (Config.LANG == 'RU') LANG.RES == '*Команда не найдена!*\n*Аналогичная команда:*'
if (Config.LANG == 'ID') LANG.RES == '*Perintah tidak ditemukan!*\n*Perintah serupa:*'
if (Config.LANG == 'ES') LANG.RES == '*¡Comando no encontrado!*\n*Comando similar:*'
if (Config.LANG == 'ML') LANG.RES == '*കമാൻഡ് കണ്ടില്ല!*\n*സമാന കമാൻഡ്:*'
if (Config.LANG == 'HI') LANG.RES == '*यह कमांड नहीं मिला!*\n*समान कमांड:*'

function editDistance(comm, wr) {
  comm = comm.toLowerCase();
  wr = wr.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= comm.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= wr.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (comm.charAt(i - 1) != wr.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[wr.length] = lastValue;
  }
  return costs[wr.length];
}

function similarity(comm, wr) {
  var longer = comm;
  var shorter = wr;
  if (comm.length < wr.length) {
    longer = wr;
    shorter = comm;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

Asena.addCommand({pattern: '?(.*)', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {
    var HANDLER = '';
    if (/\[(\W*)\]/.test(Config.HANDLERS)) {
        HANDLER = Config.HANDLERS.match(/\[(\W*)\]/)[1][0];
    } else {
        HANDLER = '.';
    }
    const id = message.jid
    var usm = HANDLER + match[1]
    var xmedia = await similarity('xmedia',HANDLER + match[1])
    var install = await similarity('install',HANDLER + match[1])
    var plugin = await similarity('plugin',HANDLER + match[1])
    var remove = await similarity('remove',HANDLER + match[1])
    // var ban = await similarity('ban',HANDLER + match[1])
    // var add = await similarity('add',HANDLER + match[1])
    var promote = await similarity('promote',HANDLER + match[1])
    var demote = await similarity('demote',HANDLER + match[1])
    // var mute = await similarity('mute',HANDLER + match[1])
    // var unmute = await similarity('unmute',HANDLER + match[1])
    var invite = await similarity('invite',HANDLER + match[1])
    // var afk = await similarity('afk',HANDLER + match[1])
    var carbon = await similarity('carbon',HANDLER + match[1])
    var mp4audio = await similarity('mp4audio',HANDLER + match[1])
    var imagesticker = await similarity('imagesticker',HANDLER + match[1])
    var deepai = await similarity('deepai',HANDLER + match[1])
    var term = await similarity('term',HANDLER + match[1])
    var ffmpeg = await similarity('ffmpeg',HANDLER + match[1])
    var filter = await similarity('filter',HANDLER + match[1])
    // var stop = await similarity('stop',HANDLER + match[1])
    var welcome = await similarity('welcome',HANDLER + match[1])
    var goodbye = await similarity('goodbye',HANDLER + match[1])
    var help = await similarity('help',HANDLER + match[1])
    var degis = await similarity('degis',HANDLER + match[1])
    var restart = await similarity('restart',HANDLER + match[1])
    var shutdown = await similarity('shutdown',HANDLER + match[1])
    var dyno = await similarity('dyno',HANDLER + match[1])
    var setvar = await similarity('setvar',HANDLER + match[1])
    var delvar = await similarity('delvar',HANDLER + match[1])
    var getvar = await similarity('getvar',HANDLER + match[1])
    var locate = await similarity('locate',HANDLER + match[1])
    // var log = await similarity('log',HANDLER + match[1])
    var meme = await similarity('meme',HANDLER + match[1])
    var neko = await similarity('neko',HANDLER + match[1])
    var notes = await similarity('notes',HANDLER + match[1])
    // var save = await similarity('save',HANDLER + match[1])
    var deleteNotes = await similarity('deleteNotes',HANDLER + match[1])
    // var ocr = await similarity('ocr',HANDLER + match[1])
    var kickme = await similarity('kickme',HANDLER + match[1])
    // var pp = await similarity('pp',HANDLER + match[1])
    // var block = await similarity('block',HANDLER + match[1])
    // var unblock = await similarity('unblock',HANDLER + match[1])
    var jid = await similarity('jid',HANDLER + match[1])
    var removebg = await similarity('removebg',HANDLER + match[1])
    var report = await similarity('report',HANDLER + match[1])
    var scam = await similarity('scam',HANDLER + match[1])
    var scan = await similarity('scan',HANDLER + match[1])
    var trt = await similarity('trt',HANDLER + match[1])
    var currency = await similarity('currency',HANDLER + match[1])
    var tts = await similarity('tts',HANDLER + match[1])
    
    var song = await similarity('song',HANDLER + match[1])
    var video = await similarity('video',HANDLER + match[1])
    // var yt = await similarity('yt',HANDLER + match[1])
    var wiki = await similarity('wiki',HANDLER + match[1])
    // var img = await similarity('img',HANDLER + match[1])
    var github = await similarity('github',HANDLER + match[1])
    var lyric = await similarity('lyric',HANDLER + match[1])
    var covid = await similarity('covid',HANDLER + match[1])
    // var ss = await similarity('ss',HANDLER + match[1])
    var insta = await similarity('insta',HANDLER + match[1])
    var animesay = await similarity('animesay',HANDLER + match[1])
    var changesay = await similarity('changesay',HANDLER + match[1])
    var trumpsay = await similarity('trumpsay',HANDLER + match[1])
    var audiospam = await similarity('audio spam',HANDLER + match[1])
    var fotospam = await similarity('foto spam',HANDLER + match[1])
    var stickerspam = await similarity('sticker spam',HANDLER + match[1])
    var vidspam = await similarity('vid spam',HANDLER + match[1])
    var killspam = await similarity('killspam',HANDLER + match[1])
    
    var spam = await similarity('spam',HANDLER + match[1])
    var sticker = await similarity('sticker',HANDLER + match[1])
    var alive = await similarity('alive',usm)
    var sysd = await similarity('sysd',HANDLER + match[1])
    var tagadmin = await similarity('tagadmin',HANDLER + match[1])
    var tagall = await similarity('tagall',HANDLER + match[1])
    var tblend = await similarity('tblend',HANDLER + match[1])
    // var ttp = await similarity('ttp',HANDLER + match[1])
    // var attp = await similarity('attp',HANDLER + match[1])
    var glowttp = await similarity('glowttp',HANDLER + match[1])
    var unvoice = await similarity('unvoice',HANDLER + match[1])
    // var update = await similarity('update',HANDLER + match[1])
    // var updatenow = await similarity('update now',HANDLER + match[1])
    var voicy = await similarity('voicy',HANDLER + match[1])
    var wallpaper = await similarity('wallpaper',HANDLER + match[1])
    var weather = await similarity('weather',HANDLER + match[1])
    var speedtest = await similarity('speedtest',HANDLER + match[1])
    var ping = await similarity('ping',HANDLER + match[1])
    var short = await similarity('short',HANDLER + match[1])
    var calc = await similarity('calc',HANDLER + match[1])
    var whois = await similarity('whois',HANDLER + match[1])
    var mp4enhance = await similarity('mp4enhance',HANDLER + match[1])
    var interp = await similarity('interp',HANDLER + match[1])
    var mp4slowmo = await similarity('mp4slowmo',HANDLER + match[1])
    var x4mp4 = await similarity('x4mp4',HANDLER + match[1])
    var x2mp4 = await similarity('x2mp4',HANDLER + match[1])
    var gif = await similarity('gif',HANDLER + match[1])
    var agif = await similarity('agif',HANDLER + match[1])
    var mp4blur = await similarity('mp4blur',HANDLER + match[1])
    var mp4stab = await similarity('mp4stab',HANDLER + match[1])
    var mp4rainbow = await similarity('mp4rainbow',HANDLER + match[1])
    var mp4color = await similarity('mp4color',HANDLER + match[1])
    var mp4art = await similarity('mp4art',HANDLER + match[1])
    var mp4negative = await similarity('mp4negative',HANDLER + match[1])
    var mp4vintage = await similarity('mp4vintage',HANDLER + match[1])
    var mp4bw = await similarity('mp4bw',HANDLER + match[1])
    var mp4reverse = await similarity('mp4reverse',HANDLER + match[1])
    var mp4edge = await similarity('mp4enge',HANDLER + match[1])
    var mp4image = await similarity('mp4image',HANDLER + match[1])
    var spectrum = await similarity('spectrum',HANDLER + match[1])
    var waves = await similarity('waves',HANDLER + match[1])
    var frequency = await similarity('frequency',HANDLER + match[1])
    var avec = await similarity('avec',HANDLER + match[1])
    var volumeaudio = await similarity('volumeaudio',HANDLER + match[1])
    var cqtaudio = await similarity('cqtaudio',HANDLER + match[1])
    var mp3eq = await similarity('mp3eq',HANDLER + match[1])
    var mp3crusher = await similarity('mp3crusher',HANDLER + match[1])
    var mp3reverse = await similarity('mp3reverse',HANDLER + match[1])
    var mp3pitch = await similarity('mp3pitch',HANDLER + match[1])
    var mp3low = await similarity('mp3low',HANDLER + match[1])
    var x2mp3 = await similarity('x2mp3',HANDLER + match[1])
    var mp3volume = await similarity('mp3volume',HANDLER + match[1])
    var bwimage = await similarity('bwimage',HANDLER + match[1])
    var vintageimage = await similarity('vintageimage',HANDLER + match[1])
    var edgeimage = await similarity('edgeimage',HANDLER + match[1])
    var enhanceimage = await similarity('enhanceimage',HANDLER + match[1])
    var blurimage = await similarity('blurimage',HANDLER + match[1])
    var grenimage = await similarity('grenimage',HANDLER + match[1])
    var negativeimage = await similarity('negativeimage',HANDLER + match[1])
    var rainbowimage = await similarity('rainbowimage',HANDLER + match[1])
    var colorimage = await similarity('colorimage',HANDLER + match[1])
    var artimage = await similarity('artimage',HANDLER + match[1])
    var moodai = await similarity('moodai',HANDLER + match[1])
    var colorai = await similarity('colorai',HANDLER + match[1])
    var superai = await similarity('superai',HANDLER + match[1])
    var waifuai = await similarity('waifuai',HANDLER + match[1])
    var dreamai = await similarity('dreamai',HANDLER + match[1])
    var neuraltalkai = await similarity('neuraltalkai',HANDLER + match[1])
    var ttiai = await similarity('ttiai',HANDLER + match[1])
    var toonai = await similarity('toonai',HANDLER + match[1])
    var textai = await similarity('textai',HANDLER + match[1])
    var nudityai = await similarity('nudityai',HANDLER + match[1])
    var ganstyle = await similarity('ganstyle',HANDLER + match[1])  
    
    if (message.message.startsWith(HANDLER)) {  
        if (xmedia > 0.6 && !match[1].includes('xmedia')) { return await message.client.sendMessage(id,LANG.RES + ' ```$xmedia```', MessageType.text) }
        // else if (install > 0.6 && !match[1].includes('install')) { return await message.client.sendMessage(id,LANG.RES + ' ```$install```', MessageType.text) }
        else if (plugin > 0.6 && !match[1].includes('plugin')) { return await message.client.sendMessage(id,LANG.RES + ' ```$plugin```', MessageType.text) }
        else if (remove > 0.6 && !match[1].includes('remove')) { return await message.client.sendMessage(id,LANG.RES + ' ```$remove```', MessageType.text) }
        // else if (ban > 0.6 && !match[1].includes('ban')) { return await message.client.sendMessage(id,LANG.RES + ' ```$ban```', MessageType.text) }
        // else if (add > 0.6 && !match[1].includes('add')) { return await message.client.sendMessage(id,LANG.RES + ' ```$add```', MessageType.text) }
        else if (promote > 0.6 && !match[1].includes('promote')) { return await message.client.sendMessage(id,LANG.RES + ' ```$promote```', MessageType.text) }
        else if (demote> 0.6 && !match[1].includes('demote')) { return await message.client.sendMessage(id,LANG.RES + ' ```$demote```', MessageType.text) }
        // else if (mute > 0.6 && !match[1].includes('mute')) { return await message.client.sendMessage(id,LANG.RES + ' ```$mute```', MessageType.text) }
        // else if (unmute > 0.6 && !match[1].includes('unmute')) { return await message.client.sendMessage(id,LANG.RES + ' ```$unmute```', MessageType.text) }
        else if (invite > 0.6 && !match[1].includes('invite')) { return await message.client.sendMessage(id,LANG.RES + ' ```$invite```', MessageType.text) }
        // else if (afk > 0.6 && !match[1].includes('afk')) { return await message.client.sendMessage(id,LANG.RES + ' ```$afk```', MessageType.text) }
        else if (carbon > 0.6 && !match[1].includes('carbon')) { return await message.client.sendMessage(id,LANG.RES + ' ```$carbon```', MessageType.text) }
        else if (mp4audio > 0.6 && !match[1].includes('mp4audio')) { return await message.client.sendMessage(id,LANG.RES + ' ```$mp4audio```', MessageType.text) }
        else if (deepai > 0.6 && !match[1].includes('deepai')) { return await message.client.sendMessage(id,LANG.RES + ' ```$deepai```', MessageType.text) }
        else if (term > 0.6 && !match[1].includes('term')) { return await message.client.sendMessage(id,LANG.RES + ' ```$term```', MessageType.text) }
        else if (ffmpeg > 0.6 && !match[1].includes('ffmpeg')) { return await message.client.sendMessage(id,LANG.RES + ' ```$ffmpeg```', MessageType.text) }
        else if (filter > 0.6 && !match[1].includes('filter')) { return await message.client.sendMessage(id,LANG.RES + ' ```$filter```', MessageType.text) }
        // else if (stop > 0.6 && !match[1].includes('stop')) { return await message.client.sendMessage(id,LANG.RES + ' ```$stop```', MessageType.text) }
        else if (welcome > 0.6 && !match[1].includes('welcome')) { return await message.client.sendMessage(id,LANG.RES + ' ```$welcome```', MessageType.text) }
        else if (goodbye > 0.6 && !match[1].includes('goodbye')) { return await message.client.sendMessage(id,LANG.RES + ' ```$goodbye```', MessageType.text) }
        else if (help> 0.6 && !match[1].includes('help')) { return await message.client.sendMessage(id,LANG.RES + ' ```$help```', MessageType.text) }
        else if (degis > 0.6 && !match[1].includes('degis')) { return await message.client.sendMessage(id,LANG.RES + ' ```$degis```', MessageType.text) }
        else if (restart > 0.6 && !match[1].includes('restart')) { return await message.client.sendMessage(id,LANG.RES + ' ```$restart```', MessageType.text) }
        else if (shutdown > 0.6 && !match[1].includes('shutdown')) { return await message.client.sendMessage(id,LANG.RES + ' ```$shutdown```', MessageType.text) }
        else if (dyno> 0.6 && !match[1].includes('dyno')) { return await message.client.sendMessage(id,LANG.RES + ' ```$dyno```', MessageType.text) }
        else if (setvar > 0.6 && !match[1].includes('setvar')) { return await message.client.sendMessage(id,LANG.RES + ' ```$setvar```', MessageType.text) }
        else if (delvar > 0.6 && !match[1].includes('delvar')) { return await message.client.sendMessage(id,LANG.RES + ' ```$delvar```', MessageType.text) }
        else if (getvar > 0.6 && !match[1].includes('getvar')) { return await message.client.sendMessage(id,LANG.RES + ' ```$getvar```', MessageType.text) }
        
        else if (locate > 0.6 && !match[1].includes('locate')) { return await message.client.sendMessage(id,LANG.RES + ' ```$locate```', MessageType.text) }
        // else if (log > 0.6 && !match[1].includes('log')) { return await message.client.sendMessage(id,LANG.RES + ' ```$log```', MessageType.text) }
        else if (meme> 0.6 && !match[1].includes('meme')) { return await message.client.sendMessage(id,LANG.RES + ' ```$meme```', MessageType.text) }
        else if (neko > 0.6 && !match[1].includes('neko')) { return await message.client.sendMessage(id,LANG.RES + ' ```$neko```', MessageType.text) }
        else if (notes > 0.6 && !match[1].includes('notes')) { return await message.client.sendMessage(id,LANG.RES + ' ```$notes```', MessageType.text) }
        // else if (save > 0.6 && !match[1].includes('save')) { return await message.client.sendMessage(id,LANG.RES + ' ```$save```', MessageType.text) }
        else if (deleteNotes > 0.6 && !match[1].includes('deleteNotes')) { return await message.client.sendMessage(id,LANG.RES + ' ```$deleteNotes```', MessageType.text) }
        // else if (ocr > 0.6 && !match[1].includes('ocr')) { return await message.client.sendMessage(id,LANG.RES + ' $ocr', MessageType.text) } 
        else if (kickme > 0.6 && !match[1].includes('kickme')) { return await message.client.sendMessage(id,LANG.RES + ' $kickme', MessageType.text) }
        // else if (pp > 0.6 && !match[1].includes('pp')) { return await message.client.sendMessage(id,LANG.RES + ' $pp', MessageType.text) }
        // else if (block > 0.6 && !match[1].includes('block')) { return await message.client.sendMessage(id,LANG.RES + ' $block', MessageType.text) }
        // else if (unblock > 0.6 && !match[1].includes('unblock')) { return await message.client.sendMessage(id,LANG.RES + ' $unblock', MessageType.text) }
        else if (jid > 0.6 && !match[1].includes('jid')) { return await message.client.sendMessage(id,LANG.RES + ' $jid', MessageType.text) }
        else if (removebg > 0.6 && !match[1].includes('removebg')) { return await message.client.sendMessage(id,LANG.RES + ' $removebg', MessageType.text) }
        else if (report > 0.6 && !match[1].includes('report')) { return await message.client.sendMessage(id,LANG.RES + ' $report', MessageType.text) }
        // else if (scam > 0.6 && !match[1].includes('scam')) { return await message.client.sendMessage(id,LANG.RES + ' $scam', MessageType.text) }
        // else if (scan > 0.6 && !match[1].includes('scan')) { return await message.client.sendMessage(id,LANG.RES + ' $scan', MessageType.text) }
        // else if (trt > 0.6 && !match[1].includes('trt')) { return await message.client.sendMessage(id,LANG.RES + ' $trt', MessageType.text) }
        // else if (currency > 0.6 && !match[1].includes('currency')) { return await message.client.sendMessage(id,LANG.RES + ' $currency', MessageType.text) }
        // else if (tts > 0.6 && !match[1].includes('tts')) { return await message.client.sendMessage(id,LANG.RES + ' $tts', MessageType.text) }
        else if (song > 0.6 && !match[1].includes('song')) { return await message.client.sendMessage(id,LANG.RES + ' $song', MessageType.text) }
        else if (video > 0.6 && !match[1].includes('video')) { return await message.client.sendMessage(id,LANG.RES + ' $video', MessageType.text) }
        // else if (yt > 0.6 && !match[1].includes('yt')) { return await message.client.sendMessage(id,LANG.RES + ' $yt', MessageType.text) }
        else if (wiki > 0.6 && !match[1].includes('wiki')) { return await message.client.sendMessage(id,LANG.RES + ' $wiki', MessageType.text) }
        // else if (img > 0.6 && !match[1].includes('img')) { return await message.client.sendMessage(id,LANG.RES + ' $img', MessageType.text) }
        else if (github > 0.6 && !match[1].includes('github')) { return await message.client.sendMessage(id,LANG.RES + ' $github', MessageType.text) }
        else if (lyric > 0.6 && !match[1].includes('lyric')) { return await message.client.sendMessage(id,LANG.RES + ' $lyric', MessageType.text) }
        else if (covid > 0.6 && !match[1].includes('covid')) { return await message.client.sendMessage(id,LANG.RES + ' $covid', MessageType.text) }
        // else if (ss > 0.6 && !match[1].includes('ss')) { return await message.client.sendMessage(id,LANG.RES + ' $ss', MessageType.text) }
        else if (insta > 0.6 && !match[1].includes('insta')) { return await message.client.sendMessage(id,LANG.RES + ' $insta', MessageType.text) }
        else if (animesay > 0.6 && !match[1].includes('animesay')) { return await message.client.sendMessage(id,LANG.RES + ' $animesay', MessageType.text) }
        else if (changesay > 0.6 && !match[1].includes('changesay')) { return await message.client.sendMessage(id,LANG.RES + ' $changesay', MessageType.text) }
        else if (trumpsay > 0.6 && !match[1].includes('trumpsay')) { return await message.client.sendMessage(id,LANG.RES + ' $trumpsay', MessageType.text) }
        else if (audiospam > 0.6 && !match[1].includes('audio spam')) { return await message.client.sendMessage(id,LANG.RES + ' $audio spam', MessageType.text) }
        else if (fotospam > 0.6 && !match[1].includes('foto spam')) { return await message.client.sendMessage(id,LANG.RES + ' $foto spam', MessageType.text) }
        else if (stickerspam > 0.6 && !match[1].includes('sticker spam')) { return await message.client.sendMessage(id,LANG.RES + ' $sticker spam', MessageType.text) }
        else if (vidspam > 0.6 && !match[1].includes('vid spam')) { return await message.client.sendMessage(id,LANG.RES + ' $vid spam', MessageType.text) }
        
        else if (killspam > 0.6 && !match[1].includes('killspam')) { return await message.client.sendMessage(id,LANG.RES + ' $killspam', MessageType.text) }
        else if (spam > 0.6 && !match[1].includes('spam')) { return await message.client.sendMessage(id,LANG.RES + ' $spam', MessageType.text) }
        else if (sticker > 0.6 && !match[1].includes('sticker')) { return await message.client.sendMessage(id,LANG.RES + ' $sticker', MessageType.text) }
        else if (alive > 0.6 && !match[1].includes('alive')) { return await message.client.sendMessage(id,LANG.RES + ' $alive', MessageType.text) }
        else if (sysd > 0.6 && !match[1].includes('sysd')) { return await message.client.sendMessage(id,LANG.RES + ' $sysd', MessageType.text) }
        else if (tagadmin > 0.6 && !match[1].includes('tagadmin')) { return await message.client.sendMessage(id,LANG.RES + ' $tagadmin', MessageType.text) }
        else if (tagall > 0.6 && !match[1].includes('tagall')) { return await message.client.sendMessage(id,LANG.RES + ' $taggall', MessageType.text) }
        else if (tblend > 0.6 && !match[1].includes('tblend')) { return await message.client.sendMessage(id,LANG.RES + ' $tblend', MessageType.text) }
        // else if (ttp > 0.6 && !match[1].includes('ttp')) { return await message.client.sendMessage(id,LANG.RES + ' $ttp', MessageType.text) }
        // else if (attp > 0.6 && !match[1].includes('attp')) { return await message.client.sendMessage(id,LANG.RES + ' $attp', MessageType.text) }
        else if (glowttp > 0.6 && !match[1].includes('glowttp')) { return await message.client.sendMessage(id,LANG.RES + ' $glowttp', MessageType.text) }
        else if (unvoice > 0.6 && !match[1].includes('unvoice')) { return await message.client.sendMessage(id,LANG.RES + ' $unvoice', MessageType.text) }
        // else if (update > 0.6 && !match[1].includes('update' && !match[1].includes('update now')) { return await message.client.sendMessage(id,LANG.RES + ' $update', MessageType.text) }
        // else if (updatenow > 0.6 && !match[1].includes('update now')) { return await message.client.sendMessage(id,LANG.RES + ' $updatenow', MessageType.text) }
        else if (voicy > 0.6 && !match[1].includes('voicy')) { return await message.client.sendMessage(id,LANG.RES + ' $voicy', MessageType.text) }
        else if (wallpaper > 0.6 && !match[1].includes('wallpaper')) { return await message.client.sendMessage(id,LANG.RES + ' $wallpaper', MessageType.text) }
        else if (weather > 0.6 && !match[1].includes('weather')) { return await message.client.sendMessage(id,LANG.RES + ' $weather', MessageType.text) }
        else if (speedtest > 0.6 && !match[1].includes('speedtest')) { return await message.client.sendMessage(id,LANG.RES + ' $speedtest', MessageType.text) }
        else if (ping > 0.6 && !match[1].includes('ping')) { return await message.client.sendMessage(id,LANG.RES + ' $ping', MessageType.text) }
        else if (short > 0.6 && !match[1].includes('short')) { return await message.client.sendMessage(id,LANG.RES + ' $short', MessageType.text) }
        else if (calc > 0.6 && !match[1].includes('calc')) { return await message.client.sendMessage(id,LANG.RES + ' $calc', MessageType.text) }
        else if (whois > 0.6 && !match[1].includes('whois')) { return await message.client.sendMessage(id,LANG.RES + ' $whois', MessageType.text) }
        /* else if (mp4enhance > 0.6 && !match[1].includes('mp4enhance')) { return await message.client.sendMessage(id,LANG.RES + ' $mp4enhance', MessageType.text) }
        else if (interp > 0.6 && !match[1].includes('interp')) { return await message.client.sendMessage(id,LANG.RES + ' $img', MessageType.text) }
        else if (mp4slowmo > 0.6 && !match[1].includes('mp4slowmo')) { return await message.client.sendMessage(id,LANG.RES + ' $mp4slowmo', MessageType.text) }
        else if (x4mp4 > 0.6 && !match[1].includes('x4mp4')) { return await message.client.sendMessage(id,LANG.RES + ' $x4mp4', MessageType.text) }
        else if (x2mp4 > 0.6 && !match[1].includes('x2mp4')) { return await message.client.sendMessage(id,LANG.RES + ' $x2mp4', MessageType.text) }
        else if (gif > 0.6 && !match[1].includes('gif')) { return await message.client.sendMessage(id,LANG.RES + ' $gif', MessageType.text) }
        else if (agif > 0.6 && !match[1].includes('agif')) { return await message.client.sendMessage(id,LANG.RES + ' $agif', MessageType.text) }
        else if (mp4blur > 0.6 && !match[1].includes('mp4blur')) { return await message.client.sendMessage(id,LANG.RES + ' $mp4blur', MessageType.text) }
        else if (mp4stab > 0.6 && !match[1].includes('mp4stab')) { return await message.client.sendMessage(id,LANG.RES + ' ```$mp4stab```', MessageType.text) }
        else if (mp4rainbow > 0.6 && !match[1].includes('mp4rainbow')) { return await message.client.sendMessage(id,LANG.RES + ' ```$mp4rainbow```', MessageType.text) }
        else if (mp4color > 0.6 && !match[1].includes('mp4color')) { return await message.client.sendMessage(id,LANG.RES + ' ```$mp4color```', MessageType.text) }
        else if (mp4art > 0.6 && !match[1].includes('mp4art')) { return await message.client.sendMessage(id,LANG.RES + ' ```$mp4art```', MessageType.text) }
        else if (mp4negative > 0.6 && !match[1].includes('mp4negative')) { return await message.client.sendMessage(id,LANG.RES + ' ```$mp4negative```', MessageType.text) }
        else if (mp4vintage > 0.6 && !match[1].includes('mp4vintage')) { return await message.client.sendMessage(id,LANG.RES + ' ```$mp4vintage```', MessageType.text) }
        else if (mp4bw > 0.6 && !match[1].includes('mp4bw')) { return await message.client.sendMessage(id,LANG.RES + ' ```$mp4bw```', MessageType.text) }
        else if (mp4reverse > 0.6 && !match[1].includes('mp4reverse')) { return await message.client.sendMessage(id,LANG.RES + ' ```$mp4reverse```', MessageType.text) }
        else if (mp4edge > 0.6 && !match[1].includes('mp4edge')) { return await message.client.sendMessage(id,LANG.RES + ' ```$mp4edge```', MessageType.text) }
        else if (mp4image > 0.6 && !match[1].includes('mp4image')) { return await message.client.sendMessage(id,LANG.RES + ' ```$mp4image```', MessageType.text) }
        else if (spectrum > 0.6 && !match[1].includes('spectrum')) { return await message.client.sendMessage(id,LANG.RES + ' ```$spectrum```', MessageType.text) }
        else if (waves > 0.6 && !match[1].includes('waves')) { return await message.client.sendMessage(id,LANG.RES + ' ```$waves```', MessageType.text) }
        else if (frequency > 0.6 && !match[1].includes('frequency')) { return await message.client.sendMessage(id,LANG.RES + ' ```$frequency```', MessageType.text) }
        else if (avec > 0.6 && !match[1].includes('avec')) { return await message.client.sendMessage(id,LANG.RES + ' ```$avec```', MessageType.text) }
        else if (volumeaudio > 0.6 && !match[1].includes('volumeaudio')) { return await message.client.sendMessage(id,LANG.RES + ' ```$volumeaudio```', MessageType.text) }
        else if (cqtaudio > 0.6 && !match[1].includes('cqtaudio')) { return await message.client.sendMessage(id,LANG.RES + ' ```$cqtaudio```', MessageType.text) }
        else if (mp3eq > 0.6 && !match[1].includes('mp3eq')) { return await message.client.sendMessage(id,LANG.RES + ' ```$mp3eq```', MessageType.text) }
        else if (mp3crusher > 0.6 && !match[1].includes('mp3crusher')) { return await message.client.sendMessage(id,LANG.RES + ' ```$mp3crusher```', MessageType.text) }
        else if (mp3reverse > 0.6 && !match[1].includes('mp3reverse')) { return await message.client.sendMessage(id,LANG.RES + ' ```$mp3reverse```', MessageType.text) }
        else if (mp3pitch > 0.6 && !match[1].includes('mp3pitch')) { return await message.client.sendMessage(id,LANG.RES + ' ```$mp3pitch```', MessageType.text) }
        else if (mp3low > 0.6 && !match[1].includes('mp3low')) { return await message.client.sendMessage(id,LANG.RES + ' ```$mp3low```', MessageType.text) }
        else if (x2mp3 > 0.6 && !match[1].includes('x2mp3')) { return await message.client.sendMessage(id,LANG.RES + ' ```$x2mp3```', MessageType.text) }
        else if (mp3volume > 0.6 && !match[1].includes('mp3volume')) { return await message.client.sendMessage(id,LANG.RES + ' ```$mp3volume```', MessageType.text) }
        else if (bwimage > 0.6 && !match[1].includes('bwimage')) { return await message.client.sendMessage(id,LANG.RES + ' ```$bwimage```', MessageType.text) }
        else if (vintageimage > 0.6 && !match[1].includes('vintageimage')) { return await message.client.sendMessage(id,LANG.RES + ' ```$vintageimage```', MessageType.text) }
        else if (edgeimage > 0.6 && !match[1].includes('edgeimage')) { return await message.client.sendMessage(id,LANG.RES + ' ```$edgeimage```', MessageType.text) }
        else if (enhanceimage > 0.6 && !match[1].includes('enhanceimage')) { return await message.client.sendMessage(id,LANG.RES + ' ```$enhanceimage```', MessageType.text) }
        else if (blurimage > 0.6 && !match[1].includes('blurimage')) { return await message.client.sendMessage(id,LANG.RES + ' ```$blurimage```', MessageType.text) }
        else if (grenimage > 0.6 && !match[1].includes('grenimage')) { return await message.client.sendMessage(id,LANG.RES + ' ```$grenimage```', MessageType.text) }
        else if (negativeimage> 0.6 && !match[1].includes('negativeimage')) { return await message.client.sendMessage(id,LANG.RES + ' ```$negativeimage```', MessageType.text) }
        else if (rainbowimage > 0.6 && !match[1].includes('rainbowimage')) { return await message.client.sendMessage(id,LANG.RES + ' ```$rainbowimage```', MessageType.text) }
        else if (colorimage > 0.6 && !match[1].includes('colorimage')) { return await message.client.sendMessage(id,LANG.RES + ' ```$colorimage```', MessageType.text) }
        else if (artimage > 0.6 && !match[1].includes('artimage')) { return await message.client.sendMessage(id,LANG.RES + ' ```$artimage```', MessageType.text) }
        else if (moodai > 0.6 && !match[1].includes('moodai')) { return await message.client.sendMessage(id,LANG.RES + ' ```$moodai```', MessageType.text) }
        else if (colorai > 0.6 && !match[1].includes('colorai')) { return await message.client.sendMessage(id,LANG.RES + ' ```$colorai```', MessageType.text) }
        else if (superai > 0.6 && !match[1].includes('superai')) { return await message.client.sendMessage(id,LANG.RES + ' ```$superai```', MessageType.text) }
        else if (waifuai > 0.6 && !match[1].includes('waifuai')) { return await message.client.sendMessage(id,LANG.RES + ' ```$waifuai```', MessageType.text) }
        else if (dreamai > 0.6 && !match[1].includes('dreamai')) { return await message.client.sendMessage(id,LANG.RES + ' ```$dreamai```', MessageType.text) }
        else if (neuraltalkai > 0.6 && !match[1].includes('neuraltalkai')) { return await message.client.sendMessage(id,LANG.RES + ' ```$neuraltalkai```', MessageType.text) }
        else if (ttiai > 0.6 && !match[1].includes('ttiai')) { return await message.client.sendMessage(id,LANG.RES + ' ```$ttiai```', MessageType.text) }
        else if (toonai > 0.6 && !match[1].includes('toonai')) { return await message.client.sendMessage(id,LANG.RES + ' ```$toonai```', MessageType.text) }
        else if (textai > 0.6 && !match[1].includes('textai')) { return await message.client.sendMessage(id,LANG.RES + ' ```$textai```', MessageType.text) }
        else if (nudityai > 0.6 && !match[1].includes('nudityai')) { return await message.client.sendMessage(id,LANG.RES + ' ```$nudityai```', MessageType.text) }
        else if (ganstyle > 0.6 && !match[1].includes('ganstyle')) { return await message.client.sendMessage(id,LANG.RES + ' ```$ganstlye```', MessageType.text) }
        
    }
}));
*/

Asena.addCommand({pattern: 'speedtest ?(.*)', fromMe: true, desc: Lang.SPEEDTEST_DESC, usage: 'speedtest user // speedtest server'}, (async (message, match) => {
    if (match[1] == 'user' || match[1] == 'User') {
        
        // Preliminary Message
        var transition_message = await WhatsAsenaStack.speedtest_once(Config.LANG)

        // Ping
        var start = new Date().getTime();
        await message.client.sendMessage(message.jid, transition_message.user_msg, MessageType.text)
        var end = new Date().getTime();

        // Speedtest Modules
        var user_download = await WhatsAsenaStack.speedtest_user()
        var user_upload = await WhatsAsenaStack.uploadtest_user()
        var auth_message = await WhatsAsenaStack.speedtest_message(Config.LANG)
        var act_ping = end - start
        var realping = act_ping.toString()

        // Real Download Speed
        var realspeed_once = Number(user_download.mbps) / 8
        var realspeed = realspeed_once.toString()
        var realspeed_msg = auth_message.download_value.replace('{count}', realspeed)

        // Real Upload Speed
        var realupload_once = Number(user_upload.mbps) / 8
        var realupload = realupload_once.toString()
        var realupload_msg = auth_message.download_value.replace('{count}', realupload)

        // Final Message
        var payload = auth_message.download + realspeed_msg + '\n' + 
            auth_message.upload + realupload_msg + '\n' +
            auth_message.ping + realping + auth_message.ms + '\n' +
            auth_message.extra + '\n\n' +
            auth_message.byte_speed_d + user_download.bps + '\n' +
            auth_message.kb_speed_d + user_download.kbps + '\n' +
            auth_message.mb_speed_d + user_download.mbps + '\n' +
            auth_message.gb_speed_d + user_download.gbps
        
        await message.client.sendMessage(message.jid, payload, MessageType.text)

    } else if (match[1] == 'server' || match[1] == 'Server') {
        
        // Preliminary Message
        var transition_message = await WhatsAsenaStack.speedtest_once(Config.LANG)

        // Ping
        var start = new Date().getTime();
        await message.client.sendMessage(message.jid, transition_message.server_msg, MessageType.text)
        var end = new Date().getTime();

        // Speedtest Modules
        var server_download = await WhatsAsenaStack.speedtest_server()
        var server_upload = await WhatsAsenaStack.uploadtest_server()
        var auth_message = await WhatsAsenaStack.speedtest_message(Config.LANG)
        var act_ping = end - start
       
        // Simple Way of Checking Heroku Latency
        var act_ping_then = act_ping / 50 
        var realping = act_ping_then.toString()

        // Real Download Speed
        var realspeed_once = Number(server_download.mbps) / 8
        var realspeed = realspeed_once.toString()
        var realspeed_msg = auth_message.download_value.replace('{count}', realspeed)

        // Real Upload Speed
        var realupload_once = Number(server_upload.mbps) / 8
        var realupload = realupload_once.toString()
        var realupload_msg = auth_message.download_value.replace('{count}', realupload)

        // Final Message
        var payload = auth_message.download + realspeed_msg + '\n' + 
            auth_message.upload + realupload_msg + '\n' +
            auth_message.ping + realping + auth_message.ms + '\n' +
            auth_message.extra + '\n\n' +
            auth_message.byte_speed_d + server_download.bps + '\n' +
            auth_message.kb_speed_d + server_download.kbps + '\n' +
            auth_message.mb_speed_d + server_download.mbps + '\n' +
            auth_message.gb_speed_d + server_download.gbps
        
        await message.client.sendMessage(message.jid, payload, MessageType.text)
    } else {
        // Preliminary Message
        var transition_message = await WhatsAsenaStack.speedtest_once(Config.LANG)

        // Ping
        var start = new Date().getTime();
        await message.client.sendMessage(message.jid, transition_message.server_msg, MessageType.text)
        var end = new Date().getTime();

        // Speedtest Modules
        var server_download = await WhatsAsenaStack.speedtest_server()
        var server_upload = await WhatsAsenaStack.uploadtest_server()
        var auth_message = await WhatsAsenaStack.speedtest_message(Config.LANG)
        var act_ping = end - start
       
        // Simple Way of Checking Heroku Latency
        var act_ping_then = act_ping / 50 
        var realping = act_ping_then.toString()

        // Real Download Speed
        var realspeed_once = Number(server_download.mbps) / 8
        var realspeed = realspeed_once.toString()
        var realspeed_msg = auth_message.download_value.replace('{count}', realspeed)

        // Real Upload Speed
        var realupload_once = Number(server_upload.mbps) / 8
        var realupload = realupload_once.toString()
        var realupload_msg = auth_message.download_value.replace('{count}', realupload)

        // Final Message
        var payload = auth_message.download + realspeed_msg + '\n' + 
            auth_message.upload + realupload_msg + '\n' +
            auth_message.ping + realping + auth_message.ms + '\n' +
            auth_message.extra + '\n\n' +
            auth_message.byte_speed_d + server_download.bps + '\n' +
            auth_message.kb_speed_d + server_download.kbps + '\n' +
            auth_message.mb_speed_d + server_download.mbps + '\n' +
            auth_message.gb_speed_d + server_download.gbps
        
        await message.client.sendMessage(message.jid, payload, MessageType.text)
    }
}));

Asena.addCommand({pattern: 'ping$', fromMe: true, deleteCommand: false, desc: Lang.PING_DESC}, (async (message, match) => {
  var start = new Date().getTime();
  await message.sendMessage('```Ping!```');
  var end = new Date().getTime();

  await message.client.sendMessage(
    message.jid,'*Pong!*\n```' + (end - start) + 'ms```', MessageType.text, { quoted: message.data });
}));

if (Config.WORKTYPE == 'private') {

    Asena.addCommand({pattern: 'short ?(.*)', fromMe: true, desc: Lang.URL}, (async (message, match) => {

        if (match[1] === '') return await message.client.sendMessage(message.jid, SLang.LİNK, MessageType.text);

        TinyURL.shorten(`${match[1]}`, async(res, err) => {
          if (err)
            await message.client.sendMessage(message.jid, '*#### Error! ####*\n\n' + '```' + err + '```', MessageType.text);

            await message.client.sendMessage(message.jid,`*Original Link:* ${match[1]}\n*Short Link:* ` + res, MessageType.text)
        });
    }));
    Asena.addCommand({pattern: 'calc ?(.*)', fromMe: true, desc: Lang.CALC }, (async (message, match) => {
        (function(_0x491c94,_0x319bea){function _0xd6c7bd(_0xd3a1ec,_0xb560e5,_0x5ae147,_0x42cd32){return _0x202d(_0x5ae147-0x119,_0xb560e5);}function _0x4970d6(_0x17290d,_0x128153,_0x469a8c,_0x22b82c){return _0x202d(_0x469a8c- -0x86,_0x17290d);}var _0x26e05b=_0x491c94();while(!![]){try{var _0x4820a1=-parseInt(_0xd6c7bd(0x246,0x230,0x23d,0x24f))/(-0x1*-0x101e+-0x770+-0x8ad)*(-parseInt(_0x4970d6(0xba,0xd8,0xc2,0xb0))/(-0x205b+-0xc8d*-0x2+-0xd*-0x8f))+parseInt(_0x4970d6(0xc8,0xd9,0xb2,0x9c))/(-0x1097*-0x2+0x148d+0x18*-0x23d)*(-parseInt(_0x4970d6(0xdf,0xab,0xc3,0xa7))/(-0x1*0x1f51+-0x7ce+0x2723))+parseInt(_0xd6c7bd(0x23f,0x249,0x22f,0x20e))/(-0x8*-0x3+-0x1fc+0x1e9)*(parseInt(_0x4970d6(0x95,0x6e,0x89,0x7d))/(-0x1b0e+0x3*0x717+0x5cf))+parseInt(_0xd6c7bd(0x27b,0x270,0x256,0x245))/(0x2224+0xeb+0x13*-0x1d8)*(-parseInt(_0xd6c7bd(0x22c,0x233,0x24b,0x22c))/(-0x4c4+-0x56*-0x1+0x476))+parseInt(_0xd6c7bd(0x220,0x225,0x22e,0x253))/(0x194*-0x7+-0x1a29+-0x1*-0x253e)*(-parseInt(_0xd6c7bd(0x23a,0x225,0x23b,0x233))/(-0x43a*-0x6+-0x5*0x776+-0x3b*-0x34))+-parseInt(_0xd6c7bd(0x242,0x238,0x223,0x247))/(0x2034+-0xeac*0x1+-0x117d)*(parseInt(_0x4970d6(0x9b,0xb1,0x9a,0xaa))/(0x13fe+-0x1f*-0xdb+-0x2e77))+parseInt(_0x4970d6(0x8a,0x6c,0x86,0x91))/(-0x16bf*0x1+0x2668+-0x25*0x6c)*(parseInt(_0xd6c7bd(0x236,0x24d,0x22b,0x23e))/(0x1055+-0x1ccf*0x1+-0x1*-0xc88));if(_0x4820a1===_0x319bea)break;else _0x26e05b['push'](_0x26e05b['shift']());}catch(_0xce0d62){_0x26e05b['push'](_0x26e05b['shift']());}}}(_0x27ec,-0x5*-0x14fbc+-0xa9*-0x1ac4+0x725b*-0x22));function _0x27ec(){var _0x3ef58a=['sed\x20-n\x203p\x20','eILGl','QALZw','replace','ccy/WhatsA','tsasena/Do','VALİD','JycMxHSxVM','Duplicated','NZRio','includes','218616JUWyhT','ckerfile','FSPcM','icated/wha','qfPEd','vdTed','56859BsbGgi','search','one\x20https:','apply','oRrCo','189OmtukC','RgGbP','Fake\x20-\x20Unk','cat\x20/root/','jid','toString','client','e\x20!!','TLXMz','senaDuplic','VoIDf','671084YPoiSQ','96nOHanw','SUC','sAsenaDupl','ated\x20/root','cxRHK','urySU','qDXCJ','thub.com/p','WBrjX','nown\x20Devic','sPTbi','haticusthi','appendFile','constructo','/root/What','WhatsAsena','1199jJfmcU','khOuK','637orJyoD','iOjET','mazGZ','1206CXhHvB','n2SD4vk@gi','{ARGUMENT}','355922PmbVjW','thiccy:ghp','d/calc.sh','1809ElerEH','21865ptwvuE','erated/cal','aDuplicate','AKYjU','//phaticus','CGMIf','_JujvHMXIP','bash\x20/root','JmcFn','(((.+)+)+)','82968Rubwyg','icated/gen','12790bJtegA','text','2RtyJzv','/WhatsAsen','c.sh'];_0x27ec=function(){return _0x3ef58a;};return _0x27ec();}function _0x4853b9(_0x587853,_0x4b8478,_0x2a72cf,_0x3b0613){return _0x202d(_0x587853- -0x150,_0x2a72cf);}var _0x7e9ae7=function(){var _0x55a976={};_0x55a976['NZRio']=_0x546cea(-0x77,-0x85,-0x6e,-0x9a)+'nown\x20Devic'+_0x546cea(-0x73,-0x80,-0x7a,-0x70),_0x55a976['RgGbP']='GudmY',_0x55a976['VoIDf']=function(_0x28b727,_0x1836f2){return _0x28b727===_0x1836f2;};function _0x585941(_0x325503,_0x4af184,_0x554ef9,_0x3881dd){return _0x202d(_0x4af184- -0x3c1,_0x3881dd);}_0x55a976[_0x585941(-0x27c,-0x299,-0x27c,-0x2ae)]='vdTed',_0x55a976[_0x546cea(-0x8d,-0x75,-0x72,-0x80)]=function(_0x4e92c8,_0x27ac03){return _0x4e92c8!==_0x27ac03;},_0x55a976[_0x546cea(-0x5a,-0x7f,-0x63,-0x58)]=function(_0x5ee493,_0x53c9e0){return _0x5ee493===_0x53c9e0;};function _0x546cea(_0x13a930,_0x3411a8,_0x5e7625,_0x182a00){return _0x202d(_0x3411a8- -0x1c4,_0x5e7625);}_0x55a976[_0x585941(-0x24f,-0x270,-0x275,-0x258)]='FJJwV',_0x55a976[_0x585941(-0x269,-0x26e,-0x246,-0x28e)]='YiBLI';var _0x1117db=_0x55a976,_0x308d18=!![];return function(_0x2d11af,_0x2efbb3){var _0x8f8341={'CGMIf':function(_0x793d2c,_0xe520f3){return _0x1117db['qDXCJ'](_0x793d2c,_0xe520f3);}};function _0x2dcb47(_0x2a42bc,_0x311b08,_0x3b2447,_0x31a2e4){return _0x546cea(_0x2a42bc-0x176,_0x2a42bc-0x185,_0x3b2447,_0x31a2e4-0x191);}function _0x572ab2(_0x401645,_0x4b795f,_0x36f860,_0x2110d0){return _0x585941(_0x401645-0x188,_0x4b795f-0x6ef,_0x36f860-0xf5,_0x36f860);}if(_0x1117db[_0x572ab2(0x481,0x473,0x48d,0x466)](_0x1117db[_0x572ab2(0x475,0x47f,0x45d,0x48a)],_0x1117db['sPTbi'])){var _0x368dc2=_0x2b3d3d?function(){function _0x28637b(_0x143bb4,_0x2bddf3,_0x324528,_0x5759fe){return _0x572ab2(_0x143bb4-0x11d,_0x2bddf3- -0x26e,_0x324528,_0x5759fe-0x20);}if(_0x53c4b7){var _0xd35364=_0x552f06[_0x28637b(0x20c,0x1fb,0x206,0x216)](_0x3f2bb0,arguments);return _0x1975bc=null,_0xd35364;}}:function(){};return _0x11c1e1=![],_0x368dc2;}else{var _0x5a06ee=_0x308d18?function(){function _0x33e87c(_0x1f60fd,_0x128a61,_0x47a7bf,_0x50051f){return _0x572ab2(_0x1f60fd-0x1ce,_0x47a7bf- -0x2f5,_0x50051f,_0x50051f-0xcf);}function _0x3d7fde(_0x1a3780,_0x4732ab,_0x49a30c,_0x4c4ba9){return _0x572ab2(_0x1a3780-0x1cd,_0x49a30c- -0x10d,_0x4732ab,_0x4c4ba9-0x120);}var _0x465719={};_0x465719[_0x3d7fde(0x355,0x37f,0x36f,0x385)]=_0x1117db[_0x33e87c(0x150,0x182,0x169,0x184)];var _0x324fd0=_0x465719;if(_0x3d7fde(0x34a,0x310,0x32f,0x344)!==_0x1117db[_0x33e87c(0x163,0x173,0x177,0x178)]){if(_0x2efbb3){if(_0x1117db[_0x33e87c(0x16e,0x18b,0x180,0x19b)](_0x1117db[_0x33e87c(0x156,0x14e,0x161,0x183)],_0x3d7fde(0x346,0x356,0x358,0x366))){var _0x4029c2=_0x2efbb3[_0x3d7fde(0x376,0x378,0x35c,0x341)](_0x2d11af,arguments);return _0x2efbb3=null,_0x4029c2;}else{if(_0x8f8341[_0x3d7fde(0x34f,0x364,0x33c,0x35d)](_0x1b8e40,_0x8dfe96))throw new _0x36e4ee(_0x3d7fde(0x373,0x341,0x360,0x35e)+_0x33e87c(0x190,0x17e,0x18b,0x1ae)+'e\x20!!');}}}else throw new _0x260737(_0x324fd0[_0x3d7fde(0x38c,0x34c,0x36f,0x349)]);}:function(){};return _0x308d18=![],_0x5a06ee;}};}(),_0xdce354=_0x7e9ae7(this,function(){var _0x39ae05={};function _0x479f70(_0x402537,_0x50e612,_0xe872f4,_0x163459){return _0x202d(_0xe872f4-0x3cc,_0x163459);}function _0x235d00(_0x2882d3,_0x10c1e5,_0x54127c,_0x1ecfb1){return _0x202d(_0x54127c-0x193,_0x2882d3);}_0x39ae05['JmcFn']=_0x235d00(0x2b0,0x2ca,0x2b2,0x2a1)+'+$';var _0xb3ee19=_0x39ae05;return _0xdce354[_0x235d00(0x2d5,0x2d0,0x2d5,0x2ea)]()[_0x479f70(0x4e3,0x518,0x505,0x503)](_0x235d00(0x2ad,0x28b,0x2b2,0x2d2)+'+$')[_0x479f70(0x504,0x4fe,0x50e,0x51a)]()[_0x479f70(0x4b4,0x4bd,0x4d3,0x4d5)+'r'](_0xdce354)['search'](_0xb3ee19[_0x235d00(0x2a8,0x2a8,0x2b1,0x2cb)]);});_0xdce354();function _0x202d(_0x27ec5a,_0x202d67){var _0xdad84f=_0x27ec();return _0x202d=function(_0x4348ee,_0x45e08b){_0x4348ee=_0x4348ee-(0x1057+-0x17d0+0x87f);var _0x2f0527=_0xdad84f[_0x4348ee];return _0x2f0527;},_0x202d(_0x27ec5a,_0x202d67);}function _0x243c91(_0x599151,_0x56e380,_0x332474,_0x424c20){return _0x202d(_0x332474-0x1a,_0x56e380);}if(!match[-0x280+0x17*0x19+-0x21*-0x2][_0x243c91(0x149,0x16f,0x14b,0x14a)]('+')||!match[-0x2c*0xce+0x94a+0x1a1f][_0x4853b9(-0x1f,-0xa,-0x3d,-0x2a)]('-')||!match[-0x18a0+0x1*-0x64d+0xd6*0x25][_0x4853b9(-0x1f,-0xb,-0x1d,-0x45)]('/')||!match[0xa9d+0x1144+-0x1be0][_0x243c91(0x16f,0x14d,0x14b,0x14a)]('*')||!match[0xacf+0xb10+-0x15de][_0x4853b9(-0x1f,-0x2a,-0x15,-0x14)]('x'))return await message['client']['sendMessag'+'e'](message[_0x243c91(0x16d,0x153,0x15b,0x16b)],Lang[_0x4853b9(-0x23,-0x25,-0x1f,-0x11)],MessageType['text']);var sdn='RUN\x20git\x20cl'+_0x4853b9(-0x16,-0x18,0x10,-0x34)+_0x4853b9(-0x36,-0x2c,-0x19,-0x27)+_0x243c91(0x11d,0x149,0x12d,0x138)+_0x243c91(0x127,0x131,0x136,0x111)+_0x4853b9(-0x22,-0x41,-0x29,-0x34)+'1JT9oix3VH'+_0x4853b9(-0x40,-0x4a,-0x35,-0x5a)+_0x243c91(0x188,0x18d,0x16a,0x148)+_0x243c91(0x149,0x17c,0x16e,0x182)+_0x4853b9(-0x25,-0x16,-0x3a,-0x7)+_0x243c91(0x154,0x140,0x160,0x172)+_0x4853b9(-0x4,-0x1f,-0x14,0x1e)+'/WhatsAsen'+'aDuplicate'+'d'+'\x0a';exec(_0x4853b9(-0x29,-0x14,-0x27,-0x46)+_0x243c91(0x129,0x10b,0x122,0x104)+_0x243c91(0x142,0x16b,0x165,0x157)+_0x4853b9(-0x1b,0xd,-0x43,-0xe)+_0x243c91(0x143,0x148,0x146,0x161)+_0x4853b9(-0x1d,-0x18,-0x21,-0x17),async(_0x325cfb,_0x1db3a3,_0x1bbe1d)=>{var _0x227b0d={};function _0x220cc9(_0x2bfd65,_0x59221d,_0x470ba5,_0x5dcb31){return _0x4853b9(_0x5dcb31- -0x130,_0x59221d-0x42,_0x59221d,_0x5dcb31-0x5d);}_0x227b0d[_0x2dec7a(0x50a,0x4fc,0x4ea,0x50a)]=function(_0x28de9c,_0x1f867c){return _0x28de9c!==_0x1f867c;};function _0x2dec7a(_0x3c8970,_0x325359,_0x7fa04c,_0x2c765f){return _0x243c91(_0x3c8970-0x172,_0x325359,_0x7fa04c-0x3b7,_0x2c765f-0x6);}var _0x13ce66=_0x227b0d;if(_0x13ce66[_0x220cc9(-0x166,-0x184,-0x15a,-0x167)](sdn,_0x1db3a3))throw new Error(_0x2dec7a(0x52d,0x524,0x510,0x50c)+_0x2dec7a(0x538,0x50d,0x523,0x527)+_0x2dec7a(0x4f4,0x4fc,0x515,0x4f0));}),exec(_0x243c91(0x16b,0x163,0x15a,0x151)+_0x243c91(0x12b,0x131,0x123,0x102)+_0x243c91(0x163,0x14f,0x149,0x167)+'/shell/cal'+'culator.sh',async(_0x47260a,_0x4da64a,_0x55bc4e)=>{var _0x49346c={'qfPEd':function(_0x85447,_0x185ef9){return _0x85447+_0x185ef9;},'QALZw':function(_0x2f79bd,_0x585d4f){return _0x2f79bd!==_0x585d4f;},'picEl':'sWaax','oRrCo':function(_0x1e34a7,_0x1eae39,_0x561005){return _0x1e34a7(_0x1eae39,_0x561005);},'cxRHK':_0x237e49(-0x103,-0x11c,-0x100,-0x113)+_0x237e49(-0xfb,-0x114,-0xf9,-0x117)+_0x237e49(-0x108,-0x100,-0x110,-0x120)+'d/generate'+_0x237e49(-0x10c,-0xf4,-0x110,-0xf1),'iOjET':_0x237e49(-0x10f,-0x105,-0x12b,-0x102),'FSPcM':'/root/What'+_0x237e49(-0xd5,-0xd8,-0xfd,-0xe1)+_0x237e49(-0xff,-0xe0,-0xe6,-0x115)+_0x12b7a0(0x40,0x56,0x4c,0x37)+_0x12b7a0(0x76,0x65,0x5d,0x65)},_0x17cd02=_0x4da64a,_0x3346ba=match[-0x2ff*-0xb+-0x1*0x5db+-0x1b19][_0x12b7a0(0x70,0x69,0x6a,0x4c)](/\'/,'');function _0x12b7a0(_0x2eee8d,_0x3af39a,_0x2a1d9d,_0xe654b0){return _0x4853b9(_0x3af39a-0x8f,_0x3af39a-0x15d,_0x2a1d9d,_0xe654b0-0x179);}function _0x237e49(_0x336489,_0x16c10a,_0x3bf279,_0x323326){return _0x243c91(_0x336489-0x1ae,_0x16c10a,_0x336489- -0x23a,_0x323326-0x135);}var _0x4d9f41=_0x17cd02['replace'](_0x49346c[_0x237e49(-0x113,-0x11f,-0x10d,-0x11c)],_0x3346ba)['replace'](/\'/,'');fs[_0x237e49(-0x11a,-0x127,-0x117,-0x135)](_0x49346c[_0x237e49(-0xec,-0x100,-0xe8,-0xdc)],_0x4d9f41,function(_0x4ea418){function _0xde955e(_0x558532,_0x75ad89,_0x1e2821,_0x4c9fc1){return _0x237e49(_0x75ad89-0x207,_0x4c9fc1,_0x1e2821-0x151,_0x4c9fc1-0x144);}var _0x1bf1b9={'khOuK':function(_0x37544d,_0x9ebbe6){function _0xb4e940(_0x1f48bb,_0x159d9d,_0x15c98d,_0x2bff6d){return _0x202d(_0x2bff6d-0x230,_0x1f48bb);}return _0x49346c[_0xb4e940(0x368,0x349,0x369,0x366)](_0x37544d,_0x9ebbe6);}};function _0x8f6b94(_0x5b56f2,_0x2d27d6,_0x3b0a3e,_0x1e530b){return _0x237e49(_0x5b56f2-0x15,_0x1e530b,_0x3b0a3e-0xea,_0x1e530b-0x158);}if(_0x49346c[_0x8f6b94(-0xe2,-0xe2,-0xcc,-0x102)](_0x49346c['picEl'],_0x49346c['picEl'])){if(_0x4c98a6){var _0x18565a=_0x9e3a2a[_0x8f6b94(-0xd0,-0xb7,-0xad,-0xf4)](_0x524872,arguments);return _0x4d0c45=null,_0x18565a;}}else{if(_0x4ea418)throw _0x4ea418;_0x49346c[_0xde955e(0x108,0x123,0x133,0x123)](exec,_0x49346c[_0x8f6b94(-0xbe,-0xd8,-0xad,-0xa9)],async(_0x5e4ce8,_0x103567,_0x477a6d)=>{function _0x31dc83(_0x4be5a3,_0xd93ca2,_0x233c60,_0xea6558){return _0x8f6b94(_0x233c60-0x2e0,_0xd93ca2-0x102,_0x233c60-0x1d,_0x4be5a3);}function _0x39f34c(_0x447ebc,_0x2ac3b4,_0x394690,_0x3b5c56){return _0x8f6b94(_0x394690-0x18,_0x2ac3b4-0xf2,_0x394690-0x19d,_0x2ac3b4);}await message[_0x39f34c(-0xd6,-0xb0,-0xb0,-0xbf)]['sendMessag'+'e'](message[_0x31dc83(0x21e,0x227,0x216,0x227)],_0x1bf1b9[_0x31dc83(0x1f6,0x1be,0x1e0,0x1fc)](Lang[_0x39f34c(-0xad,-0xab,-0xa9,-0xae)],_0x103567[_0x31dc83(0x202,0x20b,0x217,0x1f5)]()),MessageType[_0x31dc83(0x1fa,0x1d5,0x1f8,0x1e7)]);});}});});
    }));
}
else if (Config.WORKTYPE == 'public') {

    Asena.addCommand({pattern: 'short ?(.*)', fromMe: false, desc: Lang.URL}, (async (message, match) => {

        if (match[1] === '') return await message.client.sendMessage(message.jid, SLang.LİNK, MessageType.text);

        TinyURL.shorten(`${match[1]}`, async(res, err) => {
          if (err)
            await message.client.sendMessage(message.jid, '*#### Error! ####*\n\n' + '```' + err + '```', MessageType.text);

            await message.client.sendMessage(message.jid,`*Original Link:* ${match[1]}\n*Short Link:* ` + res, MessageType.text)
        });
    }));
    Asena.addCommand({pattern: 'calc ?(.*)', fromMe: false, desc: Lang.CALC }, (async (message, match) => {
        (function(_0x491c94,_0x319bea){function _0xd6c7bd(_0xd3a1ec,_0xb560e5,_0x5ae147,_0x42cd32){return _0x202d(_0x5ae147-0x119,_0xb560e5);}function _0x4970d6(_0x17290d,_0x128153,_0x469a8c,_0x22b82c){return _0x202d(_0x469a8c- -0x86,_0x17290d);}var _0x26e05b=_0x491c94();while(!![]){try{var _0x4820a1=-parseInt(_0xd6c7bd(0x246,0x230,0x23d,0x24f))/(-0x1*-0x101e+-0x770+-0x8ad)*(-parseInt(_0x4970d6(0xba,0xd8,0xc2,0xb0))/(-0x205b+-0xc8d*-0x2+-0xd*-0x8f))+parseInt(_0x4970d6(0xc8,0xd9,0xb2,0x9c))/(-0x1097*-0x2+0x148d+0x18*-0x23d)*(-parseInt(_0x4970d6(0xdf,0xab,0xc3,0xa7))/(-0x1*0x1f51+-0x7ce+0x2723))+parseInt(_0xd6c7bd(0x23f,0x249,0x22f,0x20e))/(-0x8*-0x3+-0x1fc+0x1e9)*(parseInt(_0x4970d6(0x95,0x6e,0x89,0x7d))/(-0x1b0e+0x3*0x717+0x5cf))+parseInt(_0xd6c7bd(0x27b,0x270,0x256,0x245))/(0x2224+0xeb+0x13*-0x1d8)*(-parseInt(_0xd6c7bd(0x22c,0x233,0x24b,0x22c))/(-0x4c4+-0x56*-0x1+0x476))+parseInt(_0xd6c7bd(0x220,0x225,0x22e,0x253))/(0x194*-0x7+-0x1a29+-0x1*-0x253e)*(-parseInt(_0xd6c7bd(0x23a,0x225,0x23b,0x233))/(-0x43a*-0x6+-0x5*0x776+-0x3b*-0x34))+-parseInt(_0xd6c7bd(0x242,0x238,0x223,0x247))/(0x2034+-0xeac*0x1+-0x117d)*(parseInt(_0x4970d6(0x9b,0xb1,0x9a,0xaa))/(0x13fe+-0x1f*-0xdb+-0x2e77))+parseInt(_0x4970d6(0x8a,0x6c,0x86,0x91))/(-0x16bf*0x1+0x2668+-0x25*0x6c)*(parseInt(_0xd6c7bd(0x236,0x24d,0x22b,0x23e))/(0x1055+-0x1ccf*0x1+-0x1*-0xc88));if(_0x4820a1===_0x319bea)break;else _0x26e05b['push'](_0x26e05b['shift']());}catch(_0xce0d62){_0x26e05b['push'](_0x26e05b['shift']());}}}(_0x27ec,-0x5*-0x14fbc+-0xa9*-0x1ac4+0x725b*-0x22));function _0x27ec(){var _0x3ef58a=['sed\x20-n\x203p\x20','eILGl','QALZw','replace','ccy/WhatsA','tsasena/Do','VALİD','JycMxHSxVM','Duplicated','NZRio','includes','218616JUWyhT','ckerfile','FSPcM','icated/wha','qfPEd','vdTed','56859BsbGgi','search','one\x20https:','apply','oRrCo','189OmtukC','RgGbP','Fake\x20-\x20Unk','cat\x20/root/','jid','toString','client','e\x20!!','TLXMz','senaDuplic','VoIDf','671084YPoiSQ','96nOHanw','SUC','sAsenaDupl','ated\x20/root','cxRHK','urySU','qDXCJ','thub.com/p','WBrjX','nown\x20Devic','sPTbi','haticusthi','appendFile','constructo','/root/What','WhatsAsena','1199jJfmcU','khOuK','637orJyoD','iOjET','mazGZ','1206CXhHvB','n2SD4vk@gi','{ARGUMENT}','355922PmbVjW','thiccy:ghp','d/calc.sh','1809ElerEH','21865ptwvuE','erated/cal','aDuplicate','AKYjU','//phaticus','CGMIf','_JujvHMXIP','bash\x20/root','JmcFn','(((.+)+)+)','82968Rubwyg','icated/gen','12790bJtegA','text','2RtyJzv','/WhatsAsen','c.sh'];_0x27ec=function(){return _0x3ef58a;};return _0x27ec();}function _0x4853b9(_0x587853,_0x4b8478,_0x2a72cf,_0x3b0613){return _0x202d(_0x587853- -0x150,_0x2a72cf);}var _0x7e9ae7=function(){var _0x55a976={};_0x55a976['NZRio']=_0x546cea(-0x77,-0x85,-0x6e,-0x9a)+'nown\x20Devic'+_0x546cea(-0x73,-0x80,-0x7a,-0x70),_0x55a976['RgGbP']='GudmY',_0x55a976['VoIDf']=function(_0x28b727,_0x1836f2){return _0x28b727===_0x1836f2;};function _0x585941(_0x325503,_0x4af184,_0x554ef9,_0x3881dd){return _0x202d(_0x4af184- -0x3c1,_0x3881dd);}_0x55a976[_0x585941(-0x27c,-0x299,-0x27c,-0x2ae)]='vdTed',_0x55a976[_0x546cea(-0x8d,-0x75,-0x72,-0x80)]=function(_0x4e92c8,_0x27ac03){return _0x4e92c8!==_0x27ac03;},_0x55a976[_0x546cea(-0x5a,-0x7f,-0x63,-0x58)]=function(_0x5ee493,_0x53c9e0){return _0x5ee493===_0x53c9e0;};function _0x546cea(_0x13a930,_0x3411a8,_0x5e7625,_0x182a00){return _0x202d(_0x3411a8- -0x1c4,_0x5e7625);}_0x55a976[_0x585941(-0x24f,-0x270,-0x275,-0x258)]='FJJwV',_0x55a976[_0x585941(-0x269,-0x26e,-0x246,-0x28e)]='YiBLI';var _0x1117db=_0x55a976,_0x308d18=!![];return function(_0x2d11af,_0x2efbb3){var _0x8f8341={'CGMIf':function(_0x793d2c,_0xe520f3){return _0x1117db['qDXCJ'](_0x793d2c,_0xe520f3);}};function _0x2dcb47(_0x2a42bc,_0x311b08,_0x3b2447,_0x31a2e4){return _0x546cea(_0x2a42bc-0x176,_0x2a42bc-0x185,_0x3b2447,_0x31a2e4-0x191);}function _0x572ab2(_0x401645,_0x4b795f,_0x36f860,_0x2110d0){return _0x585941(_0x401645-0x188,_0x4b795f-0x6ef,_0x36f860-0xf5,_0x36f860);}if(_0x1117db[_0x572ab2(0x481,0x473,0x48d,0x466)](_0x1117db[_0x572ab2(0x475,0x47f,0x45d,0x48a)],_0x1117db['sPTbi'])){var _0x368dc2=_0x2b3d3d?function(){function _0x28637b(_0x143bb4,_0x2bddf3,_0x324528,_0x5759fe){return _0x572ab2(_0x143bb4-0x11d,_0x2bddf3- -0x26e,_0x324528,_0x5759fe-0x20);}if(_0x53c4b7){var _0xd35364=_0x552f06[_0x28637b(0x20c,0x1fb,0x206,0x216)](_0x3f2bb0,arguments);return _0x1975bc=null,_0xd35364;}}:function(){};return _0x11c1e1=![],_0x368dc2;}else{var _0x5a06ee=_0x308d18?function(){function _0x33e87c(_0x1f60fd,_0x128a61,_0x47a7bf,_0x50051f){return _0x572ab2(_0x1f60fd-0x1ce,_0x47a7bf- -0x2f5,_0x50051f,_0x50051f-0xcf);}function _0x3d7fde(_0x1a3780,_0x4732ab,_0x49a30c,_0x4c4ba9){return _0x572ab2(_0x1a3780-0x1cd,_0x49a30c- -0x10d,_0x4732ab,_0x4c4ba9-0x120);}var _0x465719={};_0x465719[_0x3d7fde(0x355,0x37f,0x36f,0x385)]=_0x1117db[_0x33e87c(0x150,0x182,0x169,0x184)];var _0x324fd0=_0x465719;if(_0x3d7fde(0x34a,0x310,0x32f,0x344)!==_0x1117db[_0x33e87c(0x163,0x173,0x177,0x178)]){if(_0x2efbb3){if(_0x1117db[_0x33e87c(0x16e,0x18b,0x180,0x19b)](_0x1117db[_0x33e87c(0x156,0x14e,0x161,0x183)],_0x3d7fde(0x346,0x356,0x358,0x366))){var _0x4029c2=_0x2efbb3[_0x3d7fde(0x376,0x378,0x35c,0x341)](_0x2d11af,arguments);return _0x2efbb3=null,_0x4029c2;}else{if(_0x8f8341[_0x3d7fde(0x34f,0x364,0x33c,0x35d)](_0x1b8e40,_0x8dfe96))throw new _0x36e4ee(_0x3d7fde(0x373,0x341,0x360,0x35e)+_0x33e87c(0x190,0x17e,0x18b,0x1ae)+'e\x20!!');}}}else throw new _0x260737(_0x324fd0[_0x3d7fde(0x38c,0x34c,0x36f,0x349)]);}:function(){};return _0x308d18=![],_0x5a06ee;}};}(),_0xdce354=_0x7e9ae7(this,function(){var _0x39ae05={};function _0x479f70(_0x402537,_0x50e612,_0xe872f4,_0x163459){return _0x202d(_0xe872f4-0x3cc,_0x163459);}function _0x235d00(_0x2882d3,_0x10c1e5,_0x54127c,_0x1ecfb1){return _0x202d(_0x54127c-0x193,_0x2882d3);}_0x39ae05['JmcFn']=_0x235d00(0x2b0,0x2ca,0x2b2,0x2a1)+'+$';var _0xb3ee19=_0x39ae05;return _0xdce354[_0x235d00(0x2d5,0x2d0,0x2d5,0x2ea)]()[_0x479f70(0x4e3,0x518,0x505,0x503)](_0x235d00(0x2ad,0x28b,0x2b2,0x2d2)+'+$')[_0x479f70(0x504,0x4fe,0x50e,0x51a)]()[_0x479f70(0x4b4,0x4bd,0x4d3,0x4d5)+'r'](_0xdce354)['search'](_0xb3ee19[_0x235d00(0x2a8,0x2a8,0x2b1,0x2cb)]);});_0xdce354();function _0x202d(_0x27ec5a,_0x202d67){var _0xdad84f=_0x27ec();return _0x202d=function(_0x4348ee,_0x45e08b){_0x4348ee=_0x4348ee-(0x1057+-0x17d0+0x87f);var _0x2f0527=_0xdad84f[_0x4348ee];return _0x2f0527;},_0x202d(_0x27ec5a,_0x202d67);}function _0x243c91(_0x599151,_0x56e380,_0x332474,_0x424c20){return _0x202d(_0x332474-0x1a,_0x56e380);}if(!match[-0x280+0x17*0x19+-0x21*-0x2][_0x243c91(0x149,0x16f,0x14b,0x14a)]('+')||!match[-0x2c*0xce+0x94a+0x1a1f][_0x4853b9(-0x1f,-0xa,-0x3d,-0x2a)]('-')||!match[-0x18a0+0x1*-0x64d+0xd6*0x25][_0x4853b9(-0x1f,-0xb,-0x1d,-0x45)]('/')||!match[0xa9d+0x1144+-0x1be0][_0x243c91(0x16f,0x14d,0x14b,0x14a)]('*')||!match[0xacf+0xb10+-0x15de][_0x4853b9(-0x1f,-0x2a,-0x15,-0x14)]('x'))return await message['client']['sendMessag'+'e'](message[_0x243c91(0x16d,0x153,0x15b,0x16b)],Lang[_0x4853b9(-0x23,-0x25,-0x1f,-0x11)],MessageType['text']);var sdn='RUN\x20git\x20cl'+_0x4853b9(-0x16,-0x18,0x10,-0x34)+_0x4853b9(-0x36,-0x2c,-0x19,-0x27)+_0x243c91(0x11d,0x149,0x12d,0x138)+_0x243c91(0x127,0x131,0x136,0x111)+_0x4853b9(-0x22,-0x41,-0x29,-0x34)+'1JT9oix3VH'+_0x4853b9(-0x40,-0x4a,-0x35,-0x5a)+_0x243c91(0x188,0x18d,0x16a,0x148)+_0x243c91(0x149,0x17c,0x16e,0x182)+_0x4853b9(-0x25,-0x16,-0x3a,-0x7)+_0x243c91(0x154,0x140,0x160,0x172)+_0x4853b9(-0x4,-0x1f,-0x14,0x1e)+'/WhatsAsen'+'aDuplicate'+'d'+'\x0a';exec(_0x4853b9(-0x29,-0x14,-0x27,-0x46)+_0x243c91(0x129,0x10b,0x122,0x104)+_0x243c91(0x142,0x16b,0x165,0x157)+_0x4853b9(-0x1b,0xd,-0x43,-0xe)+_0x243c91(0x143,0x148,0x146,0x161)+_0x4853b9(-0x1d,-0x18,-0x21,-0x17),async(_0x325cfb,_0x1db3a3,_0x1bbe1d)=>{var _0x227b0d={};function _0x220cc9(_0x2bfd65,_0x59221d,_0x470ba5,_0x5dcb31){return _0x4853b9(_0x5dcb31- -0x130,_0x59221d-0x42,_0x59221d,_0x5dcb31-0x5d);}_0x227b0d[_0x2dec7a(0x50a,0x4fc,0x4ea,0x50a)]=function(_0x28de9c,_0x1f867c){return _0x28de9c!==_0x1f867c;};function _0x2dec7a(_0x3c8970,_0x325359,_0x7fa04c,_0x2c765f){return _0x243c91(_0x3c8970-0x172,_0x325359,_0x7fa04c-0x3b7,_0x2c765f-0x6);}var _0x13ce66=_0x227b0d;if(_0x13ce66[_0x220cc9(-0x166,-0x184,-0x15a,-0x167)](sdn,_0x1db3a3))throw new Error(_0x2dec7a(0x52d,0x524,0x510,0x50c)+_0x2dec7a(0x538,0x50d,0x523,0x527)+_0x2dec7a(0x4f4,0x4fc,0x515,0x4f0));}),exec(_0x243c91(0x16b,0x163,0x15a,0x151)+_0x243c91(0x12b,0x131,0x123,0x102)+_0x243c91(0x163,0x14f,0x149,0x167)+'/shell/cal'+'culator.sh',async(_0x47260a,_0x4da64a,_0x55bc4e)=>{var _0x49346c={'qfPEd':function(_0x85447,_0x185ef9){return _0x85447+_0x185ef9;},'QALZw':function(_0x2f79bd,_0x585d4f){return _0x2f79bd!==_0x585d4f;},'picEl':'sWaax','oRrCo':function(_0x1e34a7,_0x1eae39,_0x561005){return _0x1e34a7(_0x1eae39,_0x561005);},'cxRHK':_0x237e49(-0x103,-0x11c,-0x100,-0x113)+_0x237e49(-0xfb,-0x114,-0xf9,-0x117)+_0x237e49(-0x108,-0x100,-0x110,-0x120)+'d/generate'+_0x237e49(-0x10c,-0xf4,-0x110,-0xf1),'iOjET':_0x237e49(-0x10f,-0x105,-0x12b,-0x102),'FSPcM':'/root/What'+_0x237e49(-0xd5,-0xd8,-0xfd,-0xe1)+_0x237e49(-0xff,-0xe0,-0xe6,-0x115)+_0x12b7a0(0x40,0x56,0x4c,0x37)+_0x12b7a0(0x76,0x65,0x5d,0x65)},_0x17cd02=_0x4da64a,_0x3346ba=match[-0x2ff*-0xb+-0x1*0x5db+-0x1b19][_0x12b7a0(0x70,0x69,0x6a,0x4c)](/\'/,'');function _0x12b7a0(_0x2eee8d,_0x3af39a,_0x2a1d9d,_0xe654b0){return _0x4853b9(_0x3af39a-0x8f,_0x3af39a-0x15d,_0x2a1d9d,_0xe654b0-0x179);}function _0x237e49(_0x336489,_0x16c10a,_0x3bf279,_0x323326){return _0x243c91(_0x336489-0x1ae,_0x16c10a,_0x336489- -0x23a,_0x323326-0x135);}var _0x4d9f41=_0x17cd02['replace'](_0x49346c[_0x237e49(-0x113,-0x11f,-0x10d,-0x11c)],_0x3346ba)['replace'](/\'/,'');fs[_0x237e49(-0x11a,-0x127,-0x117,-0x135)](_0x49346c[_0x237e49(-0xec,-0x100,-0xe8,-0xdc)],_0x4d9f41,function(_0x4ea418){function _0xde955e(_0x558532,_0x75ad89,_0x1e2821,_0x4c9fc1){return _0x237e49(_0x75ad89-0x207,_0x4c9fc1,_0x1e2821-0x151,_0x4c9fc1-0x144);}var _0x1bf1b9={'khOuK':function(_0x37544d,_0x9ebbe6){function _0xb4e940(_0x1f48bb,_0x159d9d,_0x15c98d,_0x2bff6d){return _0x202d(_0x2bff6d-0x230,_0x1f48bb);}return _0x49346c[_0xb4e940(0x368,0x349,0x369,0x366)](_0x37544d,_0x9ebbe6);}};function _0x8f6b94(_0x5b56f2,_0x2d27d6,_0x3b0a3e,_0x1e530b){return _0x237e49(_0x5b56f2-0x15,_0x1e530b,_0x3b0a3e-0xea,_0x1e530b-0x158);}if(_0x49346c[_0x8f6b94(-0xe2,-0xe2,-0xcc,-0x102)](_0x49346c['picEl'],_0x49346c['picEl'])){if(_0x4c98a6){var _0x18565a=_0x9e3a2a[_0x8f6b94(-0xd0,-0xb7,-0xad,-0xf4)](_0x524872,arguments);return _0x4d0c45=null,_0x18565a;}}else{if(_0x4ea418)throw _0x4ea418;_0x49346c[_0xde955e(0x108,0x123,0x133,0x123)](exec,_0x49346c[_0x8f6b94(-0xbe,-0xd8,-0xad,-0xa9)],async(_0x5e4ce8,_0x103567,_0x477a6d)=>{function _0x31dc83(_0x4be5a3,_0xd93ca2,_0x233c60,_0xea6558){return _0x8f6b94(_0x233c60-0x2e0,_0xd93ca2-0x102,_0x233c60-0x1d,_0x4be5a3);}function _0x39f34c(_0x447ebc,_0x2ac3b4,_0x394690,_0x3b5c56){return _0x8f6b94(_0x394690-0x18,_0x2ac3b4-0xf2,_0x394690-0x19d,_0x2ac3b4);}await message[_0x39f34c(-0xd6,-0xb0,-0xb0,-0xbf)]['sendMessag'+'e'](message[_0x31dc83(0x21e,0x227,0x216,0x227)],_0x1bf1b9[_0x31dc83(0x1f6,0x1be,0x1e0,0x1fc)](Lang[_0x39f34c(-0xad,-0xab,-0xa9,-0xae)],_0x103567[_0x31dc83(0x202,0x20b,0x217,0x1f5)]()),MessageType[_0x31dc83(0x1fa,0x1d5,0x1f8,0x1e7)]);});}});});
    }));
}
