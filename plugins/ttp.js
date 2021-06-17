/* Codded by @phaticusthiccy
Telegram: t.me/phaticusthiccy
Instagram: www.instagram.com/kyrie.baran
*/

const Asena = require('../events');
const {WAConnection, MessageOptions, MessageType, Mimetype, Presence} = require('@adiwajshing/baileys');
const fs = require('fs');
const axios = require('axios');
const GW = "Yazıyı dark neon fotoğrafına çevirir."
const NM = "Anime banner gönderir."

const Language = require('../language');
const Lang = Language.getString('ttp');

const acik = "Tüm ttp Komutlarını gösterir"

const KOMUT = { 
    ttpkomut: '💻Usage: *.ttp selam* \n',
    ttpdesc: 'ℹ️Desc: _yazıyı sade resme çevirir_. \n\n',
    attpkomut: '💻Usage: *.attp selam*  \n',
    attpdesc: 'ℹ️Desc: _Yazıyı renkli stickera çevirir_. \n\n',
    animekomut: '💻Usage: *.animettp selam* \n',
    animedesc: 'ℹ️Desc: _yazıyı anime resme çevirir_. \n\n',
    firekomut: '💻Usage: *.firettp selam* \n',
    firedesc: 'ℹ️Desc: _yazıyı alevli resme çevirir_. \n\n',
    neonkomut: '💻Usage: *.neonttp selam* \n',
    neondesc: 'ℹ️Desc: _yazıyı neon resme çevirir_. \n\n',
    avengerskomut: '💻Usage: *.avengersttp selam:merhaba* \n',
    avengersdesc: 'ℹ️Desc: _yazıyı avengers logosu ile birleştirir_. \n\n',
    leafkomut: '💻Usage: *.leafttp selam* \n',
    leafdesc: 'ℹ️Desc: _yazıyı bitki layerı ie birleştirir_. \n\n',
    harrykomut: '💻Usage: *.harryttp selam* \n',
    harrydesc: 'ℹ️Desc: _yazıyı harry potter sitili resme çevirir_. \n\n',
    metalkomut: '💻Usage: *.metalttp selam* \n',
    metaldesc: 'ℹ️Desc: _yazıyı metal görünümlü resme çevirir_. \n\n',
    glowkomut: '💻Usage: *.glowttp selam* \n',
    glowdesc: 'ℹ️Desc: _yazıyı parıltılı neon resme çevirir_. \n\n',
    paperkomut: '💻Usage: *paperttp selam* \n',
    paperdesc: 'ℹ️Desc: _yazıyı yanık kağıt üzerine yazılmış resme çevirir_. \n\n',
    candlekomut: '💻Usage: *.candlettp selam* \n',
    candledesc: 'ℹ️Desc: _yazıyı şeker dolu bardağın üzerine yazılmış resme çevirir_. \n\n',
    lovekomut: '💻Usage: *.lovettp selam* \n',
    lovedesc: 'ℹ️Desc: _yazıyı aşk mesajı resme çevirir_. \n\n',
    flowerkomut: '💻Usage: *.flowerttp selam* \n',
    flowerdesc: 'ℹ️Desc: _yazıyı çiçek dolu bardağın üzerine yazılmış resme çevirir_. \n\n',
    glasskomut: '💻Usage: *.glassttpp selam* \n',
    glassdesc: 'ℹ️Desc: _yazıyı cam kağıt üzerine yazılmış resme çevirir_. \n\n',
    coffeekomut: '💻Usage: *.coffeettp selam* \n',
    coffeedesc: 'ℹ️Desc: _yazıyı kahvenin üzerine yazılmış resme çevirir_. \n\n',
    coffeecupkomut: '💻Usage: *.coffeecupttp selam* \n',
    coffeecupdesc: 'ℹ️Desc: _yazıyı kahvenin üzerine yazılmış resme çevirir_ 2. \n\n',
    candykomut: '💻Usage: *.candyttp* \n',
    candydesc: 'ℹ️Desc: _yazıyı şekerli resme çevirir_. \n\n',
    sandkomut: '💻Usage: *.sandttp selam* \n',
    sanddesc: 'ℹ️Desc: _yazıyı kum üzerine yazılmış resme çevirir_. \n\n',
    skykomut: '💻Usage: *.skyttp selam* \n',
    skydesc: 'ℹ️Desc: _yazıyı gökyüzüne yazılmış resme çevirir_. \n\n',
    snowkomut: '💻Usage: *.snowttp selam* \n',
    snowdesc: 'ℹ️Desc: _yazıyı kar üzerine yazılmış resme çevirir_. \n\n',
    textkomut: '💻Usage: *.textttp selam* \n',
    textdesc: 'ℹ️Desc: _yazıyı uçaklar tarafından oluşturulmuş kalp içine yazılmış resme çevirir_. \n\n',
    silverkomut: '💻Usage: *.siverttp selam* \n',
    silverdesc: 'ℹ️Desc: _yazıyı gümüş resme çevirir_. \n\n',
    smokekomut: '💻Usage: *.smokettp selam* \n',
    smokedesc: 'ℹ️Desc: _yazıyı duman bulutu içine yazılmış resme çevirir_. \n\n',
    starskomut: '💻Usage: *.starsttp selam* \n',
    starsdesc: 'ℹ️Desc: _yazıyı yıldızlar arasına yazılmış resme çevirir_. \n\n',
    mmetalkomut: '💻Usage: *.mmetalttp selam* \n',
    mmetaldesc: 'ℹ️Desc: _yazıyı modern metal resme çevirir_. \n\n',
    metalickomut: '💻Usage: *.metalicttp selam* \n',
    metalicdesc: 'ℹ️Desc: _yazıyı metalik parıltılı resme çevirir_. \n\n',
    colorfulkomut: '💻Usage: *.colorful selam* \n',
    colorfuldesc: 'ℹ️Desc: _yazıyı video haline getirir_. \n\n',
};


