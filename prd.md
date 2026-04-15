# PRD — Web Portfolio UI/UX Designer
## React JS + TailwindCSS + Flowbite + Supabase PostgreSQL
## Dengan fitur CRUD Portfolio (Admin)

---

## 1. Overview

Website ini adalah personal portfolio untuk UI/UX Designer dengan dua area utama:

- Public website untuk visitor
- Admin dashboard untuk pemilik website

Tujuan utama:
- Menampilkan karya secara profesional
- Memudahkan update portfolio melalui CRUD
- Menggunakan arsitektur yang scalable dan maintainable
- Menggunakan database nyata agar siap dikembangkan ke production

---

## 2. Product Goals

### Business Goals
- Menampilkan karya UI/UX secara profesional
- Membantu recruiter dan client memahami pengalaman dan kualitas kerja designer
- Mempermudah pemilik website mengelola portfolio tanpa edit manual pada source code

### Technical Goals
- Menggunakan React untuk arsitektur komponen
- Menggunakan TailwindCSS untuk styling utility-first
- Menggunakan Flowbite untuk komponen UI yang konsisten
- Menggunakan Supabase PostgreSQL sebagai database utama
- Menggunakan Supabase Auth untuk admin login
- Menggunakan Supabase Storage untuk asset gambar portfolio

---

## 3. Tech Stack

### Frontend
- React JS (Vite)
- TailwindCSS
- Flowbite React
- React Router

### Backend / BaaS
- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Storage

### Supporting Libraries
- `@supabase/supabase-js`
- form handling dapat menggunakan React Hook Form atau state biasa
- optional: Zod/Yup untuk validasi

---

## 4. Scope

### In Scope
- Landing page
- Portfolio list
- Portfolio detail
- Contact section
- Admin login
- Admin dashboard
- CRUD portfolio
- Search dan filter portfolio pada admin
- Status draft / publish
- Upload thumbnail dan gallery image ke Supabase Storage
- Penyimpanan data portfolio di Supabase PostgreSQL

### Out of Scope
- Multi-admin role management kompleks
- Blog system
- Analytics dashboard
- Comment system
- Payment
- CMS kompleks

---

## 5. User Roles

### Public User
- Recruiter
- Client
- Visitor umum

### Admin User
- Pemilik website
- Hanya satu admin pada phase awal

---

## 6. Sitemap

### Public
- `/`
- `/portfolio`
- `/portfolio/:slug`

### Admin
- `/admin/login`
- `/admin`
- `/admin/portfolio`
- `/admin/portfolio/create`
- `/admin/portfolio/:id/edit`

---

## 7. Functional Requirements

## 7.1 Public — Home Page

Section:
- Navbar
- Hero
- About
- Skills / Tools
- Featured Portfolio
- Contact
- Footer

Acceptance Criteria:
- Responsive di mobile, tablet, desktop
- CTA ke halaman portfolio
- Menampilkan maksimal 6 portfolio dengan status `publish`
- Data featured diambil dari database

---

## 7.2 Public — Portfolio List

Menampilkan semua portfolio dengan status `publish`.

Fitur:
- Grid card responsive
- Search berdasarkan title
- Filter berdasarkan category
- Empty state bila belum ada data

Data pada card:
- thumbnail
- title
- category
- short description
- link ke detail

Acceptance Criteria:
- Hanya data publish yang tampil
- Klik card menuju detail portfolio
- Search dan filter berjalan pada data publish

---

## 7.3 Public — Portfolio Detail

Menampilkan case study lengkap berdasarkan `slug`.

Field utama:
- title
- role
- tools
- timeline
- overview
- problem statement
- goals
- process
- solution
- result
- lessons learned
- cover image
- gallery images

Acceptance Criteria:
- Halaman detail bisa dibuka dari slug
- Bila slug tidak ditemukan, tampilkan not found state
- Layout mudah dibaca dan fokus pada case study

---

## 7.4 Public — Contact Section

Menampilkan:
- email
- LinkedIn
- Behance / Dribbble / Figma / GitHub jika ada
- CTA kerja sama

Acceptance Criteria:
- Informasi kontak mudah ditemukan
- Link external valid

---

## 7.5 Admin — Login

Field:
- email
- password

