import "dotenv/config";
import "express-async-errors";
import express from "express";
import cors from "cors";

import routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

/* 🔑 CORS — frontend access */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

/* Body parsers */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * 🔍 Health Check
 * Used by Docker / monitoring systems
 * Must be BEFORE /api routes and error handler
 */
app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

/* API Routes */
app.use("/api", routes);

/* Error handler MUST be last */
app.use(errorHandler);

export default app;

/* Server start (disabled in tests) */
if (process.env.NODE_ENV !== "test") {
  const port = Number(process.env.PORT) || 4000;

  app.listen(port, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${port}`);
  });
}
