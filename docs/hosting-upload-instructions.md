# Hosting Upload Instructions

Use `deploy/portfolio-hosting-api.zip` for cPanel upload.

## Upload

1. Open cPanel File Manager.
2. Go to `public_html`.
3. Upload and extract `deploy/portfolio-hosting-api.zip`.
4. Confirm these files exist:
   - `public_html/api/.htaccess`
   - `public_html/api/index.php`
   - `public_html/api/config.template.php`
   - `public_html/uploads/portfolio-images/thumbnails/.gitkeep`
   - `public_html/uploads/portfolio-images/covers/.gitkeep`
   - `public_html/uploads/portfolio-images/gallery/.gitkeep`

## Configure

1. Rename `public_html/api/config.template.php` to `public_html/api/config.php`.
2. Replace `ISI_PASSWORD_DATABASE_CPANEL_DI_SINI` with the cPanel database password.
3. Generate the admin password hash locally:

```powershell
php -r "echo password_hash('password-admin-kamu', PASSWORD_DEFAULT);"
```

4. Replace `ISI_HASH_PASSWORD_ADMIN_DI_SINI` with the generated hash.
5. Do not leave a public copy named `config.template.php` after `config.php` is ready.

## Import Schema

1. Open cPanel phpMyAdmin.
2. Select database `gymappmy_portfolio`.
3. Open SQL tab.
4. Paste the contents of `api/schema.mysql.sql`.
5. Run it and confirm these tables exist:
   - `portfolios`
   - `portfolio_tools`
   - `portfolio_gallery`

## Test

Open:

```text
https://gymapp.my.id/api/auth/me
```

Expected:

```json
{"user":null,"session":null}
```

Open:

```text
https://gymapp.my.id/api/portfolios?status=publish
```

Expected initial response can be:

```json
[]
```

## Local Development

Keep local `.env` as:

```env
VITE_API_BASE_URL=/api
VITE_ADMIN_EMAIL=gymnastiar32@gmail.com
```

Run:

```powershell
npm run dev
```

Vite proxies `/api` to `https://gymapp.my.id`, so the local app uses the hosting database through the hosting PHP API.
