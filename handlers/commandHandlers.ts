import { TelegramAPI } from "../telegram/api.ts";
import { markup } from "../telegram/markup.ts";
import { UserService } from "../services/user.service.ts";
import { checkChannelMembership } from "../middleware/channelCheck.ts";
import { config } from "../config/env.ts";

export const CommandHandlers = {
  async handleStart(chatId: number, userId: number) {
    try {
      const isMember = await checkChannelMembership(userId);
      if (!isMember) {
        await TelegramAPI.sendMessage(
          chatId,
          "❌ *You must join our updates channel to use this bot.*",
          { reply_markup: markup.joinChannel }
        );
        return;
      }

      await TelegramAPI.sendMessage(
        chatId,
        `*Hey Bro !!*\n_Temp Mail is a free service...`,
        { reply_markup: markup.startButtons }
      );
      await TelegramAPI.sendMessage(chatId, "*Generate an Email Now❕*", {
        reply_markup: markup.mainButtons,
      });
    } catch (error) {
      console.error("Start command error:", error);
      await TelegramAPI.sendMessage(chatId, "⚠️ An error occurred.");
    }
  },

  async handleUsers(chatId: number, userId: number) {
    if (userId !== config.adminId) {
      await TelegramAPI.sendMessage(chatId, "⛔️ Unauthorized");
      return;
    }

    try {
      const count = await UserService.countUsers();
      await TelegramAPI.sendMessage(chatId, `👥 Total users: *${count}*`);
    } catch (error) {
      console.error("Users command error:", error);
      await TelegramAPI.sendMessage(chatId, "⚠️ Failed to fetch users");
    }
  },
};