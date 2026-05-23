<?php

return [
    'db' => [
        'host' => 'localhost',
        'port' => 3306,
        'name' => 'gymappmy_portfolio',
        'user' => 'gymappmy_admin',
        'pass' => 'ISI_PASSWORD_DATABASE_CPANEL_DI_SINI',
        'charset' => 'utf8mb4',
    ],
    'admin' => [
        'email' => 'gymnastiar32@gmail.com',
        'password_hash' => 'ISI_HASH_PASSWORD_ADMIN_DI_SINI',
    ],
    'uploads' => [
        'dir' => dirname(__DIR__) . '/uploads/portfolio-images',
        'public_path' => '/uploads/portfolio-images',
        'max_bytes' => 5 * 1024 * 1024,
    ],
];

