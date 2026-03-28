module.exports = {
  config: {
    name: "autoadd",
    version: "1.0.1",
    author: "Fixed",
    countDown: 0,
    role: 0,
    description: "Auto add user when they leave group",
    category: "system"
  },

  onEvent: async function ({ api, event }) {
    try {
      if (event.logMessageType !== "log:unsubscribe") return;

      const leftID = event.logMessageData.leftParticipantFbId;
      const threadID = event.threadID;
      const botID = api.getCurrentUserID();

      // bot ignore
      if (leftID == botID) return;

      // message
      api.sendMessage("😢 Keno left nili? abar add kortesi...", threadID);

      // ⏱ delay (important)
      setTimeout(() => {
        api.addUserToGroup(leftID, threadID)
          .then(() => {
            api.sendMessage("✅ ajmaul er bot thakte gc theke left oto sohoj na  😏🚬", threadID);
          })
          .catch(() => {
            api.sendMessage("❌ halare abar add korte parlam na (privacy/friend lagbe)", threadID);
          });
      }, 3000); // 3 sec delay

    } catch (e) {
      console.log(e);
    }
  }
};