Asena.addCommand({ pattern: 'allttp', desc: acik, deleteCommand: true}, (async (message, match) => {
    await message.client.sendMessage(
        message.jid,
        KOMUT.ttpkomut + 
        KOMUT.ttpdesc +
        KOMUT.attpkomut +
        KOMUT.attpdesc +
	KOMUT.animekomut +
	KOMUT.animedesc +
	KOMUT.firekomut +
	KOMUT.firedesc +
	KOMUT.neonkomut +
	KOMUT.firedesc +
	KOMUT.avengerskomut +
	KOMUT.avengersdesc +
	KOMUT.leafkomut +
	KOMUT.leafdesc +
	KOMUT.harrykomut +
	KOMUT.harrydesc +
	KOMUT.metalkomut +
	KOMUT.metaldesc +
	KOMUT.glowkomut +
	KOMUT.glowdesc +
	KOMUT.paperkomut +
	KOMUT.paperdesc +
	KOMUT.candlekomut +
	KOMUT.candledesc +
	KOMUT.lovekomut +
	KOMUT.lovedesc +
	KOMUT.flowerkomut +
	KOMUT.flowerdesc +
	KOMUT.glasskomut +
	KOMUT.glassdesc +
	KOMUT.coffeekomut +
	KOMUT.coffeedesc +
	KOMUT.coffeecupkomut +
	KOMUT.coffeecupdesc +
	KOMUT.candykomut +
	KOMUT.candydesc +
	KOMUT.sandkomut +
        KOMUT.sanddesc +
	KOMUT.skykomut +
	KOMUT.skydesc +
	KOMUT.snowkomut +
	KOMUT.snowdesc +
	KOMUT.textkomut +
	KOMUT.textdesc +
	KOMUT.silverkomut +
	KOMUT.silverdesc +
	KOMUT.smokekomut +
	KOMUT.smokedesc +
	KOMUT.starskomut +
	KOMUT.starsdesc +
	KOMUT.mmetalkomut +
	KOMUT.mmetaldesc +
	KOMUT.colorfulkomut +
	KOMUT.colorfuldesc +
	KOMUT.metalickomut +
	KOMUT.metalicdesc,
        MessageType.text
    );
}));

Asena.addCommand({ pattern: 'ttp ?(.*)', fromMe: true, desc: Lang.TTP_DESC, dontAddCommand:true }, (async (message, match) => {
           
    if (match[1] === '') return await message.client.sendMessage(message.jid, Lang.NEED_WORD, MessageType.text);

    var ttinullimage = await axios.get(`https://api.xteam.xyz/ttp?file&text=${match[1].replace(/Ö/g, "%C3%96").replace(/ö/g, "%C3%B6").replace(/ü/g, "%C3%BC").replace(/Ü/g, "%C3%9C").replace(/Ğ/g, "%C4%9E").replace(/ğ/g, "%C4%9F").replace(/ş/g, "%C5%9F").replace(/Ş/g, "%C5%9E").replace(/ç/g, "%C3%A7").replace(/Ç/g, "%C3%87").replace(/ı/g, "%C4%B1").replace(/i/g, "%69").replace(/"/g, "%22").replace(/İ/g, "%C4%B0")}`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'SELO 💑 ZEYNO' })

}));

