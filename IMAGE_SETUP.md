# Image Setup Instructions for GGSF Website

This document provides instructions for adding the official logo and photos from Guru Gobind Singh Foundation, Nashik website.

## Required Images

### 1. Logo
- **Location**: `public/ggsf-logo.png`
- **Source**: Download from https://www.ggsf.edu.in/
- **Instructions**: 
  - Visit the GGSF website
  - Right-click on the logo in the header
  - Save as `ggsf-logo.png` in the `public/` folder
  - Recommended size: 200x200px or larger (will be scaled automatically)
  - **Note**: This logo is used in:
    - Header navigation
    - Footer
    - Browser favicon

### 2. Hero Campus Image
- **Location**: `public/gallery/campus-hero.jpg`
- **Source**: Download from the GGSF website photo gallery
- **Instructions**:
  - Visit https://www.ggsf.edu.in/ (Photo Gallery section)
  - Select a high-quality campus overview image
  - Save as `campus-hero.jpg` in the `public/gallery/` folder
  - Recommended size: 1920x1080px or larger

### 3. Gallery Images
Create a `public/gallery/` folder and add the following images:

1. `campus-overview.jpg` - Main campus building/overview
2. `engineering-lab.jpg` - Engineering laboratory
3. `mba-classroom.jpg` - MBA classroom
4. `library.jpg` - Library facility
5. `sports-complex.jpg` - Sports facilities
6. `annual-fest.jpg` - College events/festivals
7. `polytechnic-workshop.jpg` - Polytechnic workshop
8. `auditorium.jpg` - Auditorium

**Instructions for Gallery Images**:
- Visit https://www.ggsf.edu.in/ (Photo Gallery section)
- Download appropriate images matching the titles above
- Save them in the `public/gallery/` folder with the exact filenames listed
- Recommended size: 800x600px or larger
- Format: JPG or PNG

## Folder Structure

After adding images, your folder structure should look like:

```
public/
├── ggsf-logo.png
├── gallery/
│   ├── campus-hero.jpg
│   ├── campus-overview.jpg
│   ├── engineering-lab.jpg
│   ├── mba-classroom.jpg
│   ├── library.jpg
│   ├── sports-complex.jpg
│   ├── annual-fest.jpg
│   ├── polytechnic-workshop.jpg
│   └── auditorium.jpg
├── favicon.ico
└── robots.txt
```

## Fallback Behavior

The website includes fallback mechanisms:
- If the logo is not found, it will display "GGSF" text
- If gallery images are not found, they will display gradient backgrounds with text
- If the hero image is not found, it will use the existing placeholder image

## Notes

- All images should be optimized for web (compressed but maintaining quality)
- Use JPG format for photos and PNG for logos with transparency
- Ensure images are properly licensed or you have permission to use them
- The website will automatically scale images to fit the design

## Quick Setup

1. Create the gallery folder:
   ```bash
   mkdir public/gallery
   ```

2. Download images from https://www.ggsf.edu.in/ and place them in the appropriate locations

3. Restart the development server to see the changes

