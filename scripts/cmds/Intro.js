const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
 name: "intro",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "🔰Ajmaul Islam🔰",
 description: "Show  Info",
 commandCategory: "info",
 usages: "info",
 cooldowns: 2
};

module.exports.run = async function({ api, event }) {
 const time = moment().tz("Asia/Dhaka").format("DD/MM/YYYY hh:mm:ss A");

 const callback = () => api.sendMessage({
 body: `
┏━━━━━━━━━━━━━━━━┓
┃ 🌟𝐎𝐖𝐍𝐄𝐑 𝐈𝐍𝐅𝐎🌟
┣━━━━━━━━━━━━━━━━┫
┃👤𝐍𝐀𝐌𝐄      :Ajmaul
┃🚹𝐆𝐄𝐍𝐃𝐄𝐑    :𝐌𝐀𝐋𝐄
┃🎂𝐀𝐆𝐄       :𝟏8
┃🕌𝐑𝐄𝐋𝐈𝐆𝐈𝐎𝐍 : 𝐈𝐒𝐋𝐀𝐌
┃🏡𝐀𝐃𝐃𝐑𝐄𝐒𝐒 : জয়পুরহাট,বাংলাদেশ
┣━━━━━━━━━━━━━━━━┫
┃𝐓𝐈𝐊𝐓𝐎𝐊 :@eror458952
┃📢𝐓𝐄𝐋𝐄𝐆𝐑𝐀𝐌 : dibe na 🥴🤪
┃🌐𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 :বায়ো-তে আছে
┣━━━━━━━━━━━━━━━━┫
┃🕒𝐔𝐏𝐃𝐀𝐓𝐄𝐃 𝐓𝐈𝐌𝐄 :${time}
┗━━━━━━━━━━━━━━━━┛`,
 attachment: fs.createReadStream(__dirname + "/cache/owner.jpg")
 }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/owner.jpg"));

 return request("https://i.imgur.com/gacFeHQ.jpeg")
 .pipe(fs.createWriteStream(__dirname + '/cache/owner.jpg'))
 .on('close', () => callback());
};

