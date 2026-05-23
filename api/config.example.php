<?php

return [
    'db' => [
        'host' => 'localhost',
        'port' => 3306,
        'name' => 'portfolio_web',
        'user' => 'portfolio_user',
        'pass' => 'change-me',
        'charset' => 'utf8mb4',
    ],
    'admin' => [
        'email' => 'gymnastiar32@gmail.com',
        'password_hash' => '$2y$10$replace_with_a_password_hash_generated_by_password_hash',
    ],
    'uploads' => [
        'dir' => dirname(__DIR__) . '/uploads/portfolio-images',
        'public_path' => '/uploads/portfolio-images',
        'max_bytes' => 5 * 1024 * 1024,
    ],
];