Asena.addCommand({ pattern: 'animettp ?(.*)', fromMe: true, desc: Lang.ANİME_DESC, dontAddCommand:true }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);

    var ttinullimage = await axios.get(`https://videfikri.com/api/textmaker/narutobanner/?text=${match[1].replace(/Ö/g, "%C3%96").replace(/ö/g, "%C3%B6").replace(/ü/g, "%C3%BC").replace(/Ü/g, "%C3%9C").replace(/Ğ/g, "%C4%9E").replace(/ğ/g, "%C4%9F").replace(/ş/g, "%C5%9F").replace(/Ş/g, "%C5%9E").replace(/ç/g, "%C3%A7").replace(/Ç/g, "%C3%87").replace(/ı/g, "%C4%B1").replace(/i/g, "%69").replace(/"/g, "%22").replace(/İ/g, "%C4%B0")}`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'SELO 💑 ZEYNO' })

}));

Asena.addCommand({ pattern: 'attp ?(.*)', fromMe: true, desc: Lang.ATTP_DESC, dontAddCommand:true }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);

    var ttinullimage = await axios.get(`https://api.xteam.xyz/attp?file&text=${match[1].replace(/Ö/g, "%C3%96").replace(/ö/g, "%C3%B6").replace(/ü/g, "%C3%BC").replace(/Ü/g, "%C3%9C").replace(/Ğ/g, "%C4%9E").replace(/ğ/g, "%C4%9F").replace(/ş/g, "%C5%9F").replace(/Ş/g, "%C5%9E").replace(/ç/g, "%C3%A7").replace(/Ç/g, "%C3%87").replace(/ı/g, "%C4%B1").replace(/i/g, "%69").replace(/"/g, "%22").replace(/İ/g, "%C4%B0")}`, { responseType: 'arraybuffer' })


    await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.sticker, { mimetype: Mimetype.webp })

}));

Asena.addCommand({ pattern: 'firettp ?(.*)$', fromMe: true, desc: Lang.FIRE_DESC, dontAddCommand:true }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);

    var ttinullimage = await axios.get(`https://api.xteam.xyz/photooxy/flaming?text=${match[1].replace(/Ö/g, "%C3%96").replace(/ö/g, "%C3%B6").replace(/ü/g, "%C3%BC").replace(/Ü/g, "%C3%9C").replace(/Ğ/g, "%C4%9E").replace(/ğ/g, "%C4%9F").replace(/ş/g, "%C5%9F").replace(/Ş/g, "%C5%9E").replace(/ç/g, "%C3%A7").replace(/Ç/g, "%C3%87").replace(/ı/g, "%C4%B1").replace(/i/g, "%69").replace(/"/g, "%22").replace(/İ/g, "%C4%B0")}&APIKEY=e67bd1bafe81b611`, { responseType: 'arraybuffer' })


    await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'SELO 💑 ZEYNO' })

}));

Asena.addCommand({ pattern: 'neonttp ?(.*)', fromMe: true, desc: Lang.NEON_DESC, dontAddCommand:true }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);

    var ttinullimage = await axios.get(`https://api.xteam.xyz/textpro/neon?text=${match[1].replace(/Ö/g, "%C3%96").replace(/ö/g, "%C3%B6").replace(/ü/g, "%C3%BC").replace(/Ü/g, "%C3%9C").replace(/Ğ/g, "%C4%9E").replace(/ğ/g, "%C4%9F").replace(/ş/g, "%C5%9F").replace(/Ş/g, "%C5%9E").replace(/ç/g, "%C3%A7").replace(/Ç/g, "%C3%87").replace(/ı/g, "%C4%B1").replace(/i/g, "%69").replace(/"/g, "%22").replace(/İ/g, "%C4%B0")}&APIKEY=e67bd1bafe81b611`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'SELO 💑 ZEYNO' })

}));

