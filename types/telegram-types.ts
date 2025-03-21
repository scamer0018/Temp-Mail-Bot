export interface InlineKeyboardButton {
    text: string;
    url?: string;
    callback_data?: string;
  }
  
  export interface InlineKeyboardMarkup {
    inline_keyboard: InlineKeyboardButton[][];
  }
  
  export interface TelegramUser {
    id: number;
    first_name: string;
    username?: string;
  }
  
  export interface TelegramChat {
    id: number;
    type: "private" | "group" | "supergroup" | "channel";
  }
  
  export interface TelegramMessage {
    message_id: number;
    from?: TelegramUser;
    chat: TelegramChat;
    text?: string;
  }
  
  export interface TelegramCallbackQuery {
    id: string;
    from: TelegramUser;
    message?: TelegramMessage;
    data?: string;
  }