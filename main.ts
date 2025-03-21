import { handleUpdate } from "./handlers/index.ts";

addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      try {
        if (event.request.method === "POST") {
          const update = await event.request.json();
          await handleUpdate(update);
        }
        return new Response("OK");
      } catch (error) {
        console.error("Global error:", error);
        return new Response("Error", { status: 500 });
      }
    })()
  );
});