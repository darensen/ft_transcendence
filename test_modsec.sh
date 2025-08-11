#!/bin/sh
# ModSecurity + OWASP CRS test script (POSIX /bin/sh compatible)
set -eu

# ========= Config =========
BASE_URL="${BASE_URL:-https://localhost}"
PORT="${PORT:-443}"
TARGET="${BASE_URL}:${PORT}"

# Optionnel : entête d’auth si besoin (ex: AUTH="Authorization: Bearer TOKEN")
AUTH="${AUTH:-}"

CURL_BASE_OPTS="-s -S -k --http1.1 --max-time 15"
[ -n "$AUTH" ] && AUTH_OPT="-H $AUTH" || AUTH_OPT=""

print_result() {
  name="$1"; code="$2"
  case "$code" in
    403|406|401|501)
      printf "🛡️  %-24s -> %s (BLOQUÉ ✅)\n" "$name" "$code"
      ;;
    *)
      printf "⚠️  %-24s -> %s (non bloqué)\n" "$name" "$code"
      ;;
  esac
}

echo "== Tests ModSecurity/OWASP CRS sur ${TARGET} =="

# -------- /api/ping --------
# CTRL
code=$(curl $CURL_BASE_OPTS -o /dev/null -w "%{http_code}" $AUTH_OPT "$TARGET/api/ping")
print_result "CTRL /api/ping" "$code"

# XSS
code=$(curl $CURL_BASE_OPTS -o /dev/null -w "%{http_code}" $AUTH_OPT \
  "$TARGET/api/ping?q=%3Cscript%3Ealert(1)%3C%2Fscript%3E")
print_result "XSS /api/ping" "$code"

# SQLi
code=$(curl $CURL_BASE_OPTS -o /dev/null -w "%{http_code}" $AUTH_OPT \
  "$TARGET/api/ping?id=1%27%20OR%20%271%27%3D%271")
print_result "SQLi /api/ping" "$code"

# LFI
code=$(curl $CURL_BASE_OPTS -o /dev/null -w "%{http_code}" $AUTH_OPT \
  "$TARGET/api/ping?file=../../etc/passwd")
print_result "LFI /api/ping" "$code"

# User-Agent suspect
code=$(curl $CURL_BASE_OPTS -o /dev/null -w "%{http_code}" $AUTH_OPT \
  -H "User-Agent: sqlmap/1.7" "$TARGET/api/ping")
print_result "Bad UA /api/ping" "$code"

# -------- /api/login (JSON) --------
# CTRL (JSON valide, conforme à ton schéma : email+password requis, otp optionnel)
if [ -n "$AUTH" ]; then
  code=$(curl $CURL_BASE_OPTS -o /dev/null -w "%{http_code}" -H 'Content-Type: application/json' -H "$AUTH" \
    -X POST "$TARGET/api/login" --data-binary @- <<'JSON'
{"email":"test@example.com","password":"juste-un-test","otp":"123456"}
JSON
)
else
  code=$(curl $CURL_BASE_OPTS -o /dev/null -w "%{http_code}" -H 'Content-Type: application/json' \
    -X POST "$TARGET/api/login" --data-binary @- <<'JSON'
{"email":"test@example.com","password":"juste-un-test","otp":"123456"}
JSON
)
fi
print_result "CTRL /api/login" "$code"

# XSS dans password
if [ -n "$AUTH" ]; then
  code=$(curl $CURL_BASE_OPTS -o /dev/null -w "%{http_code}" -H 'Content-Type: application/json' -H "$AUTH" \
    -X POST "$TARGET/api/login" --data-binary @- <<'JSON'
{"email":"test@example.com","password":"<script>alert(1)</script>","otp":"123456"}
JSON
)
else
  code=$(curl $CURL_BASE_OPTS -o /dev/null -w "%{http_code}" -H 'Content-Type: application/json' \
    -X POST "$TARGET/api/login" --data-binary @- <<'JSON'
{"email":"test@example.com","password":"<script>alert(1)</script>","otp":"123456"}
JSON
)
fi
print_result "XSS /api/login" "$code"

