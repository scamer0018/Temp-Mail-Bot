export const markup = {
    mainButtons: {
      inline_keyboard: [
        [
          { text: "Generate", callback_data: "generate" },
          { text: "Refresh", callback_data: "refresh" },
          { text: "Close", callback_data: "close" },
        ],
      ],
    },
  
    startButtons: {
      inline_keyboard: [
        [{ text: "> Updates Channel <", url: "https://t.me/Private_Bots" }],
      ],
    },
  
    messageButtons: {
      inline_keyboard: [
        [
          { text: "View message", callback_data: "view_msg" },
          { text: "Refresh", callback_data: "refresh" },
          { text: "Close", callback_data: "close" },
        ],
      ],
    },
  
    joinChannel: {
      inline_keyboard: [
        [{ text: "Join Updates Channel", url: "https://t.me/Private_Bots" }],
      ],
    },
  };