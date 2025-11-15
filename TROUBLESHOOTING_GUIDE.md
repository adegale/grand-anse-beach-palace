# Troubleshooting Guide - Grand Anse Beach Palace

## Quick Diagnosis

### Is the build failing?

**Run this command:**
```bash
npm run build
```

**Expected output:**
```
✓ 1553 modules transformed.
✓ built in 5-6s
```

If you see errors, skip to the [Build Errors](#build-errors) section.

---

### Is Netlify deployment failing?

**Most common causes (in order):**

1. ❌ Environment variables not set in Netlify
2. ❌ Build command incorrect in Netlify
3. ❌ Node version mismatch
4. ❌ Repository not connected properly

**Solution:** See [Netlify-Specific Issues](#netlify-specific-issues)

---

## Environment Variables Issue (MOST COMMON)

### Problem
Netlify deployment fails or the site loads but has no room data.

### Symptoms
- Build succeeds but site doesn't work
- Console error: "Failed to fetch from Supabase"
- Rooms section is empty
- Forms don't submit

### Solution

**Step 1: Check if variables are set**
1. Go to Netlify Dashboard
2. Select your site
3. Go to Site settings → Environment variables
4. Look for `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

**Step 2: If missing, add them**
1. Click "Add a variable"
2. Add these two variables:

```
Key: VITE_SUPABASE_URL
Value: https://shxlifrpkmjbzbcacmpx.supabase.co

Key: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoeGxpZnJwa21qYnpiY2FjbXB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3NjExOTQsImV4cCI6MjA3ODMzNzE5NH0.muwDlfoSCsHqjr0oST2TuEZwowvcsEMN1qwtNLhdn3Y
```

**Step 3: Redeploy**
1. Go to Deploys tab
2. Click "Trigger deploy"
3. Select "Clear cache and deploy site"

---

## Build Errors

### Error: "Cannot find module"

**Example:**
```
Error: Cannot find module 'react'
Error: Cannot find module '@supabase/supabase-js'
```

**Solution:**
```bash
# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall everything
npm install

# Try building again
npm run build
```

---

### Error: "TypeScript compilation failed"

**Example:**
```
src/App.tsx:10:5 - error TS2322: Type 'string' is not assignable to type 'number'
```

**Solution:**
```bash
# Check all TypeScript errors
npm run typecheck

# If there are errors, fix them in the reported files
# Then rebuild
npm run build
```

---

### Error: "Module not found: Can't resolve './components/...'"

**Example:**
```
Module not found: Can't resolve './components/Navigation'
```

**Solution:**
Check that the file exists:
```bash
# List all component files
ls -la src/components/

# If file is missing, restore it from backup or recreate
```

---

## Image Issues

### Problem: Images not showing on deployed site

**Symptoms:**
- Broken image icons
- Alt text showing instead of images
- 404 errors in browser console

**Solution 1: Check build output**
```bash
# Build the project
npm run build

# Check if images are in dist folder
ls -R dist/hotel/
ls dist/hero.jpg

# Images should exist in dist after build
```

**Solution 2: Check image paths**
All public images should use paths like:
- `/hero.jpg` (for public/hero.jpg)
- `/hotel/rooms/6/1.jpg` (for public/hotel/rooms/6/1.jpg)

NOT:
- `./hero.jpg`
- `../public/hero.jpg`
- `/public/hero.jpg`

**Solution 3: Verify images are in Git**
```bash
# Check if images are tracked by Git
git ls-files public/

# If images are missing, add them
git add public/
git commit -m "Add images"
git push
```

---

## Netlify-Specific Issues

### Issue: "Build exceeded maximum allowed runtime"

**Cause:** Build taking too long

**Solution:**
1. Check if there are extremely large files in the repository
2. Consider removing unused assets
3. Implement build caching in netlify.toml:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"
  NPM_FLAGS = "--legacy-peer-deps"
```

---

### Issue: "Command failed with exit code 1: npm run build"

**Cause:** Build script failing on Netlify's servers

**Solution:**

1. **Check Node version match:**
   ```bash
   # Local Node version
   node --version

   # Should be v18.x.x to match netlify.toml
   ```

2. **Test build in clean environment:**
   ```bash
   # Create a fresh directory
   mkdir test-build
   cd test-build

   # Clone your repo
   git clone <your-repo-url> .

   # Install and build
   npm install
   npm run build

   # If this fails, fix the errors before deploying
   ```

3. **Check Netlify build logs:**
   - Go to Netlify Dashboard → Deploys
   - Click on failed deploy
   - Read the full log for specific error messages

---

### Issue: "Page Not Found" after deployment

**Cause:** SPA routing not configured

**Solution:**
Ensure `netlify.toml` has redirects:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This file should already exist in the project root.

---

## Database Issues

### Problem: No rooms showing on the site

**Symptoms:**
- Rooms section is empty
- Console error about Supabase

**Solution:**

1. **Check environment variables** (see above)

2. **Verify Supabase connection:**
   Open browser console on deployed site and check for errors:
   ```
   Failed to fetch
   Error: Invalid Supabase URL
   ```

3. **Check database has data:**
   - Log into Supabase dashboard
   - Go to Table Editor
   - Check `rooms` table has rows
   - If empty, run the migrations:

```sql
-- In Supabase SQL Editor, run:
INSERT INTO rooms (name, description, capacity, rate, image_paths) VALUES
  ('Room 6', 'Cozy ocean view room', 2, 150, ARRAY['/hotel/rooms/6/1.jpg', '/hotel/rooms/6/2.jpg']),
  ('Room 8', 'Spacious suite', 4, 250, ARRAY['/hotel/rooms/8/Ocean View 1.jpg']);
```

---

## Performance Issues

### Problem: Site loads slowly

**Common causes:**
1. Large uncompressed images
2. No caching configured
3. Slow database queries

**Solutions:**

1. **Enable Netlify caching:**
   Add to `netlify.toml`:
   ```toml
   [[headers]]
     for = "/assets/*"
     [headers.values]
       Cache-Control = "public, max-age=31536000, immutable"
   ```

2. **Compress images** (future improvement):
   - Use WebP format
   - Resize to appropriate dimensions
   - Implement lazy loading

3. **Check Supabase region:**
   - Verify Supabase project is in closest region to target audience
   - Consider enabling Supabase's built-in caching

---

## Git and Repository Issues

### Problem: Changes not deploying

**Symptoms:**
- Made changes locally
- Pushed to Git
- Netlify shows old version

**Solution:**

1. **Verify push succeeded:**
   ```bash
   git status
   # Should show: "Your branch is up to date with 'origin/main'"

   git log -1
   # Should show your latest commit
   ```

2. **Check branch settings in Netlify:**
   - Go to Site settings → Build & deploy
   - Under "Branch deploys" check the branch name
   - Make sure you're pushing to the correct branch

3. **Manually trigger deploy:**
   - Go to Deploys tab
   - Click "Trigger deploy"
   - Select "Deploy site"

---

### Problem: Git won't push (repository too large)

**Symptoms:**
```
error: RPC failed; HTTP 413 curl 22 The requested URL returned error: 413
```

**Cause:** Image files are too large for Git

**Solution:**

1. **Remove large files from history:**
   ```bash
   # Install git-filter-repo
   pip install git-filter-repo

   # Remove large files
   git-filter-repo --path public/hotel/rooms --invert-paths
   ```

2. **Use Git LFS for images:**
   ```bash
   # Install Git LFS
   git lfs install

   # Track image files
   git lfs track "*.jpg"
   git lfs track "*.png"

   # Add and commit
   git add .gitattributes
   git commit -m "Configure Git LFS"
   ```

---

## Browser Console Errors

### Common Errors and Solutions

#### Error: "Failed to load resource: net::ERR_FAILED"

**Meaning:** A resource (image, CSS, JS) failed to load

**Solution:**
1. Check Network tab in browser DevTools
2. Note which resource failed
3. Verify the file exists in your dist/ folder
4. Check file path is correct

---

#### Error: "Uncaught TypeError: Cannot read property 'X' of undefined"

**Meaning:** JavaScript trying to access property of undefined variable

**Solution:**
1. Check browser console for file and line number
2. Add null checks in code:
   ```typescript
   // Instead of:
   const name = data.name;

   // Use:
   const name = data?.name ?? 'Default';
   ```

---

#### Error: "CORS policy: No 'Access-Control-Allow-Origin' header"

**Meaning:** API request blocked by browser CORS policy

**Solution:**
1. For Supabase: Check anon key is correct
2. For other APIs: May need to proxy through Netlify Functions

---

## Emergency Reset

If everything is broken and you need to start fresh:

```bash
# 1. Clean everything
rm -rf node_modules package-lock.json dist/

# 2. Reinstall dependencies
npm install

# 3. Build fresh
npm run build

# 4. Verify build output
ls -la dist/

# 5. Test locally
npm run preview
# Visit http://localhost:4173

# 6. If working locally, commit and push
git add .
git commit -m "Reset: Clean build"
git push

# 7. In Netlify, clear cache and redeploy
```

---

## Getting Help

If you're still stuck after trying these solutions:

### Information to Collect

1. **Build command output:**
   ```bash
   npm run build 2>&1 | tee build.log
   ```

2. **Netlify build log:**
   - Full text from Netlify Deploys → Failed Deploy → Log

3. **Browser console errors:**
   - Open DevTools (F12)
   - Go to Console tab
   - Copy all error messages

4. **Environment details:**
   ```bash
   node --version
   npm --version
   git --version
   ```

5. **File verification:**
   ```bash
   ls -la dist/
   file dist/hero.jpg
   ```

### Where to Ask

- Netlify Support: https://answers.netlify.com/
- Supabase Discord: https://discord.supabase.com/
- Stack Overflow: Tag with `netlify`, `vite`, `react`

Include all the information collected above in your question.

---

## Checklist Before Asking for Help

- [ ] Tried `rm -rf node_modules && npm install`
- [ ] Verified `npm run build` succeeds locally
- [ ] Checked environment variables in Netlify
- [ ] Reviewed Netlify build log for specific errors
- [ ] Checked browser console for errors
- [ ] Verified Git push succeeded
- [ ] Tried "Clear cache and deploy" in Netlify
- [ ] Confirmed `netlify.toml` exists in repository root
- [ ] Checked Node version matches netlify.toml (v18)

If you've checked all these and still have issues, provide:
- Full Netlify build log
- Full browser console output
- Screenshot of Netlify environment variables (blur sensitive values)
- Output of `npm run build` locally
