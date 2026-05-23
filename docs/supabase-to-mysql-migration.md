# Supabase to MySQL Migration

This project now uses a PHP API with MySQL/MariaDB instead of Supabase.

## 1. Create the Database

1. Create a MySQL or MariaDB database in cPanel.
2. Create a database user and grant it all privileges for that database.
3. Import `api/schema.mysql.sql` through phpMyAdmin or the MySQL CLI.

## 2. Configure the API

1. Copy `api/config.example.php` to `api/config.php`.
2. Fill in the database credentials.
   - On cPanel, use `localhost` for `db.host` when the PHP API and MySQL database are on the same hosting account.
   - Use the domain or server IP only if cPanel Remote MySQL is enabled and your client IP is allowed.
3. Generate an admin password hash:

```php
<?php
echo password_hash('your-password-here', PASSWORD_DEFAULT);
```

4. Put the generated hash into `admin.password_hash`.

Do not commit `api/config.php`.

## 3. Export Supabase Data

Export these Supabase tables as CSV:

- `portfolios`
- `portfolio_tools`
- `portfolio_gallery`

Import them into MySQL in the same order. Keep UUID values as strings. Convert PostgreSQL booleans to `1` and `0` if phpMyAdmin does not do it automatically.

The old Supabase image URLs can stay in the database. New uploads will be stored in the hosting folder configured in `api/config.php`. The default folder is `/uploads/portfolio-images` in the same document root as `/api`.

## 4. Frontend Environment

Use `.env.example` as the template. In most cPanel deployments, the API is same-origin:

```env
VITE_API_BASE_URL=/api
VITE_ADMIN_EMAIL=gymnastiar32@gmail.com
```
