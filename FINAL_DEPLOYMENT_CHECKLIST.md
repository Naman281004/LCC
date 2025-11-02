# Final Deployment Checklist - LCC Certificate Verification Portal

## Current Status
- ✅ Uniform routing pattern implemented across codebase
- ✅ CORS handled at Vercel serverless wrapper level
- ✅ Single catch-all function to stay under 12 function limit
- ✅ Path correction logic in place
- ✅ Express routes properly mounted at `/api/auth` and `/api/certificate`

## Serverless Function Structure (3 functions total)
```
server/api/
├── [...path].js      → Handles ALL /api/* requests (catch-all)
├── index.js          → Handles /api root
└── health.js         → Handles /api/health
```

## Deploy Steps

### 1. Commit All Changes
```bash
cd E:\LCC_
git add -A
git commit -m "fix(vercel): final CORS and routing fixes with single catch-all function"
git push
```

### 2. Configure Vercel Backend (lcc-qvi2)

#### A. Settings → General
- **Root Directory**: `server` ← MUST BE EXACTLY THIS
- **Framework Preset**: Other
- **Node.js Version**: 18.x or 20.x

#### B. Settings → Build & Output
- **Build Command**: `npm ci && npm run vercel-build`
- **Output Directory**: *(leave empty)*
- **Install Command**: `npm install`

#### C. Environment Variables
Verify these are set:
- `DATABASE_URL` - Neon PostgreSQL URL
- `JWT_SECRET` - Your secret key
- `EMAIL_USER` - SMTP username
- `EMAIL_PASS` - SMTP password
- `EMAIL_HOST` - smtp.gmail.com (or your SMTP host)
- `EMAIL_PORT` - 587
- `EMAIL_SECURE` - false

### 3. Redeploy with Clear Cache
1. Go to Vercel Dashboard → lcc-qvi2 project
2. Click "Deployments" tab
3. Find the latest deployment
4. Click the "..." menu → "Redeploy"
5. **✅ CHECK "Clear build cache"** ← CRITICAL
6. Click "Redeploy"
7. Wait for deployment to complete (~2-3 minutes)

### 4. Verify Deployment

#### A. Check Functions Tab
- Go to Vercel Dashboard → lcc-qvi2 → Functions
- Should see 3 functions:
  - `api/[...path]`
  - `api/index`
  - `api/health`

#### B. Test Health Endpoint
Open in browser or use curl:
```
https://lcc-qvi2.vercel.app/api/health
```
Expected: JSON response with `{"status":"OK",...}`

#### C. Test CORS Preflight (PowerShell)
```powershell
Invoke-WebRequest -Uri "https://lcc-qvi2.vercel.app/api/auth/otp/verify" `
  -Method OPTIONS `
  -Headers @{
    "Origin"="https://lcc-delta.vercel.app";
    "Access-Control-Request-Method"="POST";
    "Access-Control-Request-Headers"="Content-Type"
  }
```
Expected: Status 200, headers include `Access-Control-Allow-Origin`

#### D. Test from Frontend
1. Open `https://lcc-delta.vercel.app`
2. Try to login with admin credentials
3. Enter OTP when prompted
4. Should work without CORS errors

#### E. Run Automated Test (Optional)
```bash
cd E:\LCC_
node test-vercel-deployment.js
```
Expected: All 4 tests pass

## Success Criteria

✅ **Health endpoint works**: Returns JSON
✅ **CORS preflight works**: Returns 200 with Access-Control-Allow-Origin header
✅ **Login works**: Can login from frontend
✅ **OTP verification works**: Can verify OTP without CORS errors
✅ **Certificate search works**: Can search certificates
✅ **Admin dashboard works**: Can manage certificates

## If CORS Errors Persist

### Step 1: Verify Vercel Configuration
- Settings → General → Root Directory = `server` (not empty, not `.`)
- If changed, redeploy with "Clear build cache"

### Step 2: Check Vercel Logs
- Deployments → Latest → View Build Logs
- Look for "Detected Serverless Functions" section
- Should show 3 functions detected

### Step 3: Check Function Logs
- Functions → `api/[...path]` → View logs
- Make a request from frontend
- Check if function is being invoked
- Look for errors in logs

### Step 4: Verify Files Exist
```bash
ls server/api/[...path].js
ls server/api/index.js
ls server/api/health.js
```
All should exist with CORS wrapper code

### Step 5: Test Locally
```bash
cd server
npm run dev
```
Then test from local frontend:
- Change `VITE_API_URL` to `http://localhost:5000/api`
- If works locally but not on Vercel → Vercel configuration issue

## Common Issues and Solutions

### Issue: "No 'Access-Control-Allow-Origin' header"
**Cause**: Request not reaching Vercel function
**Solution**: 
1. Verify Root Directory = `server`
2. Redeploy with "Clear build cache"
3. Check Functions tab shows 3 functions

### Issue: "404 Not Found"
**Cause**: Express routing mismatch
**Solution**:
1. Check `server/src/server.js` mounts routes at `/api/auth` and `/api/certificate`
2. Check wrapper prepends `/api` if not present
3. Check Express route definitions

### Issue: "Prisma Client not generated"
**Cause**: Build script not running
**Solution**:
1. Verify `package.json` has `vercel-build` and `postinstall` scripts
2. Redeploy with "Clear build cache"
3. Check build logs for Prisma generation

### Issue: "Function invocation timeout"
**Cause**: Database connection or slow query
**Solution**:
1. Check `DATABASE_URL` is correct Neon URL
2. Check database is accessible
3. Increase function timeout in Vercel settings

## Final Notes

- **All routes go through single catch-all**: `server/api/[...path].js`
- **CORS is handled at wrapper level**: Before Express even runs
- **Path correction ensures compatibility**: Wrapper prepends `/api` if needed
- **Express routing unchanged**: Still mounted at `/api/auth` and `/api/certificate`
- **Frontend uses axiosInstance**: BaseURL includes `/api`, paths don't

## Contact/Support

If issues persist after following all steps:
1. Check Vercel deployment logs
2. Check browser network tab for exact error
3. Check Vercel function logs for backend errors
4. Verify all environment variables are set correctly

## Deployment Complete ✅

Once all tests pass, your deployment is complete and the application should work without CORS errors!

