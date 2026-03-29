import { createFactory } from "hono/factory";

const { createMiddleware } = createFactory<{ Bindings: Env }>();

export const ensureNonIpHostname = createMiddleware(async (c, next) => {
  const url = new URL(c.req.url);
  const { hostname } = url;

  const ipRegex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  if (ipRegex.test(hostname)) {
    return c.json({ error: 'Access denied. Please use the assigned domain name.' }, 403);
  }

  return next();
});
