export const BOT_TOKEN = Deno.env.get("BOT_TOKEN")!;
export const MONGO_URI = Deno.env.get("MONGO_URI");
export const USE_DB = Boolean(MONGO_URI);
export const CHANNEL_USERNAME = (Deno.env.get("CHANNEL_USERNAME") || "@Private_Bots").replace(/^@?/, "@");
export const ADMIN_ID = 5190902724;
export const GUERRILLA_MAIL_API = "https://api.guerrillamail.com/ajax.php";

const requiredVars = ["BOT_TOKEN", "CHANNEL_USERNAME"];
requiredVars.forEach((varName) => {
  if (!Deno.env.get(varName)) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});