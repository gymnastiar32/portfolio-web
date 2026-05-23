#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PACKAGE_DIR="$ROOT_DIR/deploy/portfolio-hosting-api"
ZIP_PATH="$ROOT_DIR/deploy/portfolio-hosting-api.zip"

if [[ ! -f "$PACKAGE_DIR/.htaccess" || ! -d "$PACKAGE_DIR/api" ]]; then
  echo "Missing package source files in $PACKAGE_DIR" >&2
  exit 1
fi

rm -f "$ZIP_PATH"

(
  cd "$PACKAGE_DIR"
  zip -qr -X "$ZIP_PATH" . -x '.DS_Store' '*/.DS_Store'
)

echo "Wrote $ZIP_PATH"
