import { config } from "../config/env.ts";

interface MessageOptions {
  parse_mode?: string;
  reply_markup?: object;
}

export const TelegramAPI = {
  async sendMessage(chatId: number, text: string, options: MessageOptions = {}) {
    const payload = {
      chat_id: chatId,
      text,
      parse_mode: options.parse_mode || "Markdown",
      reply_markup: options.reply_markup ? JSON.stringify(options.reply_markup) : undefined,
    };

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${config.botToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) throw new Error(await response.text());
    } catch (error) {
      console.error("Telegram API Error (sendMessage):", error);
    }
  },

  async editMessageText(
    chatId: number,
    messageId: number,
    text: string,
    options: MessageOptions = {}
  ) {
    const payload = {
      chat_id: chatId,
      message_id: messageId,
      text,
      parse_mode: options.parse_mode || "Markdown",
      reply_markup: options.reply_markup ? JSON.stringify(options.reply_markup) : undefined,
    };

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${config.botToken}/editMessageText`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) throw new Error(await response.text());
    } catch (error) {
      console.error("Telegram API Error (editMessageText):", error);
    }
  },
};