#!/usr/bin/env bash
set -euo pipefail

# =========================
# Config
# =========================
BASE_URL="${BASE_URL:-https://localhost}"
PORT="${PORT:-443}"
TARGET="${BASE_URL}:${PORT}"

# Si besoin d'un token (endpoints protégés), exporte: AUTH="Authorization: Bearer xxx"
AUTH="${AUTH:-}"

# self-signed -> -k ; mode verbeux désactivé par défaut
CURL_OPTS=( -s -S -k --http1.1 --max-time 15 )
[[ -n "${AUTH}" ]] && CURL_OPTS+=( -H "${AUTH}" )

# Petite aide pour afficher si c'est bloqué
is_blocked() { [[ "$1" == "403" || "$1" == "406" || "$1" == "401" || "$1" == "501" ]]; }

req() {
  local name="$1" method="$2" path="$3"
  shift 3
  local url="${TARGET}${path}"
  local http_code

  if [[ "$method" == "GET" ]]; then
    http_code=$(curl "${CURL_OPTS[@]}" -o /dev/null -w "%{http_code}" "$@" "$url")
  else
    http_code=$(curl "${CURL_OPTS[@]}" -o /dev/null -w "%{http_code}" "$@" "$url")
  fi

  if is_blocked "$http_code"; then
    printf "🛡️  %-24s -> %s (BLOQUÉ ✅)\n" "$name" "$http_code"
  else
    printf "⚠️  %-24s -> %s (non bloqué)\n" "$name" "$http_code"
  fi
}

echo "== Tests ModSecurity/OWASP CRS sur ${TARGET} =="

# ------------------------
# /api/ping
# ------------------------
req "CTRL /api/ping" GET "/api/ping"

# XSS via querystring
req "XSS /api/ping" GET "/api/ping?q=%3Cscript%3Ealert(1)%3C%2Fscript%3E"
# SQLi-like
req "SQLi /api/ping" GET "/api/ping?id=1%27%20OR%20%271%27%3D%271"
# LFI-like
req "LFI /api/ping" GET "/api/ping?file=../../etc/passwd"
# UA suspecte (sqlmap)
req "Bad UA /api/ping" GET "/api/ping" -H "User-Agent: sqlmap/1.7"

# ------------------------
# /api/login (POST JSON)
# ------------------------
req "CTRL /api/login" POST "/api/login" \
  -H "Content-Type: application/json" \
  -X POST -d '{"username":"demo","password":"demo"}'

req "XSS /api/login" POST "/api/login" \
  -H "Content-Type: application/json" \
  -X POST -d '{"username":"<script>alert(1)</script>","password":"x"}'

req "SQLi /api/login" POST "/api/login" \
  -H "Content-Type: application/json" \
  -X POST -d '{"username":"admin","password":"x'\'' OR '\''1'\''='\''1"}'

req "Cmd inj /api/login" POST "/api/login" \
  -H "Content-Type: application/json" \
  -X POST -d '{"username":"u","password":"x; id"}'

# ------------------------
# /api/me/avatar (POST upload)
# ------------------------
# Fichier factice à uploader
TMP_FILE="$(mktemp)"
echo '<?php echo "x"; ?>' > "$TMP_FILE"   # contenu suspect pour déclencher CRS

# Upload simple
req "CTRL avatar upload" POST "/api/me/avatar" \
  -F "avatar=@${TMP_FILE};type=image/png;filename=avatar.png"

# Nom de fichier avec traversal
req "Avatar filename LFI" POST "/api/me/avatar" \
  -F "avatar=@${TMP_FILE};type=image/png;filename=../../etc/passwd"

# Type MIME louche + champ additionnel douteux
req "Avatar weird MIME" POST "/api/me/avatar" \
  -F "avatar=@${TMP_FILE};type=text/php;filename=avatar.php" \
  -F "meta=<script>alert(1)</script>"

rm -f "$TMP_FILE"

echo
echo "Astuce: vérifie les logs ModSecurity pour voir quelles règles ont matché :"
echo "  docker compose exec nginx sh -lc 'tail -n 100 /var/log/modsecurity/modsec_audit.log'"
