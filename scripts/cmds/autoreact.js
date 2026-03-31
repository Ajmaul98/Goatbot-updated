module.exports.config = {
    name: "autoreact",
    version: "3.0.0",
    author: "Ajmaul",
    role: 0,
    description: "Auto react with multi emoji effect (owner only)",
    category: "system",
    countDown: 0
};

// =======================
// YOUR FACEBOOK UID
// =======================
const OWNER_ID = "61588349794704";

// memory for on/off per thread
let autoReactStatus = {};

module.exports.onStart = async ({ api, event, args }) => {
    const threadID = event.threadID;

    if (!args[0]) {
        return api.sendMessage("Use: autoreact on / off", threadID);
    }

    if (args[0].toLowerCase() === "on") {
        autoReactStatus[threadID] = true;
        return api.sendMessage("✅ Auto React ON (owner only)", threadID);
    }

    if (args[0].toLowerCase() === "off") {
        autoReactStatus[threadID] = false;
        return api.sendMessage("❌ Auto React OFF", threadID);
    }
};

module.exports.onChat = async ({ api, event }) => {
    try {
        const threadID = event.threadID;

        // system OFF হলে কিছু করবে না
        if (!autoReactStatus[threadID]) return;

        // শুধু owner এর message এ কাজ করবে
        if (event.senderID !== OWNER_ID) return;

        // bot নিজের message এ react দিবে না
        if (event.senderID == api.getCurrentUserID()) return;

        // emoji list
        const reacts = ["🌷", "😻", "✨", "🕊️", "👍", "🐦", "🪶", "💀", "🚬", "💐"];

        // random single real reaction
        const randomReact = reacts[Math.floor(Math.random() * reacts.length)];
        api.setMessageReaction(randomReact, event.messageID, () => {}, true);

        // all emojis as message (fake multi reaction effect)
        const emojiString = reacts.join(" ");
        api.sendMessage(emojiString, threadID);

    } catch (e) {
        console.log("AutoReact Error:", e);
    }
};
