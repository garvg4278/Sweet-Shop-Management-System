// src/server.ts
import express from "express";
import bodyParser from "body-parser";
import routes from "./routes.js"; // ESM requires .js extension
import { fileURLToPath } from "url";

const app = express();

app.use(bodyParser.json());
app.use("/api", routes);

export default app;

// ESM-compatible "run directly" check
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`Server running on ${port}`));
}