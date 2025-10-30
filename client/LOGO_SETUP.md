# LCC Logo Setup Guide

## 📝 Instructions to Add Your Logo

Your LCC Computer Center logo needs to be placed in the correct location. Follow these steps:

### Step 1: Prepare Your Logo
1. Save your LCC logo image (the red one with "LCC COMPUTER CENTER")
2. Recommended format: PNG (for transparency) or JPG
3. Recommended size: At least 200px height for clarity

### Step 2: Add Logo to Project

**Option A: Using File Explorer (Easiest)**
1. Open File Explorer and navigate to: `E:\LCC_\client\public\`
2. Copy your logo file to this folder
3. Rename it to: `lcc-logo.png` (or keep the extension as `.jpg` if using JPG)

**Option B: Using Command Line**
```bash
# From project root
cd E:\LCC_

# Copy your logo (replace path with your actual logo path)
copy "C:\path\to\your\logo.png" "client\public\lcc-logo.png"
```

### Step 3: Update File Extension (if needed)
If your logo is a JPG or other format, update these files:

**Files to update:**
- `client/src/components/layout/Navbar.jsx` (line 27)
- `client/src/components/layout/Footer.jsx` (line 19)
- `client/src/components/admin/AdminDashboard.jsx` (line 373)

Change `lcc-logo.png` to `lcc-logo.jpg` (or your format)

### Step 4: Test
1. Save all files
2. Restart the dev server if needed: `npm run dev` (in client folder)
3. Refresh your browser
4. Your logo should now appear in:
   - Navbar (top navigation)
   - Footer
   - Admin Dashboard

## ✅ Logo Features

The logo is now:
- **Clickable** in the navbar - clicking scrolls to home section
- **Responsive** - automatically adjusts size on mobile
- **Consistent** - appears in all key locations
- **Optimized** - uses `object-contain` to maintain aspect ratio

## 🎨 Current Logo Locations

1. **Navbar** (Homepage) - Height: 48px
2. **Footer** - Height: 48px  
3. **Admin Dashboard** - Height: 40px

## 🔧 Troubleshooting

**Logo not showing?**
- Check file name is exactly `lcc-logo.png`
- Check file is in `client/public/` folder
- Hard refresh browser (Ctrl + F5)
- Check browser console for errors

**Logo too big/small?**
- Edit the `h-12` (48px) or `h-10` (40px) classes in the component files
- You can use `h-8` (32px), `h-14` (56px), `h-16` (64px), etc.

**Wrong file format?**
- Update the file extension in all 3 component files mentioned above

## 📁 Current Logo Path
```
client/
  └── public/
      └── lcc-logo.png  👈 Your logo goes here
```

---
*Last updated: October 29, 2025*

