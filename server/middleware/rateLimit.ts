import rateLimit from "express-rate-limit";

/**
 * Rate limiter for AI-powered tools
 * Limits to 10 requests per hour per IP address
 */
export const aiToolsLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 requests per hour per IP
  message: {
    error: "Rate limit exceeded. Try again in an hour or sign up for unlimited access.",
    retryAfter: 3600,
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  keyGenerator: (req) => {
    // Use X-Forwarded-For if behind a proxy, otherwise use IP
    return (
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      req.ip ||
      "unknown"
    );
  },
  skip: (req) => {
    // Skip rate limiting for status endpoints
    return req.path === "/api/tools/status" || req.path === "/api/tools/rate-limit-status";
  },
});

/**
 * More lenient rate limiter for general tool endpoints
 * Limits to 100 requests per 15 minutes per IP
 */
export const generalToolsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per 15 minutes per IP
  message: {
    error: "Too many requests. Please try again later.",
    retryAfter: 900,
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return (
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      req.ip ||
      "unknown"
    );
  },
});

/**
 * Store for tracking rate limit info (used by status endpoint)
 */
export const getRateLimitInfo = (req: any) => {
  const key =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.ip ||
    "unknown";

  // Get remaining requests from headers if available
  const remaining = req.rateLimit?.remaining ?? 10;
  const resetTime = new Date(Date.now() + (req.rateLimit?.resetTime ?? 3600000));

  return {
    remaining,
    resetTime: resetTime.toISOString(),
    limit: 10,
    windowMs: 3600000,
  };
};
