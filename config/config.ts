export const BOT_TOKEN = Deno.env.get("BOT_TOKEN")!;
export const CHANNEL_USERNAME = (Deno.env.get("CHANNEL_USERNAME") || "@Private_Bots").replace(/^@?/, "@");
export const GUERRILLA_MAIL_API = "https://api.guerrillamail.com/ajax.php";
export const ADMIN_ID = 5190902724;

const requiredVars = ["BOT_TOKEN", "CHANNEL_USERNAME"];
requiredVars.forEach((varName) => {
  if (!Deno.env.get(varName)) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});

if (!CHANNEL_USERNAME.startsWith("@")) {
  throw new Error('Invalid CHANNEL_USERNAME: it must start with "@"');
}

export const MONGO_URI = (() => {
  const uri = Deno.env.get("MONGO_URI");
  if (!uri) return null;
  
  if (!uri.includes("authMechanism=")) {
    const separator = uri.includes("?") ? "&" : "?";
    return `${uri}${separator}authMechanism=SCRAM-SHA-1`;
  }
  
  return uri;
})();

export const USE_DB = Boolean(MONGO_URI);
export const CLEAN_USERNAME = CHANNEL_USERNAME.replace(/@/g, '');