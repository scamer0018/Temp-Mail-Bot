import { CommandHandlers } from "./commandHandlers.ts";
import { CallbackHandlers } from "./callbackHandlers.ts";
import { UserService } from "../services/user.service.ts";

export async function handleUpdate(update: any) {
  if (update.message) {
    const msg = update.message;
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    
    if (msg.text === "/start") await CommandHandlers.handleStart(chatId, userId);
    if (msg.text === "/users") await CommandHandlers.handleUsers(chatId, userId);
  }

  if (update.callback_query) {
    const callback = update.callback_query;
    const chatId = callback.message.chat.id;
    const messageId = callback.message.message_id;
    const userId = callback.from.id;
    const data = callback.data;

    const user = await UserService.findOrCreate(userId);

    switch (data) {
      case "generate":
        await CallbackHandlers.handleGenerate(chatId, messageId, userId);
        break;
      case "refresh":
        await CallbackHandlers.handleRefresh(chatId, messageId, user);
        break;
      case "close":
        await CallbackHandlers.handleClose(chatId, messageId, userId);
        break;
    }
  }
}