Asena.addCommand({ pattern: 'avengersttp ?(.*)', fromMe: true, desc: Lang.AVENGERS_DESC, dontAddCommand:true }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);

    var topText, bottomText;
    if (match[1].includes(':')) {
        var split = match[1].split(':');
        topText = split[1];
        bottomText = split[0];
    }
	else {
        topText = match[1];
        bottomText = '';
    }
    
    var ttinullimage = await axios.get(`https://api.xteam.xyz/textpro/3davengers?text=${topText.replace(/Ö/g, "%C3%96").replace(/ö/g, "%C3%B6").replace(/ü/g, "%C3%BC").replace(/Ü/g, "%C3%9C").replace(/Ğ/g, "%C4%9E").replace(/ğ/g, "%C4%9F").replace(/ş/g, "%C5%9F").replace(/Ş/g, "%C5%9E").replace(/ç/g, "%C3%A7").replace(/Ç/g, "%C3%87").replace(/ı/g, "%C4%B1").replace(/i/g, "%69").replace(/"/g, "%22").replace(/İ/g, "%C4%B0")}&text2=${bottomText.replace(/Ö/g, "%C3%96").replace(/ö/g, "%C3%B6").replace(/ü/g, "%C3%BC").replace(/Ü/g, "%C3%9C").replace(/Ğ/g, "%C4%9E").replace(/ğ/g, "%C4%9F").replace(/ş/g, "%C5%9F").replace(/Ş/g, "%C5%9E").replace(/ç/g, "%C3%A7").replace(/Ç/g, "%C3%87").replace(/ı/g, "%C4%B1").replace(/i/g, "%69").replace(/"/g, "%22").replace(/İ/g, "%C4%B0")}&APIKEY=e67bd1bafe81b611`, { responseType: 'arraybuffer' })


    await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'SELO 💑 ZEYNO' })

}));

Asena.addCommand({ pattern: 'leafttp ?(.*)', fromMe: true, desc: Lang.LEAF_DESC, dontAddCommand:true }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);

    var ttinullimage = await axios.get(`https://api.xteam.xyz/textpro/naturalleaves?text=${match[1].replace(/Ö/g, "%C3%96").replace(/ö/g, "%C3%B6").replace(/ü/g, "%C3%BC").replace(/Ü/g, "%C3%9C").replace(/Ğ/g, "%C4%9E").replace(/ğ/g, "%C4%9F").replace(/ş/g, "%C5%9F").replace(/Ş/g, "%C5%9E").replace(/ç/g, "%C3%A7").replace(/Ç/g, "%C3%87").replace(/ı/g, "%C4%B1").replace(/i/g, "%69").replace(/"/g, "%22").replace(/İ/g, "%C4%B0")}&APIKEY=e67bd1bafe81b611`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'SELO 💑 ZEYNO' })

}));

Asena.addCommand({ pattern: 'harryttp ?(.*)', fromMe: true, desc: Lang.HARRY_DESC, dontAddCommand:true }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);

    var ttinullimage = await axios.get(`https://api.xteam.xyz/photooxy/harrypotter?text=${match[1].replace(/Ö/g, "%C3%96").replace(/ö/g, "%C3%B6").replace(/ü/g, "%C3%BC").replace(/Ü/g, "%C3%9C").replace(/Ğ/g, "%C4%9E").replace(/ğ/g, "%C4%9F").replace(/ş/g, "%C5%9F").replace(/Ş/g, "%C5%9E").replace(/ç/g, "%C3%A7").replace(/Ç/g, "%C3%87").replace(/ı/g, "%C4%B1").replace(/i/g, "%69").replace(/"/g, "%22").replace(/İ/g, "%C4%B0")}&APIKEY=e67bd1bafe81b611`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'SELO 💑 ZEYNO' })

}));

Asena.addCommand({ pattern: 'metalttp ?(.*)', fromMe: true, desc: Lang.METAL_DESC, dontAddCommand:true }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);

    var ttinullimage = await axios.get(`https://api.xteam.xyz/photooxy/crispchrome?text=${match[1].replace(/Ö/g, "%C3%96").replace(/ö/g, "%C3%B6").replace(/ü/g, "%C3%BC").replace(/Ü/g, "%C3%9C").replace(/Ğ/g, "%C4%9E").replace(/ğ/g, "%C4%9F").replace(/ş/g, "%C5%9F").replace(/Ş/g, "%C5%9E").replace(/ç/g, "%C3%A7").replace(/Ç/g, "%C3%87").replace(/ı/g, "%C4%B1").replace(/i/g, "%69").replace(/"/g, "%22").replace(/İ/g, "%C4%B0")}&APIKEY=e67bd1bafe81b611`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'SELO 💑 ZEYNO' })

}));

