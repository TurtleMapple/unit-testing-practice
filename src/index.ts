import { Hono } from "hono";
import { serve } from "@hono/node-server";
import passwordRoutes from "./routes/routes";

const app = new Hono();

// Daftarkan route
app.route("/", passwordRoutes);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

export default app;
