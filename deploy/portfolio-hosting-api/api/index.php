<?php

declare(strict_types=1);

session_start([
    'cookie_httponly' => true,
    'cookie_samesite' => 'Lax',
]);

$configPath = __DIR__ . '/config.php';
if (!is_file($configPath)) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['message' => 'API config.php is missing. Copy api/config.example.php to api/config.php.']);
    exit;
}

$config = require $configPath;

function jsonResponse(mixed $payload, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

function readJsonBody(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || trim($raw) === '') {
        return [];
    }

    $payload = json_decode($raw, true);
    if (!is_array($payload)) {
        jsonResponse(['message' => 'Invalid JSON payload.'], 400);
    }

    return $payload;
}

function db(array $config): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $db = $config['db'];
    $dsn = sprintf(
        'mysql:host=%s;port=%d;dbname=%s;charset=%s',
        $db['host'],
        (int) ($db['port'] ?? 3306),
        $db['name'],
        $db['charset'] ?? 'utf8mb4'
    );

    $pdo = new PDO($dsn, $db['user'], $db['pass'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::ATTR_TIMEOUT => 5,
    ]);

    return $pdo;
}

function currentUser(array $config): ?array
{
    if (($_SESSION['admin_email'] ?? null) !== ($config['admin']['email'] ?? null)) {
        return null;
    }

    return [
        'id' => 'single-admin',
        'email' => $config['admin']['email'],
    ];
}

function requireAdmin(array $config): array
{
    $user = currentUser($config);
    if (!$user) {
        jsonResponse(['message' => 'Authentication required.'], 401);
    }

    return $user;
}

function normalizePortfolioRow(array $row): array
{
    $row['featured'] = (bool) $row['featured'];
    $row['cover_image_url'] = $row['cover_image_url'] ?? '';
    $row['lessons_learned'] = $row['lessons_learned'] ?? '';
    $row['created_by'] = $row['created_by'] ?? '';
    $row['tools'] = [];
    $row['gallery'] = [];

    return $row;
}

function hydratePortfolios(PDO $pdo, array $portfolios): array
{
    if (count($portfolios) === 0) {
        return [];
    }

    $ids = array_column($portfolios, 'id');
    $placeholders = implode(',', array_fill(0, count($ids), '?'));

    $toolsStatement = $pdo->prepare(
        "select id, portfolio_id, tool_name, sort_order, created_at
         from portfolio_tools
         where portfolio_id in ($placeholders)
         order by sort_order asc, created_at asc"
    );
    $toolsStatement->execute($ids);

    $galleryStatement = $pdo->prepare(
        "select id, portfolio_id, image_url, caption, sort_order, created_at
         from portfolio_gallery
         where portfolio_id in ($placeholders)
         order by sort_order asc, created_at asc"
    );
    $galleryStatement->execute($ids);

    $toolsByPortfolio = [];
    foreach ($toolsStatement->fetchAll() as $tool) {
        $toolsByPortfolio[$tool['portfolio_id']][] = [
            'id' => $tool['id'],
            'tool_name' => $tool['tool_name'],
            'sort_order' => (int) $tool['sort_order'],
            'created_at' => $tool['created_at'],
        ];
    }

    $galleryByPortfolio = [];
    foreach ($galleryStatement->fetchAll() as $item) {
        $galleryByPortfolio[$item['portfolio_id']][] = [
            'id' => $item['id'],
            'image_url' => $item['image_url'],
            'caption' => $item['caption'],
            'sort_order' => (int) $item['sort_order'],
            'created_at' => $item['created_at'],
        ];
    }

    return array_map(function (array $portfolio) use ($toolsByPortfolio, $galleryByPortfolio) {
        $portfolio = normalizePortfolioRow($portfolio);
        $portfolio['tools'] = $toolsByPortfolio[$portfolio['id']] ?? [];
        $portfolio['gallery'] = $galleryByPortfolio[$portfolio['id']] ?? [];
        return $portfolio;
    }, $portfolios);
}

