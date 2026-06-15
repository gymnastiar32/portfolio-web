# Hosting Upload Instructions

Use `deploy/portfolio-hosting-api.zip` for cPanel upload. Rebuild it after API changes with:

```powershell
npm run deploy:api:zip
```

Production domain:

```text
https://portfolio.gymapp.my.id
```

## Upload

1. Open cPanel File Manager.
2. Go to the document root for `portfolio.gymapp.my.id` shown in cPanel Subdomains.
3. Upload `deploy/portfolio-hosting-api.zip` into the `portfolio.gymapp.my.id` folder.
4. Extract the ZIP in that same folder. The ZIP is built without a wrapper folder, so its contents should merge directly into the subdomain root.
5. Confirm these files exist directly inside `portfolio.gymapp.my.id`:
   - `SUBDOMAIN_ROOT/.htaccess`
   - `SUBDOMAIN_ROOT/api/.htaccess`
   - `SUBDOMAIN_ROOT/api/index.php`
   - `SUBDOMAIN_ROOT/api/config.template.php`
   - `SUBDOMAIN_ROOT/uploads/portfolio-images/thumbnails/.gitkeep`
   - `SUBDOMAIN_ROOT/uploads/portfolio-images/covers/.gitkeep`
   - `SUBDOMAIN_ROOT/uploads/portfolio-images/gallery/.gitkeep`

If `/api/auth/me` returns the React `index.html` page or an HTML 404 instead of JSON, the API folder is not in the active document root or the root `.htaccess` was not uploaded.

## Configure

1. Rename `SUBDOMAIN_ROOT/api/config.template.php` to `SUBDOMAIN_ROOT/api/config.php`.
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
https://portfolio.gymapp.my.id/api/auth/me
```

Expected:

```json
{"user":null,"session":null}
```

Open:

```text
https://portfolio.gymapp.my.id/api/portfolios?status=publish
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
VITE_DEV_API_PROXY_TARGET=https://portfolio.gymapp.my.id
```

Run:

```powershell
npm run dev
```

Vite proxies `/api` to `https://portfolio.gymapp.my.id`, so the local app uses the hosting database through the hosting PHP API.

## Frontend Deploy

Build locally:

```powershell
npm run deploy:build
```

Upload the contents of `dist/` into the same subdomain document root. Upload the contents, not the `dist` folder itself.

The final hosting structure should look like this:

```text
SUBDOMAIN_ROOT/
  .htaccess
  index.html
  assets/
  api/
  uploads/
```