Asena.addCommand({ pattern: 'glowttp ?(.*)', fromMe: true, desc: Lang.GLOW_DESC, dontAddCommand:true }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);

    var ttinullimage = await axios.get(`https://videfikri.com/api/textmaker/glowingneon/?text=${match[1].replace(/Ö/g, "%C3%96").replace(/ö/g, "%C3%B6").replace(/ü/g, "%C3%BC").replace(/Ü/g, "%C3%9C").replace(/Ğ/g, "%C4%9E").replace(/ğ/g, "%C4%9F").replace(/ş/g, "%C5%9F").replace(/Ş/g, "%C5%9E").replace(/ç/g, "%C3%A7").replace(/Ç/g, "%C3%87").replace(/ı/g, "%C4%B1").replace(/i/g, "%69").replace(/"/g, "%22").replace(/İ/g, "%C4%B0")}`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'SELO 💑 ZEYNO' })

}));

Asena.addCommand({ pattern: 'paperttp ?(.*)', fromMe: true, desc: Lang.PAPER_DESC, dontAddCommand:true }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);

    var ttinullimage = await axios.get(`https://videfikri.com/api/textmaker/burnpaper/?text=${match[1].replace(/Ö/g, "%C3%96").replace(/ö/g, "%C3%B6").replace(/ü/g, "%C3%BC").replace(/Ü/g, "%C3%9C").replace(/Ğ/g, "%C4%9E").replace(/ğ/g, "%C4%9F").replace(/ş/g, "%C5%9F").replace(/Ş/g, "%C5%9E").replace(/ç/g, "%C3%A7").replace(/Ç/g, "%C3%87").replace(/ı/g, "%C4%B1").replace(/i/g, "%69").replace(/"/g, "%22").replace(/İ/g, "%C4%B0")}`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'SELO 💑 ZEYNO' })

}));

Asena.addCommand({ pattern: 'candlettp ?(.*)', fromMe: true, desc: Lang.CANDLE_DESC, dontAddCommand:true }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);

    var ttinullimage = await axios.get(`https://videfikri.com/api/textmaker/candlemug/?text=${match[1].replace(/Ö/g, "%C3%96").replace(/ö/g, "%C3%B6").replace(/ü/g, "%C3%BC").replace(/Ü/g, "%C3%9C").replace(/Ğ/g, "%C4%9E").replace(/ğ/g, "%C4%9F").replace(/ş/g, "%C5%9F").replace(/Ş/g, "%C5%9E").replace(/ç/g, "%C3%A7").replace(/Ç/g, "%C3%87").replace(/ı/g, "%C4%B1").replace(/i/g, "%69").replace(/"/g, "%22").replace(/İ/g, "%C4%B0")}`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'SELO 💑 ZEYNO' })

}));

Asena.addCommand({ pattern: 'lovettp ?(.*)', fromMe: true, desc: Lang.LOVE_DESC, dontAddCommand:true }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);

    var ttinullimage = await axios.get(`https://videfikri.com/api/textmaker/lovemsg/?text=${match[1].replace(/Ö/g, "%C3%96").replace(/ö/g, "%C3%B6").replace(/ü/g, "%C3%BC").replace(/Ü/g, "%C3%9C").replace(/Ğ/g, "%C4%9E").replace(/ğ/g, "%C4%9F").replace(/ş/g, "%C5%9F").replace(/Ş/g, "%C5%9E").replace(/ç/g, "%C3%A7").replace(/Ç/g, "%C3%87").replace(/ı/g, "%C4%B1").replace(/i/g, "%69").replace(/"/g, "%22").replace(/İ/g, "%C4%B0")}`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'SELO 💑 ZEYNO' })

}));

Asena.addCommand({ pattern: 'flowerttp ?(.*)', fromMe: true, desc: Lang.FLOWER_DESC, dontAddCommand:true }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);

    var ttinullimage = await axios.get(`https://videfikri.com/api/textmaker/mugflower/?text=${match[1].replace(/Ö/g, "%C3%96").replace(/ö/g, "%C3%B6").replace(/ü/g, "%C3%BC").replace(/Ü/g, "%C3%9C").replace(/Ğ/g, "%C4%9E").replace(/ğ/g, "%C4%9F").replace(/ş/g, "%C5%9F").replace(/Ş/g, "%C5%9E").replace(/ç/g, "%C3%A7").replace(/Ç/g, "%C3%87").replace(/ı/g, "%C4%B1").replace(/i/g, "%69").replace(/"/g, "%22").replace(/İ/g, "%C4%B0")}`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'SELO 💑 ZEYNO' })

}));

