import { BOT_TOKEN } from "../config/config.ts";
import { InlineKeyboardMarkup } from "../types/telegram-types.ts";

interface MessageOptions {
  parse_mode?: "Markdown" | "HTML";
  reply_markup?: InlineKeyboardMarkup;
}

const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

export const TelegramService = {
  async sendMessage(
    chatId: number,
    text: string,
    options?: MessageOptions
  ): Promise<Response> {
    return fetch(`${API_URL}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        ...options
      }),
    });
  },

  async editMessageText(
    chatId: number,
    messageId: number,
    text: string,
    options?: MessageOptions
  ): Promise<Response> {
    return fetch(`${API_URL}/editMessageText`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        message_id: messageId,
        text,
        ...options
      }),
    });
  }
};