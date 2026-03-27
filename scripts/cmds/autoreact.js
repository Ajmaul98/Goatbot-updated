module.exports.config = {
    name: "autoreact",
    version: "1.0.1",
    author: "You",
    role: 0,
    description: "Auto react on/off system",
    category: "system",
    countDown: 0
};

// temporary memory
let autoReactStatus = {};

module.exports.onStart = async ({ api, event, args }) => {
    const threadID = event.threadID;

    if (!args[0]) {
        return api.sendMessage("Use: autoreact on / off", threadID);
    }

    if (args[0] === "on") {
        autoReactStatus[threadID] = true;
        return api.sendMessage("Auto React ON", threadID);
    }

    if (args[0] === "off") {
        autoReactStatus[threadID] = false;
        return api.sendMessage("Auto React OFF", threadID);
    }
};

module.exports.onChat = async ({ api, event }) => {
    try {
        const threadID = event.threadID;

        // check ON/OFF
        if (!autoReactStatus[threadID]) return;

        // bot own message ignore
        if (event.senderID == api.getCurrentUserID()) return;

        // emoji list
        const reacts = ["❤️", "😆", "😮", "😢", "👍", "🔥"];

        const react = reacts[Math.floor(Math.random() * reacts.length)];

        api.setMessageReaction(react, event.messageID, () => {}, true);

    } catch (e) {
        console.log(e);
    }
};