Asena.addCommand({ pattern: 'glassttp ?(.*)', fromMe: true, desc: Lang.GLASS_DESC, dontAddCommand:true }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);

    var ttinullimage = await axios.get(`https://videfikri.com/api/textmaker/paperonglass/?text=${match[1].replace(/Ö/g, "%C3%96").replace(/ö/g, "%C3%B6").replace(/ü/g, "%C3%BC").replace(/Ü/g, "%C3%9C").replace(/Ğ/g, "%C4%9E").replace(/ğ/g, "%C4%9F").replace(/ş/g, "%C5%9F").replace(/Ş/g, "%C5%9E").replace(/ç/g, "%C3%A7").replace(/Ç/g, "%C3%87").replace(/ı/g, "%C4%B1").replace(/i/g, "%69").replace(/"/g, "%22").replace(/İ/g, "%C4%B0")}`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'SELO 💑 ZEYNO' })

}));

Asena.addCommand({ pattern: 'coffeettp ?(.*)', fromMe: true, desc: Lang.COFFEE_DESC, dontAddCommand:true }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);

    var ttinullimage = await axios.get(`https://videfikri.com/api/textmaker/coffeecup/?text=${match[1].replace(/Ö/g, "%C3%96").replace(/ö/g, "%C3%B6").replace(/ü/g, "%C3%BC").replace(/Ü/g, "%C3%9C").replace(/Ğ/g, "%C4%9E").replace(/ğ/g, "%C4%9F").replace(/ş/g, "%C5%9F").replace(/Ş/g, "%C5%9E").replace(/ç/g, "%C3%A7").replace(/Ç/g, "%C3%87").replace(/ı/g, "%C4%B1").replace(/i/g, "%69").replace(/"/g, "%22").replace(/İ/g, "%C4%B0")}`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'SELO 💑 ZEYNO' })

}));

Asena.addCommand({ pattern: 'coffeecupttp ?(.*)', fromMe: true, desc: Lang.COFFEECUP_DESC, dontAddCommand:true }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);

    var ttinullimage = await axios.get(`https://videfikri.com/api/textmaker/coffeecup2/?text=${match[1].replace(/Ö/g, "%C3%96").replace(/ö/g, "%C3%B6").replace(/ü/g, "%C3%BC").replace(/Ü/g, "%C3%9C").replace(/Ğ/g, "%C4%9E").replace(/ğ/g, "%C4%9F").replace(/ş/g, "%C5%9F").replace(/Ş/g, "%C5%9E").replace(/ç/g, "%C3%A7").replace(/Ç/g, "%C3%87").replace(/ı/g, "%C4%B1").replace(/i/g, "%69").replace(/"/g, "%22").replace(/İ/g, "%C4%B0")}`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'SELO 💑 ZEYNO' })

}));

Asena.addCommand({ pattern: 'candyttp ?(.*)', fromMe: true, desc: Lang.CANDY_DESC, dontAddCommand:true }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);

    var ttinullimage = await axios.get(`https://videfikri.com/api/textmaker/sweetcandy/?text=${match[1].replace(/Ö/g, "%C3%96").replace(/ö/g, "%C3%B6").replace(/ü/g, "%C3%BC").replace(/Ü/g, "%C3%9C").replace(/Ğ/g, "%C4%9E").replace(/ğ/g, "%C4%9F").replace(/ş/g, "%C5%9F").replace(/Ş/g, "%C5%9E").replace(/ç/g, "%C3%A7").replace(/Ç/g, "%C3%87").replace(/ı/g, "%C4%B1").replace(/i/g, "%69").replace(/"/g, "%22").replace(/İ/g, "%C4%B0")}`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'SELO 💑 ZEYNO' })

}));

Asena.addCommand({ pattern: 'sandttp ?(.*)', fromMe: true, desc: Lang.SAND_DESC, dontAddCommand:true }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);

    var ttinullimage = await axios.get(`https://api.xteam.xyz/textpro/summerysandwriting?text=${match[1].replace(/Ö/g, "%C3%96").replace(/ö/g, "%C3%B6").replace(/ü/g, "%C3%BC").replace(/Ü/g, "%C3%9C").replace(/Ğ/g, "%C4%9E").replace(/ğ/g, "%C4%9F").replace(/ş/g, "%C5%9F").replace(/Ş/g, "%C5%9E").replace(/ç/g, "%C3%A7").replace(/Ç/g, "%C3%87").replace(/ı/g, "%C4%B1").replace(/i/g, "%69").replace(/"/g, "%22").replace(/İ/g, "%C4%B0")}&APIKEY=e67bd1bafe81b611`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'SELO 💑 ZEYNO' })

}));

