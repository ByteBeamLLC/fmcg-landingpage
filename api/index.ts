/**
 * Vercel serverless entry for the Express API.
 *
 * vercel.json rewrites /api/(.*) → /api/index so all /api/* requests are
 * handled by this single function. Inside, we mount the same routes used
 * locally via `registerRoutes(app)`. Path-prefix-aware: Express sees the
 * full /api/... URL because Vercel forwards req.url unchanged.
 */

import express, { type Request, type Response, type NextFunction } from "express";
// Explicit .js extension: the project is ESM ("type":"module") and both
// `server/routes.ts` (file) and `server/routes/` (directory) exist. Without
// the extension Node's ESM resolver tries the directory and throws
// ERR_UNSUPPORTED_DIR_IMPORT in production.
import { registerRoutes } from "../server/routes.js";

export const config = {
  // Long-running LLM calls for SFDA tools may take 30–120s. Pro tier on
  // Vercel allows up to 300s. Hobby tier caps at 60s — a long gap analysis
  // could time out there; consider Pro if hitting limits.
  maxDuration: 300,
};

const app = express();

// Match the local server's body limit so SFDA base64 file uploads pass through.
app.use(express.json({ limit: "60mb" }));
app.use(express.urlencoded({ limit: "60mb", extended: false }));

// Register routes once per cold-start. Vercel reuses the function instance
// across warm invocations, so the promise is awaited at the top level.
const ready: Promise<void> = (async () => {
  await registerRoutes(app);
  app.use(
    (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
      const status =
        (err as { status?: number; statusCode?: number })?.status ||
        (err as { status?: number; statusCode?: number })?.statusCode ||
        500;
      const message = err instanceof Error ? err.message : "Internal Server Error";
      console.error("[api] Unhandled error:", err);
      res.status(status).json({ error: message });
    }
  );
})();

export default async function handler(req: Request, res: Response) {
  await ready;
  return app(req, res);
}
