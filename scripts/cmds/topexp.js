module.exports = {
  config: {
    name: "topexp",
    version: "1.0",
    author: "Ajmaul",
    role: 0,
    shortDescription: {
      en: "Top 10 Ranks"
    },
    longDescription: {
      en: ""
    },
    category: "group",
    guide: {
      en: "{pn}"
    }
  },
  onStart: async function ({ api, args, message, event, usersData }) {
    const allUsers = await usersData.getAll();

    // Filter out users with no experience points
    const usersWithExp = allUsers.filter(user => user.exp > 0);

    if (usersWithExp.length < 10) {
      message.reply("🚫 There are not enough users with experience points to display a top 20.");
      return;
    }

    const topExp = usersWithExp.sort((a, b) => b.exp - a.exp).slice(0, 20);

    const topUsersList = topExp.map((user, index) => {
      return `🏅 ${index + 1}. ${user.name}: ${user.exp} XP 💯`;
    });

    const messageText = `🌟𝐓𝐨𝐩 𝟐𝟎 𝐄𝐱𝐩 𝐑𝐚𝐧𝐤 🌟\n\n${topUsersList.join('\n')}\n\n🏆 Keep going to reach the top! 🏆`;

    message.reply(messageText);
  }
};
