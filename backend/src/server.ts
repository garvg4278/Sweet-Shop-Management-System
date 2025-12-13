import "express-async-errors";
import express from "express";
import bodyParser from "body-parser";
import routes from "./routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();

app.use(bodyParser.json());
app.use("/api", routes);

// must be last
app.use(errorHandler);

export default app;

// ESM-safe "run server only if executed directly"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.argv[1] === __filename) {
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`Server running on ${port}`));
}
