import { MongoClient } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { MONGO_URI, USE_DB } from "../config/config.ts";
let client: MongoClient | null = null;
let db: any = null;

if (USE_DB) {
  client = new MongoClient();
  try {
    await client.connect(MONGO_URI!);
    console.log("✅ MongoDB connected");
    db = client.database("temp_mail_bot");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    Deno.exit(1);
  }
}

export const usersCollection = db?.collection("users");