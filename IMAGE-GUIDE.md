# 📸 Image Placement Guide

Your portfolio uses 4 images in 2 main sections. Replace the placeholder files in `src/assets/images/` with your actual photos.

## 🖼️ Image Locations

### 1. HERO SECTION (Top of Page - Right Side)

```
┌─────────────────────────────────────────────────┐
│                                   ┌───────────┐ │
│   HANNAH JOHN                     │           │ │
│   Software Engineer               │  HERO-    │ │
│                                   │ CLIMBING  │ │  ← Main climbing photo
│   [See my work →]                 │   .jpg    │ │    (Large vertical)
│                                   │           │ │    600×800px portrait
│                         ┌─────┐   │           │ │
│                         │HERO-│   └───────────┘ │
│                         │MTN  │                 │  ← Small mountain photo
│                         │.jpg │                 │    (Landscape overlay)
│                         └─────┘                 │    320×260px
└─────────────────────────────────────────────────┘
```

**big-hero.jpg**
- Location: Hero section, main photo card
- Size: 600×800px (portrait orientation)
- Purpose: Showcase personality/activity (climbing, outdoor, active)
- Filters applied: saturate(0.65) sepia(0.12)

**small-hero.jpg**
- Location: Hero section, smaller overlapping photo
- Size: 320×260px (landscape orientation)
- Purpose: Secondary personality photo
- Filters applied: saturate(0.5) sepia(0.1)

---

### 2. ABOUT SECTION (Middle of Page - Photo Collage)

```
┌─────────────────────────────────────────────────┐
│   ABOUT ME                                      │
│                                                 │
│   ┌─────────────┐                              │
│   │   ABOUT-    │                              │  ← Main portrait
│   │  PORTRAIT   │                              │    (Large photo)
│   │    .jpg     │             ┌──────────┐    │    480×580px portrait
│   │             │             │ ABOUT-   │    │
│   │             │             │ OUTDOORS │    │  ← Outdoor activity
│   └─────────────┘             │   .jpg   │    │    (Landscape overlap)
│                               │          │    │    420×380px
│                               └──────────┘    │
└─────────────────────────────────────────────────┘
```

**about-portrait.jpg**
- Location: About section, primary photo (left)
- Size: 480×580px (portrait orientation)
- Purpose: Professional/personal portrait
- Filters applied: saturate(0.72)

**about-outdoors.jpg**
- Location: About section, secondary photo (bottom-right)
- Size: 420×380px (landscape orientation)
- Purpose: Outdoor/hobby activity (hiking, climbing, etc.)
- Filters applied: saturate(0.6) sepia(0.08)

---

## 🎨 Image Tips

- **Natural lighting** works best (filters add warmth/vintage feel)
- **JPG format** recommended for photos (smaller file size)
- **Compress images** before adding to keep site fast
- All images have **decorative tape** overlays in the UI
- Photos are **rotated slightly** for scrapbook aesthetic

## 🔄 How to Replace

1. Save your photos with the exact filenames above
2. Replace the placeholder files in `src/assets/images/`
3. Run `npm run dev` to preview
4. Run `npm run build` to build for production

The code is already configured - just drop in your photos!
