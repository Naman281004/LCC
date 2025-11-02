# Vercel Deployment Configuration Guide

## Critical Vercel Settings for Backend (lcc-qvi2)

### 1. Project Settings → General
- **Root Directory**: `server` ✅ CRITICAL
- **Framework Preset**: Other
- **Node.js Version**: 18.x or 20.x

### 2. Project Settings → Build & Output
- **Build Command**: `npm ci && npm run vercel-build`
- **Output Directory**: *(leave empty)*
- **Install Command**: `npm install`

### 3. Environment Variables
Ensure these are set in Vercel:
- `DATABASE_URL` - Your Neon PostgreSQL connection string
- `JWT_SECRET` - Your JWT secret key
- `EMAIL_USER` - Your email SMTP username
- `EMAIL_PASS` - Your email SMTP password (App Password for Gmail)
- `EMAIL_HOST` - SMTP host (e.g., smtp.gmail.com)
- `EMAIL_PORT` - SMTP port (587 for STARTTLS)
- `EMAIL_SECURE` - false (for port 587)

### 4. Serverless Functions Structure
With Root Directory set to `server`, Vercel maps:
- `server/api/[...path].js` → handles ALL `/api/*` requests
- `server/api/index.js` → handles `/api` root
- `server/api/health.js` → handles `/api/health`

## Current Function Count: 3 (well under 12 limit)

## How It Works

1. **Request Flow**:
   ```
   Browser → https://lcc-qvi2.vercel.app/api/auth/otp/verify
   ↓
   Vercel routes to: server/api/[...path].js
   ↓
   Serverless wrapper sets CORS headers
   ↓
   If OPTIONS: return 200 immediately
   ↓
   If not OPTIONS: prepend /api to path if needed
   ↓
   Pass to Express app
   ↓
   Express routes to /api/auth/otp/verify
   ↓
   authController.verifyOTP() executes
   ↓
   Response with CORS headers
   ```

2. **CORS Handling** (Two Layers):
   - **Layer 1**: Vercel wrapper (`server/api/[...path].js`) sets headers immediately
   - **Layer 2**: Express CORS middleware (`server/src/server.js`) for additional handling

## Deployment Steps

### Step 1: Verify Local Files
```bash
# Check that these files exist with correct content:
ls server/api/[...path].js
ls server/api/index.js
ls server/api/health.js
```

### Step 2: Commit and Push
```bash
git add -A
git commit -m "fix(vercel): simplify to single catch-all serverless function"
git push
```

### Step 3: Deploy on Vercel
1. Go to Vercel Dashboard → lcc-qvi2 project
2. Settings → General → Verify Root Directory = `server`
3. Settings → Build & Output → Verify Build Command = `npm ci && npm run vercel-build`
4. Deployments → Latest Deployment → Click "..." → Redeploy
5. **CRITICAL**: Check "Clear build cache"
6. Click "Redeploy"

### Step 4: Verify Deployment
After deployment completes:

1. **Check Functions Tab**:
   - Should show 3 functions:
     - `api/[...path]`
     - `api/index`
     - `api/health`

2. **Test Health Endpoint**:
   ```
   curl https://lcc-qvi2.vercel.app/api/health
   ```
   Expected: JSON response `{"status":"OK",...}`

3. **Test CORS Preflight**:
   ```bash
   curl -i -X OPTIONS https://lcc-qvi2.vercel.app/api/auth/otp/verify \
     -H "Origin: https://lcc-delta.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type"
   ```
   Expected: 
   - Status: 200 OK
   - Headers include: `Access-Control-Allow-Origin: *`

4. **Test from Frontend**:
   - Open `https://lcc-delta.vercel.app`
   - Try to login and enter OTP
   - Should work without CORS errors

## Troubleshooting

### If CORS errors persist:

1. **Check Vercel Function Logs**:
   - Vercel Dashboard → lcc-qvi2 → Functions → Click on `api/[...path]`
   - View recent invocations and logs
   - Look for errors or missing invocations

2. **Verify Root Directory**:
   - Settings → General → Root Directory must be exactly `server`
   - If it's empty or set to `.`, change it to `server` and redeploy

3. **Check Build Logs**:
   - Deployments → Latest → View Build Logs
   - Look for Prisma generation success
   - Look for "Detected Serverless Functions" section

4. **Test Individual Routes**:
   ```bash
   # Test each endpoint
   curl https://lcc-qvi2.vercel.app/api/health
   curl https://lcc-qvi2.vercel.app/api/auth/login -X POST -H "Content-Type: application/json" -d '{"email":"test@test.com","password":"test"}'
   ```

### Common Issues:

1. **"No 'Access-Control-Allow-Origin' header"**:
   - Means Vercel isn't routing to your function
   - Check Root Directory setting
   - Redeploy with "Clear build cache"

2. **"Prisma Client not generated"**:
   - Check `vercel-build` script in package.json
   - Ensure `prisma generate` runs during build
   - Redeploy with "Clear build cache"

3. **404 errors**:
   - Check that Express routes are mounted at `/api/auth` and `/api/certificate`
   - Check that wrapper prepends `/api` to paths

## Success Criteria

✅ Health endpoint returns JSON
✅ OPTIONS preflight returns 200 with CORS headers
✅ POST requests work without CORS errors
✅ Frontend can login and verify OTP
✅ Certificate search works
✅ Admin dashboard loads and functions work

## Final Notes

- The catch-all `[...path].js` handles ALL nested routes
- No need for individual route files (stays under 12 function limit)
- CORS is handled at the Vercel wrapper level for maximum compatibility
- Express routing remains unchanged (mounted at `/api/auth` and `/api/certificate`)

