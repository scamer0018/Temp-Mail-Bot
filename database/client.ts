import { MongoClient } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { config } from "../config/env.ts";

const client = new MongoClient();

try {
  await client.connect(config.mongoUri);
  console.log("✅ Connected to MongoDB");
} catch (error) {
  console.error("❌ Database connection error:", error);
  Deno.exit(1);
}

export const db = client.database("temp_mail_bot");
export const usersCollection = db.collection("users");