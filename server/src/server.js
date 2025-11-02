import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import certificateRoutes from './routes/certificateRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Highly permissive CORS configuration for testing Vercel deployment
// This will allow all origins to ensure CORS headers are present.
const corsOptions = {
  origin: '*', // Allow all origins for testing
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  optionsSuccessStatus: 200,
  preflightContinue: false
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Request logging middleware (for debugging routing issues)
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_ROUTES) {
    console.log(`[${req.method}] ${req.path}`, { query: req.query, params: req.params });
  }
  next();
});

// Body parser
app.use(express.json());

// API Routes - Mounted with /api prefix for uniform routing
app.use('/api/auth', authRoutes);
app.use('/api/certificate', certificateRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'LCC Backend API is running',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth/*',
      certificates: '/api/certificate/*'
    }
  });
});

// Convenience health check
app.get('/health', (req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

// 404 handler - Must be after all routes
app.use((req, res) => {
  console.error(`404 Not Found: ${req.method} ${req.path}`);
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
    method: req.method,
    message: 'The requested endpoint does not exist'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server locally; on Vercel we export the app
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📝 API Base URL: http://localhost:${PORT}/api`);
  });
}

export default app;