function uuid(): string
{
    $data = random_bytes(16);
    $data[6] = chr((ord($data[6]) & 0x0f) | 0x40);
    $data[8] = chr((ord($data[8]) & 0x3f) | 0x80);

    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

function portfolioPayload(array $payload): array
{
    $required = [
        'title',
        'slug',
        'category',
        'short_description',
        'overview',
        'role',
        'timeline',
        'status',
        'thumbnail_url',
        'problem_statement',
        'goals',
        'process',
        'solution',
        'result',
    ];

    foreach ($required as $field) {
        if (!isset($payload[$field]) || trim((string) $payload[$field]) === '') {
            jsonResponse(['message' => "Field '$field' is required."], 422);
        }
    }

    if (!in_array($payload['status'], ['draft', 'publish'], true)) {
        jsonResponse(['message' => 'Status must be draft or publish.'], 422);
    }

    return [
        'title' => trim((string) $payload['title']),
        'slug' => trim((string) $payload['slug']),
        'category' => trim((string) $payload['category']),
        'short_description' => trim((string) $payload['short_description']),
        'overview' => trim((string) $payload['overview']),
        'role' => trim((string) $payload['role']),
        'timeline' => trim((string) $payload['timeline']),
        'status' => $payload['status'],
        'featured' => !empty($payload['featured']) ? 1 : 0,
        'thumbnail_url' => trim((string) $payload['thumbnail_url']),
        'cover_image_url' => trim((string) ($payload['cover_image_url'] ?? '')) ?: null,
        'problem_statement' => trim((string) $payload['problem_statement']),
        'goals' => trim((string) $payload['goals']),
        'process' => trim((string) $payload['process']),
        'solution' => trim((string) $payload['solution']),
        'result' => trim((string) $payload['result']),
        'lessons_learned' => trim((string) ($payload['lessons_learned'] ?? '')) ?: null,
        'tools' => is_array($payload['tools'] ?? null) ? $payload['tools'] : [],
        'gallery' => is_array($payload['gallery'] ?? null) ? $payload['gallery'] : [],
    ];
}

function replaceChildren(PDO $pdo, string $portfolioId, array $tools, array $gallery): void
{
    $pdo->prepare('delete from portfolio_tools where portfolio_id = ?')->execute([$portfolioId]);
    $pdo->prepare('delete from portfolio_gallery where portfolio_id = ?')->execute([$portfolioId]);

    $toolInsert = $pdo->prepare(
        'insert into portfolio_tools (id, portfolio_id, tool_name, sort_order) values (?, ?, ?, ?)'
    );
    foreach (array_values($tools) as $index => $tool) {
        $name = trim((string) ($tool['tool_name'] ?? ''));
        if ($name === '') {
            continue;
        }
        $toolInsert->execute([uuid(), $portfolioId, $name, $index]);
    }

    $galleryInsert = $pdo->prepare(
        'insert into portfolio_gallery (id, portfolio_id, image_url, caption, sort_order) values (?, ?, ?, ?, ?)'
    );
    foreach (array_values($gallery) as $index => $item) {
        $imageUrl = trim((string) ($item['image_url'] ?? ''));
        if ($imageUrl === '') {
            continue;
        }
        $caption = trim((string) ($item['caption'] ?? '')) ?: null;
        $galleryInsert->execute([uuid(), $portfolioId, $imageUrl, $caption, $index]);
    }
}

function findPortfolio(PDO $pdo, string $column, string $value, bool $isAdmin): ?array
{
    $sql = "select * from portfolios where $column = ?";
    $params = [$value];
    if (!$isAdmin) {
        $sql .= " and status = 'publish'";
    }
    $sql .= ' limit 1';

    $statement = $pdo->prepare($sql);
    $statement->execute($params);
    $portfolio = $statement->fetch();

    if (!$portfolio) {
        return null;
    }

    return hydratePortfolios($pdo, [$portfolio])[0] ?? null;
}

function routePath(): array
{
    $uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
    $scriptDir = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '/api/index.php')), '/');

    if ($scriptDir !== '' && str_starts_with($uri, $scriptDir)) {
        $uri = substr($uri, strlen($scriptDir));
    }

    return array_values(array_filter(explode('/', trim($uri, '/')), fn ($part) => $part !== ''));
}