Behavior:
- Login menggunakan Supabase Auth
- Jika sukses redirect ke `/admin`
- Jika gagal tampilkan error message

Acceptance Criteria:
- Route admin terlindungi
- User yang belum login tidak bisa mengakses area admin

---

## 7.6 Admin — Dashboard

Menampilkan ringkasan:
- total portfolio
- total publish
- total draft
- quick action ke create portfolio

Acceptance Criteria:
- Summary diambil dari database
- Ada navigasi ke manajemen portfolio

---

## 7.7 Admin — Portfolio List

Tabel daftar semua portfolio.

Kolom:
- thumbnail
- title
- category
- status
- updated_at
- actions

Actions:
- edit
- delete
- optional preview

Fitur:
- search
- filter status
- filter category
- confirmation modal untuk delete

Acceptance Criteria:
- Admin bisa melihat semua item, termasuk draft dan publish
- Delete meminta konfirmasi
- Edit membuka form edit dengan data existing

---

## 7.8 Admin — Create Portfolio

Field:
- title
- slug
- category
- short_description
- overview
- role
- tools
- timeline
- status
- featured
- thumbnail_url
- cover_image_url
- gallery images
- problem_statement
- goals
- process
- solution
- result
- lessons_learned

Behavior:
- slug auto-generate dari title
- slug tetap bisa diedit manual
- validasi field wajib
- upload image ke Supabase Storage
- simpan data ke PostgreSQL

Acceptance Criteria:
- Data berhasil tersimpan
- Setelah submit, redirect ke list admin
- Tampilkan success message

---

## 7.9 Admin — Edit Portfolio

Behavior:
- Semua field create dapat diedit
- Data existing otomatis ter-load
- Bisa mengganti thumbnail, cover, dan gallery

Acceptance Criteria:
- Update data tersimpan ke database
- `updated_at` berubah otomatis

---

## 7.10 Admin — Delete Portfolio

Behavior:
- Delete melalui confirmation modal
- Hapus data portfolio dari database
- Optional: hapus file terkait dari storage bila memungkinkan

Acceptance Criteria:
- Item hilang dari list setelah delete berhasil
- Tampilkan success feedback

---

## 7.11 Admin — Image Upload

Behavior:
- Upload thumbnail ke Supabase Storage
- Upload cover image ke Supabase Storage
- Upload multiple gallery images ke Supabase Storage
- Simpan public URL file ke database

Acceptance Criteria:
- Upload berhasil dan preview muncul di form
- Error upload tertangani dengan jelas

---

## 8. Database Requirement

Project wajib menggunakan **Supabase PostgreSQL**.

### Requirement Umum
- Gunakan Supabase sebagai backend utama
- Gunakan PostgreSQL untuk penyimpanan data portfolio
- Gunakan Supabase Auth untuk autentikasi admin
- Gunakan Supabase Storage untuk file gambar
- Gunakan Row Level Security seperlunya

---

## 9. Data Model

## 9.1 Table: `profiles`

Digunakan untuk menyimpan profil admin bila dibutuhkan.

Columns:
- `id` UUID PK, relasi ke `auth.users.id`
- `full_name` TEXT
- `email` TEXT
- `avatar_url` TEXT nullable
- `created_at` TIMESTAMP
- `updated_at` TIMESTAMP

---

## 9.2 Table: `portfolios`

Columns:
- `id` UUID PK default generated
- `title` TEXT NOT NULL
- `slug` TEXT NOT NULL UNIQUE
- `category` TEXT NOT NULL
- `short_description` TEXT NOT NULL
- `overview` TEXT NOT NULL
- `role` TEXT NOT NULL
- `timeline` TEXT NOT NULL
- `status` TEXT NOT NULL CHECK in (`draft`, `publish`)
- `featured` BOOLEAN DEFAULT false
- `thumbnail_url` TEXT NOT NULL
- `cover_image_url` TEXT nullable
- `problem_statement` TEXT NOT NULL
- `goals` TEXT NOT NULL
- `process` TEXT NOT NULL
- `solution` TEXT NOT NULL
- `result` TEXT NOT NULL
- `lessons_learned` TEXT nullable
- `created_by` UUID nullable
- `created_at` TIMESTAMP DEFAULT now()
- `updated_at` TIMESTAMP DEFAULT now()

---

## 9.3 Table: `portfolio_tools`