# SQLi dans password (apostrophes incluses)
if [ -n "$AUTH" ]; then
  code=$(curl $CURL_BASE_OPTS -o /dev/null -w "%{http_code}" -H 'Content-Type: application/json' -H "$AUTH" \
    -X POST "$TARGET/api/login" --data-binary @- <<'JSON'
{"email":"test@example.com","password":"x' OR '1'='1","otp":"123456"}
JSON
)
else
  code=$(curl $CURL_BASE_OPTS -o /dev/null -w "%{http_code}" -H 'Content-Type: application/json' \
    -X POST "$TARGET/api/login" --data-binary @- <<'JSON'
{"email":"test@example.com","password":"x' OR '1'='1","otp":"123456"}
JSON
)
fi
print_result "SQLi /api/login" "$code"

# Command injection dans password
if [ -n "$AUTH" ]; then
  code=$(curl $CURL_BASE_OPTS -o /dev/null -w "%{http_code}" -H 'Content-Type: application/json' -H "$AUTH" \
    -X POST "$TARGET/api/login" --data-binary @- <<'JSON'
{"email":"test@example.com","password":"foo; cat /etc/passwd","otp":"123456"}
JSON
)
else
  code=$(curl $CURL_BASE_OPTS -o /dev/null -w "%{http_code}" -H 'Content-Type: application/json' \
    -X POST "$TARGET/api/login" --data-binary @- <<'JSON'
{"email":"test@example.com","password":"foo; cat /etc/passwd","otp":"123456"}
JSON
)
fi
print_result "Cmd inj /api/login" "$code"

# -------- /api/me/avatar (upload) --------
TMP_FILE="$(mktemp)"
# contenu au format "suspect" pour exciter quelques règles
printf '%s\n' '<?php echo "x"; ?>' > "$TMP_FILE"

# Upload "normal"
if [ -n "$AUTH" ]; then
  code=$(curl $CURL_BASE_OPTS -o /dev/null -w "%{http_code}" -H "$AUTH" \
    -X POST "$TARGET/api/me/avatar" \
    -F "avatar=@${TMP_FILE};type=image/png;filename=avatar.png")
else
  code=$(curl $CURL_BASE_OPTS -o /dev/null -w "%{http_code}" \
    -X POST "$TARGET/api/me/avatar" \
    -F "avatar=@${TMP_FILE};type=image/png;filename=avatar.png")
fi
print_result "CTRL avatar upload" "$code"

# Filename traversal
if [ -n "$AUTH" ]; then
  code=$(curl $CURL_BASE_OPTS -o /dev/null -w "%{http_code}" -H "$AUTH" \
    -X POST "$TARGET/api/me/avatar" \
    -F "avatar=@${TMP_FILE};type=image/png;filename=../../etc/passwd")
else
  code=$(curl $CURL_BASE_OPTS -o /dev/null -w "%{http_code}" \
    -X POST "$TARGET/api/me/avatar" \
    -F "avatar=@${TMP_FILE};type=image/png;filename=../../etc/passwd")
fi
print_result "Avatar filename LFI" "$code"

# MIME louche + champ meta xss
if [ -n "$AUTH" ]; then
  code=$(curl $CURL_BASE_OPTS -o /dev/null -w "%{http_code}" -H "$AUTH" \
    -X POST "$TARGET/api/me/avatar" \
    -F "avatar=@${TMP_FILE};type=text/php;filename=avatar.php" \
    -F "meta=<script>alert(1)</script>")
else
  code=$(curl $CURL_BASE_OPTS -o /dev/null -w "%{http_code}" \
    -X POST "$TARGET/api/me/avatar" \
    -F "avatar=@${TMP_FILE};type=text/php;filename=avatar.php" \
    -F "meta=<script>alert(1)</script>")
fi
print_result "Avatar weird MIME" "$code"

rm -f "$TMP_FILE"

echo
echo "Astuce : inspecte les règles qui matchent dans les logs ModSecurity :"
echo "  docker compose exec nginx sh -lc 'tail -n 120 /var/log/modsecurity/modsec_audit.log'"
