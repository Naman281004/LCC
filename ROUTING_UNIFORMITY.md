# Uniform Routing Pattern - LCC Certificate Verification Portal

## Overview
This document defines the **uniform routing pattern** used throughout the codebase to ensure consistency between frontend, backend, and Vercel deployment.

## Routing Architecture

### Frontend (Client)
- **Base URL Configuration**: `client/src/lib/axios.js`
  - **Production**: `https://lcc-qvi2.vercel.app/api`
  - **Local Development**: `http://localhost:5000/api`
  - **Custom**: Can be set via `VITE_API_URL` environment variable (must include `/api`)

- **API Call Pattern**: All components use `axiosInstance` with relative paths
  - Authentication: `/auth/*` (e.g., `/auth/login`, `/auth/otp/verify`)
  - Certificates: `/certificate/*` (e.g., `/certificate`, `/certificate/:id`)
  - **Never include `/api` in the path** - it's already in baseURL

### Backend (Server)
- **Route Mounting**: `server/src/server.js`
  - Authentication routes: `app.use('/api/auth', authRoutes)`
  - Certificate routes: `app.use('/api/certificate', certificateRoutes)`
  - Health check: `app.get('/api/health', ...)`

- **Route Definitions**:
  - `server/src/routes/authRoutes.js`: Defines routes relative to `/api/auth`
    - `/login`, `/2fa/verify`, `/otp/verify`, `/otp/resend`, `/2fa/generate`, `/admin`
  - `server/src/routes/certificateRoutes.js`: Defines routes relative to `/api/certificate`
    - `/:id` (GET - public), `/` (GET, POST - admin), `/:id` (PUT, DELETE - admin)

### Final URL Pattern
All API requests follow this pattern:
```
https://lcc-qvi2.vercel.app/api/{resource}/{action}
```

Examples:
- `POST /api/auth/login`
- `POST /api/auth/otp/verify`
- `GET /api/certificate/12345`
- `GET /api/certificate`
- `POST /api/certificate`
- `PUT /api/certificate/12345`
- `DELETE /api/certificate/12345`

## Vercel Deployment

### API Entry Points
- `server/api/index.js`: Exports Express app (handles `/api` root)
- `server/api/[...path].js`: Catch-all route (handles all `/api/*` paths)

Both files simply export the Express app:
```javascript
import app from '../src/server.js';
export default app;
```

### Vercel Configuration Requirements
1. **Root Directory**: Must be set to `server`
2. **Build Command**: `npm ci && npm run vercel-build`
3. **Output Directory**: Empty (not used for serverless functions)

## Component Route Usage

### Frontend Components Using axiosInstance

1. **AdminLoginPage.jsx**
   - `POST /auth/login`

2. **VerifyOTP.jsx**
   - `POST /auth/otp/verify`
   - `POST /auth/otp/resend`

3. **Verify2FA.jsx**
   - `POST /auth/2fa/verify`

4. **AdminDashboard.jsx**
   - `GET /certificate`
   - `POST /certificate`
   - `PUT /certificate/:id`
   - `DELETE /certificate/:id`
   - `PUT /auth/admin`

5. **CertificateSearch.jsx**
   - `GET /certificate/:id`

## Rules for Uniform Routing

### ✅ DO:
- Use `axiosInstance` for all API calls in frontend
- Use relative paths starting with `/auth` or `/certificate`
- Mount backend routes at `/api/auth` and `/api/certificate`
- Keep Vercel API entry files simple (just export Express app)

### ❌ DON'T:
- Hardcode full URLs (e.g., `http://localhost:5000/api/auth/login`)
- Include `/api` in frontend API call paths (it's in baseURL)
- Mount backend routes without `/api` prefix
- Add CORS headers manually in Vercel entry files (use Express CORS middleware)

## Debugging

### Enable Route Logging
Set environment variable `DEBUG_ROUTES=true` to see all incoming requests in server logs:
```
[POST] /api/auth/login { query: {}, params: {} }
[GET] /api/certificate/12345 { query: {}, params: { id: '12345' } }
```

### Common Issues
1. **404 on Vercel**: Check that Root Directory is set to `server` and API entry files exist
2. **CORS errors**: Ensure `server/src/server.js` has CORS middleware applied
3. **Path mismatches**: Verify frontend calls don't include `/api` and backend mounts do include `/api`

## Verification Checklist
- [ ] All frontend components use `axiosInstance`
- [ ] All frontend API calls use relative paths (`/auth/*`, `/certificate/*`)
- [ ] No hardcoded URLs in frontend
- [ ] Backend routes mounted at `/api/auth` and `/api/certificate`
- [ ] Vercel entry files (`server/api/index.js`, `server/api/[...path].js`) exist and export Express app
- [ ] CORS middleware configured in `server/src/server.js`
- [ ] BaseURL in `client/src/lib/axios.js` includes `/api` suffix

