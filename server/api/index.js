import app from '../src/server.js';

// Vercel serverless function wrapper
export default async function handler(req, res) {
  // Ensure the request path includes /api prefix for Express routing
  if (!req.url.startsWith('/api')) {
    req.url = '/api' + req.url;
  }
  
  // Pass to Express app
  return app(req, res);
}