# CRITICAL VERCEL CONFIGURATION FIX

## The Problem
CORS errors persist because Vercel is NOT routing requests to your serverless functions. This means:
1. Requests hit Vercel's edge network
2. Vercel returns 404 (without CORS headers)
3. Browser blocks the request

## Root Cause
Your Vercel project's **Root Directory** setting is likely NOT correctly set to `server`, or Vercel is not recognizing the `api/` folder structure.

## IMMEDIATE FIX - Do These Steps EXACTLY

### Step 1: Verify Vercel Root Directory
1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Click on your backend project: `lcc-qvi2`
3. Click "Settings" tab
4. Click "General" in the left sidebar
5. Scroll to "Root Directory"
6. **It MUST show: `server`** (not empty, not `.`, not `./server`)
7. If it's wrong, click "Edit", type `server`, click "Save"

### Step 2: Verify Build Settings
1. Still in Settings, click "Build & Output"
2. **Build Command**: Must be `npm ci && npm run vercel-build`
3. **Output Directory**: Must be EMPTY (not `dist`, not `build`)
4. **Install Command**: Should be `npm install` (or empty for auto-detect)
5. If any are wrong, click "Edit", fix them, click "Save"

### Step 3: Force Redeploy with Cache Clear
1. Click "Deployments" tab
2. Find the LATEST deployment (top of list)
3. Click the "..." (three dots) on the right
4. Click "Redeploy"
5. **✅ CRITICAL: Check the box "Clear build cache"**
6. Click "Redeploy" button
7. Wait for deployment (2-3 minutes)

### Step 4: Verify Functions Were Created
1. After deployment completes, click "Functions" tab
2. You MUST see these 3 functions listed:
   - `api/[...path]`
   - `api/index`
   - `api/health`
3. If you DON'T see them, the Root Directory is wrong

### Step 5: Test Immediately
Open these URLs in your browser:

1. **Test 1**: https://lcc-qvi2.vercel.app/
   - Should show: JSON with "LCC Backend API is running"

2. **Test 2**: https://lcc-qvi2.vercel.app/api/health
   - Should show: JSON with `{"status":"OK",...}`

3. **Test 3**: https://lcc-qvi2.vercel.app/api/certificate/test
   - Should show: JSON with `{"error":"Certificate not found"}` (404 is OK, but should be JSON with CORS headers)

If ANY of these show "404 - NOT_FOUND" from Vercel (not JSON), the routing is still broken.

## Alternative: Check if Root Directory is Being Ignored

If you've set Root Directory to `server` but it's not working, Vercel might be ignoring it. Try this:

### Option A: Move api folder to project root
```bash
# In your local repo
cd E:\LCC_
mv server/api api
git add -A
git commit -m "fix(vercel): move api folder to project root"
git push
```

Then in Vercel:
- Settings → General → Root Directory: EMPTY (or `.`)
- Redeploy with "Clear build cache"

### Option B: Use explicit vercel.json routing
Create `server/vercel.json`:
```json
{
  "functions": {
    "api/**/*.js": {
      "runtime": "@vercel/node@3.0.7"
    }
  }
}
```

Then redeploy with "Clear build cache"

## How to Know if It's Fixed

✅ **Functions tab shows 3 functions**
✅ **https://lcc-qvi2.vercel.app/api/health returns JSON**
✅ **Browser console shows no CORS errors**
✅ **Certificate search works**
✅ **Login and OTP work**

## If Still Not Working

The issue is 100% with Vercel not routing to your functions. This means:
1. Root Directory is wrong or not applied
2. Vercel isn't detecting the `api/` folder
3. Build is failing silently

### Debug Steps:
1. Check Vercel build logs for "Detected Serverless Functions"
2. Check if `node_modules` and `package-lock.json` exist in `server/` folder
3. Try deploying from Vercel CLI instead:
   ```bash
   npm i -g vercel
   cd E:\LCC_\server
   vercel --prod
   ```

## Last Resort: Manual Function Creation

If automatic detection fails, you can manually specify functions in `server/vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    }
  ]
}
```

Then redeploy with "Clear build cache".

---

**The key point**: If Vercel Functions tab doesn't show your 3 functions, NO amount of code changes will fix CORS. The functions must be deployed first.

