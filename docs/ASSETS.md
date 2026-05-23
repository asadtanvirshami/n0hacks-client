# Asset Generation Guide

This guide explains how to generate essential assets for the n0hacks website (OG images and favicons).

---

## 📋 Quick Start

```bash
# 1. Generate OG image (1200x630px)
python3 generate_og_image.py

# 2. Generate simple favicons
python3 generate_favicons.py

# 3. Install dependencies if needed
pip install pillow
```

---

## 🎨 OG Image Generation

### What it does:
Creates a 1200x630px JPEG image optimized for social media sharing (Open Graph).

### What you need:
- Python 3.6+
- Pillow (pip install pillow)

### How to run:
```bash
python3 generate_og_image.py
```

### Output:
- **File:** `/public/og/n0hacks-og.jpg`
- **Size:** 1200x630px
- **Format:** JPEG (quality: 95)
- **Usage:** Automatically used by Open Graph meta tags

### Customization:
Edit `generate_og_image.py` to:
- Change colors
- Modify text
- Adjust layout
- Add logo/image

### Example modifications:
```python
# Change colors
bg_color = "#001a0f"  # Darker background
primary_color = "#22c55e"  # Brighter green
accent_color = "#84cc16"  # Different accent

# Change text
title = "n0hacks"
subtitle = "Your Custom Subtitle"
tagline = "Your Custom Tagline"
```

---

## 🎯 Favicon Generation

### What it does:
Creates favicon.ico and apple-touch-icon.png for browser tabs and iOS devices.

### What you need:
- Python 3.6+
- Pillow (pip install pillow)

### How to run:
```bash
python3 generate_favicons.py
```

### Output:
- **File 1:** `/public/favicon.ico` (32x32px)
- **File 2:** `/public/apple-touch-icon.png` (180x180px)
- **File 3:** `/public/favicon-*.png` (16, 32, 64, 128, 256px variants)

### For Production Quality:
The generated favicons are simple/basic. For professional quality:

**Option 1: Use Realfavicongenerator.net** (Recommended)
1. Go to https://realfavicongenerator.net/
2. Upload `/public/images/logo.svg`
3. Choose your colors
4. Generate package
5. Replace files in `/public/`

**Option 2: Use ImageMagick** (Command-line)
```bash
# Convert SVG to favicon.ico
convert -density 256x256 -background transparent \
  public/images/logo.svg \
  -define icon:auto-resize=256,128,96,64,48,32,16 \
  public/favicon.ico

# Create apple-touch-icon
convert -density 192 -background transparent \
  public/images/logo.svg \
  -resize 180x180 \
  public/apple-touch-icon.png
```

**Option 3: Use Figma** (Design tool)
1. Import SVG to Figma
2. Create 32x32 and 180x180 frames
3. Export as PNG/ICO

---

## 🚀 Verification

### Check OG image:
```bash
# Verify file exists
ls -lh public/og/n0hacks-og.jpg

# Check on social media preview:
# https://www.opengraph.xyz/
# https://metatags.io/
```

### Check favicons:
```bash
# Verify files exist
ls -lh public/favicon.ico
ls -lh public/apple-touch-icon.png

# Open in browser
# - Right-click on browser tab → Inspect
# - Check Network tab for favicon requests
```

### Test in browser:
1. Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
2. Open DevTools (F12)
3. Go to Network tab
4. Filter for "favicon" or "apple"
5. Verify files are loaded

---

## 📦 Manual Asset Creation

### If scripts fail, manual steps:

#### Create OG Image manually:
1. **Use Canva:**
   - Go to https://www.canva.com/
   - Create new design
   - Set size: 1200x630px
   - Add n0hacks branding
   - Download as JPG
   - Place in `/public/og/n0hacks-og.jpg`

2. **Use Figma:**
   - Create 1200x630 frame
   - Design OG image
   - Export as JPG
   - Place in `/public/og/n0hacks-og.jpg`

3. **Use Photoshop:**
   - New document: 1200x630px
   - Add background: #000a08
   - Add text and logo
   - Export as JPG (quality 90-95)
   - Place in `/public/og/n0hacks-og.jpg`

#### Create favicons manually:
1. **Use Favicon Generator:**
   - Go to https://realfavicongenerator.net/
   - Upload logo.svg
   - Customize
   - Download package
   - Extract to `/public/`

2. **Use Online Tool:**
   - https://convertio.co/svg-ico/
   - https://icoconvert.com/
   - Upload SVG, download ICO

---

## 🔍 File Structure

After running generators, your public directory should look like:

```
public/
├── favicon.ico                 # Browser tab icon
├── apple-touch-icon.png       # iOS home screen icon
├── favicon-16x16.png          # Extra variant
├── favicon-32x32.png          # Extra variant
├── favicon-64x64.png          # Extra variant
├── favicon-128x128.png        # Extra variant
├── favicon-256x256.png        # Extra variant
├── robots.txt                 # SEO
├── sitemap.xml                # SEO
├── manifest.json              # PWA
├── og/
│   └── n0hacks-og.jpg        # Social media preview
├── images/
│   ├── logo.svg
│   ├── hooded.svg
│   └── ...
├── portfolio-n0hacks/
│   ├── Ecoadvance.png
│   ├── DataHarvx.png
│   └── ...
└── locales/
    ├── en.json
    └── es.json
```

---

## 🐛 Troubleshooting

### "ModuleNotFoundError: No module named 'PIL'"
```bash
pip install pillow
```

### "Image is too small"
Edit the script to increase dimensions:
```python
# For OG image
width, height = 1200, 630  # Already default

# For favicon
favicon = Image.new('RGBA', (32, 32), ...)  # Increase 32 to higher
```

### "Favicons not showing in browser"
1. Clear browser cache: Ctrl+Shift+Delete
2. Hard refresh: Ctrl+Shift+R
3. Check file permissions: `chmod 644 public/favicon.ico`
4. Check Network tab in DevTools to ensure files load

### "OG image not showing on social media"
1. Use https://www.opengraph.xyz/ to debug
2. Check that image is exactly 1200x630px
3. Verify path: `/public/og/n0hacks-og.jpg`
4. Wait 24-48 hours for social cache to clear
5. Use social media cache clearing tools:
   - Facebook: https://developers.facebook.com/tools/debug/
   - Twitter: https://twittercommunity.com/t/how-to-get-twitter-to-re-scrape-your-site-meta-tags/1395
   - LinkedIn: https://linkedin.com/feed/refresh/

---

## 📚 Resources

- **Pillow Docs:** https://pillow.readthedocs.io/
- **OG Protocol:** https://ogp.me/
- **Favicon Generator:** https://realfavicongenerator.net/
- **Canva:** https://www.canva.com/
- **Figma:** https://www.figma.com/
- **ImageMagick:** https://imagemagick.org/

---

## ✅ Checklist

- [ ] Run `python3 generate_og_image.py`
- [ ] Run `python3 generate_favicons.py`
- [ ] Verify files in `/public/og/` and `/public/`
- [ ] Test in browser (clear cache, hard refresh)
- [ ] Test OG image on https://www.opengraph.xyz/
- [ ] Test on social media (Twitter, LinkedIn, Facebook)
- [ ] Deploy to production
- [ ] Verify live on https://n0hacks.com

---

**Created:** 2026-05-23  
**Status:** Ready for use ✓
