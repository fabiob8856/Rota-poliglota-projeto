#!/bin/bash
# Uso: tools/release.sh 1.1.0 "o que mudou"
set -e
cd "$(dirname "$0")/.."
V="$1"; MSG="${2:-Atualização $1}"
[ -z "$V" ] && { echo "Informe a versão, ex.: tools/release.sh 1.1.0"; exit 1; }
npm version "$V" --no-git-tag-version
git add -A
git commit -m "v$V: $MSG"
git tag "v$V"
git push origin HEAD --tags
echo "Publicado. O GitHub Actions vai gerar o instalador e a Release v$V."
