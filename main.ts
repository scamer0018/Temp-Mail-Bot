import { serve } from "https://deno.land/std@0.195.0/http/server.ts";
import { BotController } from "./controllers/bot.controller.ts";

serve(async (req) => {
  if (req.method === "POST") {
    try {
      const update = await req.json();
      await BotController.handleUpdate(update);
    } catch (error) {
      console.error("Update error:", error);
    }
  }
  return new Response("OK");
});

console.log("🔥 Temp Mail Bot Running");