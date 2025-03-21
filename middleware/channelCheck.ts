import { config } from "../config/env.ts";

export async function checkChannelMembership(userId: number): Promise<boolean> {
  try {
    const url = `https://api.telegram.org/bot${config.botToken}/getChatMember?chat_id=${config.channelName}&user_id=${userId}`;
    const response = await fetch(url);
    const data = await response.json();

    return ["member", "administrator", "creator"].includes(data.result?.status);
  } catch (error) {
    console.error("Channel check error:", error);
    return false;
  }
}