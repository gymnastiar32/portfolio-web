#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST_DIR="$ROOT_DIR/dist"
API_PACKAGE_DIR="$ROOT_DIR/deploy/portfolio-hosting-api"
ZIP_PATH="$ROOT_DIR/deploy/portfolio-site.zip"
STAGE_DIR="$ROOT_DIR/deploy/.site-package"

if [[ ! -f "$DIST_DIR/index.html" || ! -d "$DIST_DIR/assets" ]]; then
  echo "Missing frontend build. Run npm run build first." >&2
  exit 1
fi

if [[ ! -f "$API_PACKAGE_DIR/.htaccess" || ! -d "$API_PACKAGE_DIR/api" ]]; then
  echo "Missing API package source in $API_PACKAGE_DIR" >&2
  exit 1
fi

rm -rf "$STAGE_DIR" "$ZIP_PATH"
mkdir -p "$STAGE_DIR"

cp -R "$DIST_DIR"/. "$STAGE_DIR"/
cp "$API_PACKAGE_DIR/.htaccess" "$STAGE_DIR/.htaccess"
cp -R "$API_PACKAGE_DIR/api" "$STAGE_DIR/api"
cp -R "$API_PACKAGE_DIR/uploads" "$STAGE_DIR/uploads"

(
  cd "$STAGE_DIR"
  zip -qr -X "$ZIP_PATH" . -x '.DS_Store' '*/.DS_Store'
)

rm -rf "$STAGE_DIR"

echo "Wrote $ZIP_PATH"