Asena.addCommand({ pattern: 'skyttp ?(.*)', fromMe: true, desc: Lang.SKY_DESC, dontAddCommand:true }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);

    var ttinullimage = await axios.get(`https://api.xteam.xyz/textpro/cloudsky?text=${match[1].replace(/Ö/g, "%C3%96").replace(/ö/g, "%C3%B6").replace(/ü/g, "%C3%BC").replace(/Ü/g, "%C3%9C").replace(/Ğ/g, "%C4%9E").replace(/ğ/g, "%C4%9F").replace(/ş/g, "%C5%9F").replace(/Ş/g, "%C5%9E").replace(/ç/g, "%C3%A7").replace(/Ç/g, "%C3%87").replace(/ı/g, "%C4%B1").replace(/i/g, "%69").replace(/"/g, "%22").replace(/İ/g, "%C4%B0")}&APIKEY=e67bd1bafe81b611`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'SELO 💑 ZEYNO' })

}));

Asena.addCommand({ pattern: 'snowttp ?(.*)', fromMe: true, desc: Lang.SNOW_DESC, dontAddCommand:true }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);

    var ttinullimage = await axios.get(`https://api.xteam.xyz/textpro/snowtext?text=${match[1].replace(/Ö/g, "%C3%96").replace(/ö/g, "%C3%B6").replace(/ü/g, "%C3%BC").replace(/Ü/g, "%C3%9C").replace(/Ğ/g, "%C4%9E").replace(/ğ/g, "%C4%9F").replace(/ş/g, "%C5%9F").replace(/Ş/g, "%C5%9E").replace(/ç/g, "%C3%A7").replace(/Ç/g, "%C3%87").replace(/ı/g, "%C4%B1").replace(/i/g, "%69").replace(/"/g, "%22").replace(/İ/g, "%C4%B0")}&APIKEY=e67bd1bafe81b611`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'SELO 💑 ZEYNO' })

}));

Asena.addCommand({ pattern: 'textttp ?(.*)', fromMe: true, desc: Lang.TEXT_DESC, dontAddCommand:true }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);

    var ttinullimage = await axios.get(`https://api.xteam.xyz/textpro/cloudtext?text=${match[1].replace(/Ö/g, "%C3%96").replace(/ö/g, "%C3%B6").replace(/ü/g, "%C3%BC").replace(/Ü/g, "%C3%9C").replace(/Ğ/g, "%C4%9E").replace(/ğ/g, "%C4%9F").replace(/ş/g, "%C5%9F").replace(/Ş/g, "%C5%9E").replace(/ç/g, "%C3%A7").replace(/Ç/g, "%C3%87").replace(/ı/g, "%C4%B1").replace(/i/g, "%69").replace(/"/g, "%22").replace(/İ/g, "%C4%B0")}&APIKEY=e67bd1bafe81b611`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'SELO 💑 ZEYNO' })

}));

Asena.addCommand({ pattern: 'silverttp ?(.*)', fromMe: true, desc: Lang.SİLVER_DESC, dontAddCommand:true }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);

    var ttinullimage = await axios.get(`https://api.xteam.xyz/textpro/deluxesilver?text=${match[1].replace(/Ö/g, "%C3%96").replace(/ö/g, "%C3%B6").replace(/ü/g, "%C3%BC").replace(/Ü/g, "%C3%9C").replace(/Ğ/g, "%C4%9E").replace(/ğ/g, "%C4%9F").replace(/ş/g, "%C5%9F").replace(/Ş/g, "%C5%9E").replace(/ç/g, "%C3%A7").replace(/Ç/g, "%C3%87").replace(/ı/g, "%C4%B1").replace(/i/g, "%69").replace(/"/g, "%22").replace(/İ/g, "%C4%B0")}&APIKEY=e67bd1bafe81b611`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'SELO 💑 ZEYNO' })

}));