Digunakan untuk menyimpan daftar tools per portfolio.

Columns:
- `id` UUID PK default generated
- `portfolio_id` UUID FK ke `portfolios.id`
- `tool_name` TEXT NOT NULL
- `sort_order` INT DEFAULT 0
- `created_at` TIMESTAMP DEFAULT now()

---

## 9.4 Table: `portfolio_gallery`

Digunakan untuk menyimpan banyak gambar untuk satu portfolio.

Columns:
- `id` UUID PK default generated
- `portfolio_id` UUID FK ke `portfolios.id`
- `image_url` TEXT NOT NULL
- `caption` TEXT nullable
- `sort_order` INT DEFAULT 0
- `created_at` TIMESTAMP DEFAULT now()

---

## 10. Suggested SQL Schema

```sql
create table if not exists public.profiles (
  id uuid primary key,
  full_name text,
  email text,
  avatar_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists public.portfolios (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null,
  short_description text not null,
  overview text not null,
  role text not null,
  timeline text not null,
  status text not null check (status in ('draft', 'publish')),
  featured boolean default false,
  thumbnail_url text not null,
  cover_image_url text,
  problem_statement text not null,
  goals text not null,
  process text not null,
  solution text not null,
  result text not null,
  lessons_learned text,
  created_by uuid,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists public.portfolio_tools (
  id uuid primary key default gen_random_uuid(),
  portfolio_id uuid not null references public.portfolios(id) on delete cascade,
  tool_name text not null,
  sort_order int default 0,
  created_at timestamp with time zone default now()
);

create table if not exists public.portfolio_gallery (
  id uuid primary key default gen_random_uuid(),
  portfolio_id uuid not null references public.portfolios(id) on delete cascade,
  image_url text not null,
  caption text,
  sort_order int default 0,
  created_at timestamp with time zone default now()
);
```

---

## 11. Storage Requirement

Gunakan Supabase Storage bucket berikut:

### Bucket
- `portfolio-images`

### Folder Convention
- `thumbnails/`
- `covers/`
- `gallery/`

### Rules
- Simpan file image hasil upload ke bucket tersebut
- Simpan URL hasil upload ke tabel terkait
- Gunakan nama file yang unik

---

## 12. Auth Requirement

Gunakan Supabase Auth dengan email/password.

### Phase 1
- Hanya satu admin
- Akun admin dibuat manual dari Supabase dashboard atau seed awal

### Flow
- login
- cek session
- simpan session dengan Supabase client
- logout
- protect semua route admin

---

## 13. Validation Rules

### Portfolio
- `title`: required, min 3 karakter
- `slug`: required, unique, lowercase, dash-separated
- `category`: required
- `short_description`: required
- `overview`: required
- `role`: required
- `timeline`: required
- `status`: required, hanya `draft` atau `publish`
- `thumbnail_url`: required
- `problem_statement`: required
- `goals`: required
- `process`: required
- `solution`: required
- `result`: required

### Upload
- file harus image
- ukuran file dibatasi secara wajar

---

## 14. Frontend Structure

```txt
src/
  assets/
  components/
    common/
    public/
    admin/
  config/
    supabase.js
  context/
    AuthContext.jsx
  hooks/
  layouts/
    PublicLayout.jsx
    AdminLayout.jsx
  pages/
    public/
      HomePage.jsx
      PortfolioPage.jsx
      PortfolioDetailPage.jsx
    admin/
      LoginPage.jsx
      DashboardPage.jsx
      PortfolioListPage.jsx
      PortfolioCreatePage.jsx
      PortfolioEditPage.jsx
  routes/
    AppRouter.jsx
    ProtectedRoute.jsx
  services/
    authService.js
    portfolioService.js
    uploadService.js
  utils/
    slugify.js
    validators.js
    formatDate.js
  App.jsx
  main.jsx
```

---

## 15. Required Components

### Public Components
- `Navbar`
- `HeroSection`
- `AboutSection`
- `SkillsSection`
- `PortfolioCard`
- `PortfolioGrid`
- `PortfolioFilterBar`
- `PortfolioDetailHeader`
- `CaseStudySection`
- `ContactSection`
- `Footer`

