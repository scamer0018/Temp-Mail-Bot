import { TelegramAPI } from "../telegram/api.ts";
import { markup } from "../telegram/markup.ts";
import { UserService } from "../services/user.service.ts";
import { EmailService } from "../services/email.service.ts";
import type { User } from "../models/user.ts";

export const CallbackHandlers = {
  async handleGenerate(chatId: number, messageId: number, userId: number) {
    try {
      const { email, token } = await EmailService.generateEmail();
      await UserService.updateEmail(userId, email, token);
      await TelegramAPI.editMessageText(
        chatId,
        messageId,
        `*Your Email: *\`${email}\``,
        { reply_markup: markup.mainButtons }
      );
    } catch (error) {
      console.error("Generate error:", error);
      await TelegramAPI.editMessageText(chatId, messageId, "⚠️ Generation failed");
    }
  },

  async handleRefresh(chatId: number, messageId: number, user: User) {
    try {
      if (!user.email) {
        await TelegramAPI.editMessageText(chatId, messageId, "Generate email first");
        return;
      }

      const emails = await EmailService.getEmails(user.email_token);
      const mailItem = emails.list.find((item) => item.mail_subject);

      if (mailItem) {
        const content = await EmailService.fetchEmailContent(
          user.email_token,
          mailItem.mail_id
        );
        await TelegramAPI.editMessageText(
          chatId,
          messageId,
          `📨 From: ${mailItem.mail_from}\nSubject: ${mailItem.mail_subject}\n\n${content.mail_body}`,
          { reply_markup: markup.messageButtons }
        );
      } else {
        await TelegramAPI.editMessageText(
          chatId,
          messageId,
          `📭 No messages for ${user.email}`
        );
      }
    } catch (error) {
      console.error("Refresh error:", error);
      await TelegramAPI.editMessageText(chatId, messageId, "⚠️ Refresh failed");
    }
  },

  async handleClose(chatId: number, messageId: number, userId: number) {
    try {
      await UserService.resetSession(userId);
      await TelegramAPI.editMessageText(chatId, messageId, "Session Closed✅");
    } catch (error) {
      console.error("Close error:", error);
      await TelegramAPI.editMessageText(chatId, messageId, "⚠️ Close failed");
    }
  },
};