Asena.addCommand({ pattern: 'smokettp ?(.*)', fromMe: true, desc: Lang.SMOKE_DESC, dontAddCommand:true }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);

    var ttinullimage = await axios.get(`https://api.xteam.xyz/photooxy/smoke?text=${match[1].replace(/Ö/g, "%C3%96").replace(/ö/g, "%C3%B6").replace(/ü/g, "%C3%BC").replace(/Ü/g, "%C3%9C").replace(/Ğ/g, "%C4%9E").replace(/ğ/g, "%C4%9F").replace(/ş/g, "%C5%9F").replace(/Ş/g, "%C5%9E").replace(/ç/g, "%C3%A7").replace(/Ç/g, "%C3%87").replace(/ı/g, "%C4%B1").replace(/i/g, "%69").replace(/"/g, "%22").replace(/İ/g, "%C4%B0")}&APIKEY=e67bd1bafe81b611`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'SELO 💑 ZEYNO' })

}));

Asena.addCommand({ pattern: 'starsttp ?(.*)', fromMe: true, desc: Lang.STARS_DESC, dontAddCommand:true }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);

    var ttinullimage = await axios.get(`https://api.xteam.xyz/photooxy/stars?text=${match[1].replace(/Ö/g, "%C3%96").replace(/ö/g, "%C3%B6").replace(/ü/g, "%C3%BC").replace(/Ü/g, "%C3%9C").replace(/Ğ/g, "%C4%9E").replace(/ğ/g, "%C4%9F").replace(/ş/g, "%C5%9F").replace(/Ş/g, "%C5%9E").replace(/ç/g, "%C3%A7").replace(/Ç/g, "%C3%87").replace(/ı/g, "%C4%B1").replace(/i/g, "%69").replace(/"/g, "%22").replace(/İ/g, "%C4%B0")}&APIKEY=e67bd1bafe81b611`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'SELO 💑 ZEYNO' })

}));

Asena.addCommand({ pattern: 'mmetalttp ?(.*)', fromMe: true, desc: Lang.MMETAL_DESC, dontAddCommand:true }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);

    var ttinullimage = await axios.get(`https://api.xteam.xyz/photooxy/modernmetal?text=${match[1].replace(/Ö/g, "%C3%96").replace(/ö/g, "%C3%B6").replace(/ü/g, "%C3%BC").replace(/Ü/g, "%C3%9C").replace(/Ğ/g, "%C4%9E").replace(/ğ/g, "%C4%9F").replace(/ş/g, "%C5%9F").replace(/Ş/g, "%C5%9E").replace(/ç/g, "%C3%A7").replace(/Ç/g, "%C3%87").replace(/ı/g, "%C4%B1").replace(/i/g, "%69").replace(/"/g, "%22").replace(/İ/g, "%C4%B0")}&APIKEY=e67bd1bafe81b611`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'SELO 💑 ZEYNO' })

}));

Asena.addCommand({ pattern: 'colorful ?(.*)', fromMe: true, desc: Lang.COLORFUL_DESC, dontAddCommand:true }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);

    var ttinullimage = await axios.get(`https://api.xteam.xyz/videomaker/colorful?text=${match[1].replace(/Ö/g, "%C3%96").replace(/ö/g, "%C3%B6").replace(/ü/g, "%C3%BC").replace(/Ü/g, "%C3%9C").replace(/Ğ/g, "%C4%9E").replace(/ğ/g, "%C4%9F").replace(/ş/g, "%C5%9F").replace(/Ş/g, "%C5%9E").replace(/ç/g, "%C3%A7").replace(/Ç/g, "%C3%87").replace(/ı/g, "%C4%B1").replace(/i/g, "%69").replace(/"/g, "%22").replace(/İ/g, "%C4%B0")}&APIKEY=e67bd1bafe81b611`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.video, { mimetype: Mimetype.mp4, caption: 'SELO 💑 ZEYNO' })

}));

Asena.addCommand({ pattern: 'metalicttp ?(.*)', fromMe: true, desc: Lang.METALİC_DESC, dontAddCommand:true }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);

    var ttinullimage = await axios.get(`https://api.xteam.xyz/photooxy/metalicglow?text=${match[1].replace(/Ö/g, "%C3%96").replace(/ö/g, "%C3%B6").replace(/ü/g, "%C3%BC").replace(/Ü/g, "%C3%9C").replace(/Ğ/g, "%C4%9E").replace(/ğ/g, "%C4%9F").replace(/ş/g, "%C5%9F").replace(/Ş/g, "%C5%9E").replace(/ç/g, "%C3%A7").replace(/Ç/g, "%C3%87").replace(/ı/g, "%C4%B1").replace(/i/g, "%69").replace(/"/g, "%22").replace(/İ/g, "%C4%B0")}&APIKEY=e67bd1bafe81b611`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'SELO 💑 ZEYNO' })

}));