### Admin Components
- `AdminLayout`
- `AdminSidebar`
- `AdminHeader`
- `StatsCard`
- `PortfolioTable`
- `PortfolioForm`
- `ToolInputRepeater`
- `GalleryInputRepeater`
- `DeleteConfirmModal`
- `ProtectedRoute`

---

## 16. Routing

```txt
/                          -> HomePage
/portfolio                 -> PortfolioPage
/portfolio/:slug           -> PortfolioDetailPage

/admin/login               -> LoginPage
/admin                     -> DashboardPage
/admin/portfolio           -> PortfolioListPage
/admin/portfolio/create    -> PortfolioCreatePage
/admin/portfolio/:id/edit  -> PortfolioEditPage
```

### Route Guard
- Semua route `/admin/*` selain `/admin/login` wajib protected
- Jika belum login, redirect ke `/admin/login`

---

## 17. Service Layer

## 17.1 `authService`

Functions:
- `login(email, password)`
- `logout()`
- `getSession()`
- `getCurrentUser()`

## 17.2 `portfolioService`

Functions:
- `getPublishedPortfolios()`
- `getAllPortfolios()`
- `getPortfolioById(id)`
- `getPortfolioBySlug(slug)`
- `createPortfolio(payload)`
- `updatePortfolio(id, payload)`
- `deletePortfolio(id)`
- `getPortfolioTools(portfolioId)`
- `replacePortfolioTools(portfolioId, tools)`
- `getPortfolioGallery(portfolioId)`
- `replacePortfolioGallery(portfolioId, gallery)`

## 17.3 `uploadService`

Functions:
- `uploadThumbnail(file)`
- `uploadCover(file)`
- `uploadGalleryImages(files)`
- `removeFile(path)` optional

---

## 18. UI / UX Rules

- Public UI harus clean, minimal, dan profesional
- Fokus utama pada karya dan studi kasus
- Admin UI harus sederhana dan cepat dipakai
- Gunakan Flowbite untuk form, modal, button, table, navbar, sidebar
- Hindari animasi berlebihan
- Responsive mobile-first

---

## 19. Error Handling & Edge Cases

Wajib tangani kondisi berikut:
- slug tidak ditemukan
- data portfolio kosong
- admin belum login
- form invalid
- upload image gagal
- query Supabase gagal
- delete item yang tidak ditemukan
- session expired

---

## 20. Non-Functional Requirements

- Responsive di mobile, tablet, desktop
- Fast loading
- Code modular dan maintainable
- Reusable components
- Basic accessibility pada form, button, modal
- State loading dan error harus jelas

---

## 21. Definition of Done

Project dianggap selesai bila:
- setup React + Tailwind + Flowbite berhasil
- Supabase project berhasil terhubung
- Supabase Auth untuk admin login berjalan
- Supabase Storage untuk upload image berjalan
- public pages selesai
- admin dashboard selesai
- CRUD portfolio berjalan penuh
- data tersimpan di PostgreSQL
- image URL tersimpan dan dapat ditampilkan
- protected route aktif
- UI responsive
- tidak ada error utama pada flow utama

---

## 22. Development Order (WAJIB)

1. setup React + Vite
2. setup TailwindCSS + Flowbite
3. setup Supabase client
4. buat routing public dan admin
5. buat auth flow dengan Supabase Auth
6. buat protected routes
7. buat schema tabel Supabase
8. buat bucket storage image
9. buat service layer
10. buat halaman public
11. buat dashboard admin
12. buat list portfolio admin
13. buat form create/edit portfolio
14. implement upload image
15. implement delete flow
16. tambahkan validation, loading, error state
17. rapikan UI dan responsivitas

---

## 23. Important Notes for Codex

- Gunakan **Supabase PostgreSQL** sebagai source of truth
- Jangan gunakan localStorage sebagai database utama
- Public hanya menampilkan portfolio status `publish`
- Admin dapat melihat semua status
- Form create dan edit harus reusable
- Slug harus unik
- Gunakan relasi tabel untuk tools dan gallery
- Usahakan query tetap sederhana dan jelas
- Pisahkan logic service dari komponen UI

---

## 24. Deliverables

Codex harus menghasilkan:
- project React yang dapat dijalankan
- struktur folder rapi
- integrasi Supabase
- public pages
- admin pages
- auth admin
- CRUD portfolio
- upload image ke storage
- query database yang bersih
- komponen reusable

