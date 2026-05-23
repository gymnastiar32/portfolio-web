# Local and Hosting Runbook

## Local Development

Use local React/Vite, but read and write data through the hosted API:

```powershell
npm run dev
```

Runtime flow:

```text
http://localhost:5173
-> /api
-> Vite proxy
-> https://portfolio.gymapp.my.id/api
-> MySQL hosting
```

Keep `.env` as:

```env
VITE_API_BASE_URL=/api
VITE_ADMIN_EMAIL=gymnastiar32@gmail.com
VITE_DEV_API_PROXY_TARGET=https://portfolio.gymapp.my.id
```

## Production Build

```powershell
npm run deploy:build
```

Upload the contents of `dist/` to the document root for `portfolio.gymapp.my.id`.

## Production Hosting

Production uses same-origin API requests:

```text
https://portfolio.gymapp.my.id
-> /api
-> PHP API in the same subdomain root
-> MySQL localhost on hosting
```

Test these URLs after deploy:

```text
https://portfolio.gymapp.my.id/api/auth/me
https://portfolio.gymapp.my.id/api/portfolios?status=publish
https://portfolio.gymapp.my.id/portfolio
https://portfolio.gymapp.my.id/admin/login
```

## Verify Before Upload

```powershell
npm run check
php -l api/index.php
php -l api/config.hosting.example.php
```
