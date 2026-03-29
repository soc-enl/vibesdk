import { createMiddleware } from 'hono/factory';
import { getPreviewDomain } from 'worker/utils/urls';


export const ensurePreviewDomain = createMiddleware(async (c, next) => {
  const previewDomain = getPreviewDomain(c.env);
  if (!previewDomain || previewDomain.trim() === '') {
    return c.json({ error: 'Preview domain not configured' }, 500);
  }
  return next();
});
