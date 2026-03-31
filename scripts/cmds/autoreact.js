module.exports.config = {
    name: "autoreact",
    version: "2.0.0",
    author: "Ajmaul",
    role: 0,
    description: "Auto react on/off (owner only)",
    category: "system",
    countDown: 0
};

// =======================
// YOUR FACEBOOK UID
// =======================
const OWNER_ID = "61588349794704";

// temporary memory
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

        // check ON/OFF
        if (!autoReactStatus[threadID]) return;

        // only react to OWNER messages
        if (event.senderID !== OWNER_ID) return;

        // ignore bot's own messages
        if (event.senderID == api.getCurrentUserID()) return;

        // emoji list
        const reacts = ["🌷", "😻", "✨", "🕊️", "👍", "🐦", "🪶", "💀", "👀", "💐"];

        const react = reacts[Math.floor(Math.random() * reacts.length)];

        api.setMessageReaction(react, event.messageID, () => {}, true);

    } catch (e) {
        console.log("AutoReact Error:", e);
    }
};
