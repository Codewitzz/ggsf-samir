# GGSF Project Documentation

## 1) Project Overview

This project is a React + TypeScript single-page website for a college/institute, with:

- Public-facing pages (Home, Admissions, Departments, Alumni, Placements, Gallery, etc.)
- Admin-managed content for notices, downloads, gallery/media, inline image replacement, and alumni entries
- Local browser storage as primary state
- Supabase as shared remote persistence/sync layer

The application uses `HashRouter`, so URL navigation works on static hosting too.

---

## 2) Tech Stack

- Frontend: React 18, TypeScript, Vite
- Routing: `react-router-dom` (Hash-based)
- UI: Tailwind CSS + shadcn/radix components
- Animations: GSAP (with ScrollTrigger)
- Backend service: Supabase (REST via `@supabase/supabase-js`)
- Storage model:
  - Local (`localStorage`) for immediate UX and offline-friendly behavior
  - Supabase tables for shared state between users/systems

---

## 3) High-Level Architecture

Main app entry is `src/App.tsx`, which:

- Registers all routes
- Initializes direct DB sync through `initDirectDbSync()`
- Mounts global helpers such as:
  - `AdminInlineImageEditor` (inline image replacement mode)
  - `AIChatBot`

Data flows:

1. Admin updates data in UI
2. Store writes to `localStorage`
3. Store dispatches custom window event (`ggsf_admin_*_changed`)
4. `directDbSync` listens to events and debounced-pushes latest state to Supabase
5. On app load, `directDbSync` hydrates local state from Supabase tables

---

## 4) Folder Structure (Important Areas)

- `src/pages/` - Route-level pages
- `src/components/` - Reusable UI/feature components
- `src/lib/notices/` - Admin auth + notices state
- `src/lib/downloads/` - Downloads cards and override state
- `src/lib/adminImages/` - Slot image overrides + gallery images state
- `src/lib/gallery/` - Gallery sections/folders structure
- `src/lib/alumni/` - Alumni registration/story admin state
- `src/lib/db/directDbSync.ts` - Supabase hydration + push sync
- `src/lib/supabase/client.ts` - Supabase client initialization
- `sql/direct_admin_tables.sql` - Database schema + RLS/policies/grants
- `documentation/` - Project documentation (this file)

---

## 5) Page-Wise Documentation

## Public Pages

### Home (`/`)
- Built from multiple section components
- Reads dynamically managed admin content where relevant (notices, downloads, images)

### About, Contact, Events, Gallery, Downloads, FAQ, Testimonials
- Dedicated route pages under `src/pages/`
- Content is static + admin-overridable in some sections

### Departments + Program Pages
- Includes Engineering, MBA, BBA, ME, School and related sub-routes (academics, admissions, facilities, etc.)

### Admissions / Campus / Library / MoU / Placements / Student Corner
- Public information pages
- Some sections consume admin-managed content/images

### Alumni (`/alumni`)
- Public alumni information page
- Includes:
  - Hero
  - Stats
  - Aims & Objectives
  - Alumni voices
  - Benefits
  - Executive body
  - Get Involved action block
- Get Involved actions currently route to admin-managed alumni workflow and gallery:
  - Register as Alumni -> `/alumni/register`
  - Share Your Story -> `/alumni/stories`
  - View Gallery -> `/alumni/gallery`

---

## Admin Pages

### Admin Notices (`/admin/notices`)
- Login-protected admin page
- Manage notices and announcements displayed on website
- Supports image + PDF attachments
- Main admin features:
  - Create additional admin accounts
  - Change admin passwords
  - Delete admin users (non-main only)

### Admin Downloads (`/admin/downloads`)
- Login-protected
- Add custom download cards and edit built-in cards
- Supports file uploads/URLs and metadata overrides

### Admin Gallery (`/admin/gallery`)
- Login-protected
- Manage gallery section cards, folders/albums, and image uploads

### Admin Images (`/admin/images`)
- Informational redirect-style helper page
- Points admins to live image editing + gallery tools

### Admin Alumni (`/admin/alumni`)
- Login-protected
- Dedicated management for:
  - Alumni registrations
  - Alumni stories
- Add and delete records from admin UI

### Alumni Admin Entry Routes
- `/alumni/register` and `/alumni/stories` are wired to `AdminAlumni` for admin-managed input flow

---

## 6) Section-Wise Documentation (Cross-Feature)

### Header/Footer/Nav
- Shared site navigation + quick links
- Includes access paths to main public pages and admin tools

### Notices Section
- Data source: `adminNoticesStore`
- Behavior:
  - Local save + live UI update
  - Sync event: `ggsf_admin_notices_changed`
  - Remote table: `site_notices_state`

### Downloads Section
- Data source: `adminDownloadsStore`
- Supports custom cards + default card overrides
- Sync event: `ggsf_admin_downloads_changed`
- Remote table: `site_downloads_state`