try {
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    $parts = routePath();
    $pdo = db($config);

    if ($parts === ['auth', 'login'] && $method === 'POST') {
        $payload = readJsonBody();
        $email = strtolower(trim((string) ($payload['email'] ?? '')));
        $password = (string) ($payload['password'] ?? '');

        if ($email !== strtolower($config['admin']['email']) || !password_verify($password, $config['admin']['password_hash'])) {
            jsonResponse(['message' => 'Invalid admin credentials.'], 401);
        }

        session_regenerate_id(true);
        $_SESSION['admin_email'] = $config['admin']['email'];

        $user = currentUser($config);
        jsonResponse(['user' => $user, 'session' => ['authenticated' => true]]);
    }

    if ($parts === ['auth', 'logout'] && $method === 'POST') {
        $_SESSION = [];
        session_destroy();
        jsonResponse(['ok' => true]);
    }

    if ($parts === ['auth', 'me'] && $method === 'GET') {
        $user = currentUser($config);
        jsonResponse(['user' => $user, 'session' => $user ? ['authenticated' => true] : null]);
    }

    if (($parts[0] ?? null) === 'portfolios') {
        $isAdmin = currentUser($config) !== null;

        if (count($parts) === 1 && $method === 'GET') {
            $status = $_GET['status'] ?? null;
            if ($status !== 'publish' && !$isAdmin) {
                requireAdmin($config);
            }

            if ($status === 'publish') {
                $statement = $pdo->query("select * from portfolios where status = 'publish' order by updated_at desc");
            } else {
                $statement = $pdo->query('select * from portfolios order by updated_at desc');
            }

            jsonResponse(hydratePortfolios($pdo, $statement->fetchAll()));
        }

        if (count($parts) === 1 && $method === 'POST') {
            $user = requireAdmin($config);
            $payload = portfolioPayload(readJsonBody());
            $id = uuid();

            $pdo->beginTransaction();
            $statement = $pdo->prepare(
                'insert into portfolios
                (id, title, slug, category, short_description, overview, role, timeline, status, featured,
                 thumbnail_url, cover_image_url, problem_statement, goals, process, solution, result, lessons_learned, created_by)
                 values
                (:id, :title, :slug, :category, :short_description, :overview, :role, :timeline, :status, :featured,
                 :thumbnail_url, :cover_image_url, :problem_statement, :goals, :process, :solution, :result, :lessons_learned, :created_by)'
            );
            $statement->execute([
                ...array_diff_key($payload, ['tools' => true, 'gallery' => true]),
                'id' => $id,
                'created_by' => $user['email'],
            ]);
            replaceChildren($pdo, $id, $payload['tools'], $payload['gallery']);
            $pdo->commit();

            jsonResponse(findPortfolio($pdo, 'id', $id, true), 201);
        }

        if (($parts[1] ?? null) === 'slug' && isset($parts[2]) && $method === 'GET') {
            $portfolio = findPortfolio($pdo, 'slug', urldecode($parts[2]), $isAdmin);
            if (!$portfolio) {
                jsonResponse(['message' => 'Portfolio not found.'], 404);
            }
            jsonResponse($portfolio);
        }

        if (isset($parts[1]) && count($parts) === 2 && $method === 'GET') {
            $portfolio = findPortfolio($pdo, 'id', urldecode($parts[1]), $isAdmin);
            if (!$portfolio) {
                jsonResponse(['message' => 'Portfolio not found.'], 404);
            }
            jsonResponse($portfolio);
        }

        if (isset($parts[1]) && count($parts) === 2 && $method === 'PUT') {
            requireAdmin($config);
            $id = urldecode($parts[1]);
            $payload = portfolioPayload(readJsonBody());

            $pdo->beginTransaction();
            $statement = $pdo->prepare(
                'update portfolios set
                 title = :title, slug = :slug, category = :category, short_description = :short_description,
                 overview = :overview, role = :role, timeline = :timeline, status = :status, featured = :featured,
                 thumbnail_url = :thumbnail_url, cover_image_url = :cover_image_url, problem_statement = :problem_statement,
                 goals = :goals, process = :process, solution = :solution, result = :result, lessons_learned = :lessons_learned
                 where id = :id'
            );
            $statement->execute([
                ...array_diff_key($payload, ['tools' => true, 'gallery' => true]),
                'id' => $id,
            ]);

            if ($statement->rowCount() === 0 && !findPortfolio($pdo, 'id', $id, true)) {
                $pdo->rollBack();
                jsonResponse(['message' => 'Portfolio not found.'], 404);
            }

            replaceChildren($pdo, $id, $payload['tools'], $payload['gallery']);
            $pdo->commit();

            jsonResponse(findPortfolio($pdo, 'id', $id, true));
        }

        if (isset($parts[1]) && count($parts) === 2 && $method === 'DELETE') {
            requireAdmin($config);
            $statement = $pdo->prepare('delete from portfolios where id = ?');
            $statement->execute([urldecode($parts[1])]);
            jsonResponse(['ok' => true]);
        }
    }

    if ($parts === ['uploads'] && $method === 'POST') {
        requireAdmin($config);

        $folder = $_POST['folder'] ?? '';
        if (!in_array($folder, ['thumbnails', 'covers', 'gallery'], true)) {
            jsonResponse(['message' => 'Upload folder is invalid.'], 422);
        }

        if (!isset($_FILES['file']) || !is_array($_FILES['file'])) {
            jsonResponse(['message' => 'No upload file was provided.'], 422);
        }

        $file = $_FILES['file'];
        if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
            jsonResponse(['message' => 'Upload failed.'], 422);
        }

        if (($file['size'] ?? 0) > ($config['uploads']['max_bytes'] ?? 5242880)) {
            jsonResponse(['message' => 'Image size must be under 5MB.'], 422);
        }

        $mime = mime_content_type($file['tmp_name']);
        $extensions = [
            'image/jpeg' => 'jpg',
            'image/png' => 'png',
            'image/webp' => 'webp',
            'image/gif' => 'gif',
        ];
        if (!isset($extensions[$mime])) {
            jsonResponse(['message' => 'Only JPG, PNG, WebP, and GIF files are allowed.'], 422);
        }

        $uploadRoot = rtrim($config['uploads']['dir'], '/\\');
        $targetDir = $uploadRoot . DIRECTORY_SEPARATOR . $folder;
        if (!is_dir($targetDir) && !mkdir($targetDir, 0755, true)) {
            jsonResponse(['message' => 'Upload directory could not be created.'], 500);
        }

        $baseName = preg_replace('/[^a-z0-9]+/i', '-', pathinfo($file['name'], PATHINFO_FILENAME));
        $baseName = trim(strtolower($baseName), '-') ?: 'portfolio-image';
        $fileName = time() . '-' . bin2hex(random_bytes(4)) . '-' . $baseName . '.' . $extensions[$mime];
        $targetPath = $targetDir . DIRECTORY_SEPARATOR . $fileName;

        if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
            jsonResponse(['message' => 'Could not save uploaded file.'], 500);
        }

        $publicPath = rtrim($config['uploads']['public_path'], '/') . '/' . $folder . '/' . $fileName;
        jsonResponse(['path' => $folder . '/' . $fileName, 'url' => $publicPath], 201);
    }

    jsonResponse(['message' => 'Endpoint not found.'], 404);
} catch (PDOException $error) {
    $message = $error->getCode() === '23000'
        ? 'A database constraint failed. Check for duplicate slug or invalid related data.'
        : 'Database error.';
    jsonResponse(['message' => $message], 500);
} catch (Throwable $error) {
    jsonResponse(['message' => 'Server error.'], 500);
}
