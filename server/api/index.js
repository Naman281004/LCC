import app from '../src/server.js';

// Vercel serverless function wrapper
export default async function handler(req, res) {
  // Set CORS headers immediately for all requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Vary', 'Origin');
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Ensure the request path includes /api prefix for Express routing
  if (!req.url.startsWith('/api')) {
    req.url = '/api' + req.url;
  }
  
  // Pass to Express app
  return app(req, res);
}