export const config = {
    botToken: Deno.env.get("BOT_TOKEN"),
    mongoUri: Deno.env.get("MONGO_URI"),
    channelName: Deno.env.get("CHANNEL_USERNAME"),
    adminId: 5190902724,
    guerrillaMailAPI: "https://api.guerrillamail.com/ajax.php",
  }; 