### Images + Inline Edit Section
- Slot image override + gallery media handled in `adminImagesStore`
- Inline edit tool (`AdminInlineImageEditor`) lets logged-in admin click-and-replace on-page images
- Sync event: `ggsf_admin_images_changed`
- Remote table: `site_images_state`

### Gallery Section
- Folder hierarchy and section overrides:
  - `galleryFoldersStore`
  - `gallerySectionOverridesStore`
- Sync events:
  - `ggsf_admin_gallery_folders_changed`
  - `ggsf_admin_gallery_sections_changed`
- Remote table: `site_gallery_state`

### Alumni Section
- Admin state source: `adminAlumniStore`
- Records:
  - Registrations
  - Stories
- Sync event: `ggsf_admin_alumni_changed`
- Remote table: `site_alumni_state`

---

## 7) Authentication and Admin Permission Model

Admin auth is handled in `adminNoticesStore` and reused across admin pages:

- Main admin fallback from env:
  - `VITE_ADMIN_USERNAME`
  - `VITE_ADMIN_PASSWORD`
- Additional admins are stored in Supabase table `site_admin_accounts`
- Passwords are hashed in browser with SHA-256 before storing/comparing
- Session stored in localStorage with expiry window
- Session includes:
  - `username`
  - `isMainAdmin`

Main-admin-only operations:

- Create admin account
- Change admin password
- Delete admin account (except main admin records)

---

## 8) Database Documentation (Supabase)

All SQL is maintained in `sql/direct_admin_tables.sql`.

### Tables Used

1. `site_notices_state`
   - `id`, `items`, `settings`, `updated_at`

2. `site_downloads_state`
   - `id`, `items`, `default_overrides`, `updated_at`

3. `site_images_state`
   - `id`, `overrides`, `gallery`, `updated_at`

4. `site_gallery_state`
   - `id`, `folders`, `section_overrides`, `updated_at`

5. `site_admin_accounts`
   - `username`, `password_hash`, `is_main_admin`, `created_by`, `created_at`, `updated_at`

6. `site_alumni_state`
   - `id`, `registrations`, `stories`, `updated_at`

### RLS / Policies / Grants

- RLS enabled on all tables
- Current setup allows read/write policies for `anon`/`authenticated` roles (project-specific decision)
- Grants include required `select/insert/update` and delete for `site_admin_accounts`

Note: This is convenient for direct browser sync, but for production-hardening, move writes behind secure server-side APIs.

---

## 9) Database Sync Working (How It Works)

Sync engine: `src/lib/db/directDbSync.ts`

### Hydration (App Start)
- On startup, each feature state is fetched from corresponding table by `id='default'`
- Local stores are replaced with fetched remote state

### Push (On Admin Change)
- Stores emit custom events on change
- `directDbSync` listens and debounces pushes (default 1500ms)
- Each push performs Supabase `upsert` with latest JSON payload
- `updated_at` is explicitly set using `new Date().toISOString()` to guarantee timestamp change

### Error Handling
- Push methods log warnings if Supabase write fails
- This helps diagnose “data not updating in DB” issues

---

## 10) Environment Configuration

From `.env.example`:

- `VITE_GEMINI_API_KEY` - AI chatbot key (optional)
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` or `VITE_SUPABASE_PUBLISHABLE_KEY` - Supabase public key

Optional admin fallback credentials in local env:

- `VITE_ADMIN_USERNAME`
- `VITE_ADMIN_PASSWORD`

---

## 11) Typical Admin Workflow

1. Login on any admin page
2. Add/update content (notice/download/gallery/image/alumni)
3. Local UI updates immediately
4. Sync pushes to Supabase in background
5. Other sessions receive latest data on reload/hydration

---

## 12) Troubleshooting Guide

### Issue: Updated photo not visible in DB
- Check browser console for sync warning logs from `directDbSync`
- Verify row `id='default'` in `site_images_state`
- Confirm `updated_at` is changing
- Confirm Supabase credentials are correct in `.env`
- Confirm SQL file has been run and table/policies/grants exist

### Issue: Admin login fails
- Verify env main admin credentials
- Verify `site_admin_accounts` contains expected user
- Verify password update/create succeeded in DB

### Issue: Alumni entries not persisting remotely
- Ensure `site_alumni_state` table exists (run SQL script)
- Check `updated_at` and JSON fields (`registrations`, `stories`)

---

## 13) Suggested Future Improvements

- Replace client-side direct DB writes with secured server/API endpoints
- Use Supabase Auth for role-based access control
- Add audit logging for admin actions
- Add admin sync status badge in UI (last sync success/failure timestamp)
- Add export/import tools for admin-managed datasets

---

## 14) Quick Start (Developer)

1. Install dependencies:
   - `npm install`
2. Set env:
   - Fill `.env` with Supabase keys and optional admin credentials
3. Apply DB schema:
   - Run `sql/direct_admin_tables.sql` in Supabase SQL Editor
4. Run:
   - `npm run dev`
5. Build check:
   - `npm run build`

