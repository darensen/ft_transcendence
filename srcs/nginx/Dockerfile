
# =======================
# STAGE 1 : build module ModSecurity
# =======================
FROM alpine:3.20 AS builder

ARG NGINX_VERSION=1.25.3
ENV NGINX_VERSION=${NGINX_VERSION}

# Dépendances build pour ModSecurity + module Nginx
RUN apk add --no-cache \
  git build-base autoconf automake libtool cmake linux-headers \
  libxml2-dev pcre-dev curl-dev zlib-dev yajl-dev \
  geoip-dev libmaxminddb-dev openssl-dev \
  curl ca-certificates 

# optionnel mais propre pour HTTPS
RUN update-ca-certificates

WORKDIR /opt

# 1) Compiler la lib ModSecurity v3
RUN git clone --depth=1 -b v3.0.10 https://github.com/SpiderLabs/ModSecurity \
 && cd ModSecurity \
 && git submodule init \
 && git submodule update \
 && ./build.sh \
 && ./configure \
 && make -j"$(nproc)" \
 && make install

# 2) Récupérer le connecteur ModSecurity-nginx
RUN git clone --depth=1 https://github.com/SpiderLabs/ModSecurity-nginx.git

# 3) Télécharger sources Nginx (même version que l'image finale)
RUN curl -fsSLO "http://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz" \
 && tar zxf "nginx-${NGINX_VERSION}.tar.gz"

# 4) Compiler le module dynamique
RUN cd "nginx-${NGINX_VERSION}" \
 && ./configure --with-compat --add-dynamic-module=../ModSecurity-nginx \
 && make modules

# 5) OWASP Core Rule Set
RUN git clone --depth=1 https://github.com/coreruleset/coreruleset.git /opt/owasp-crs \
 && cp /opt/owasp-crs/crs-setup.conf.example /opt/owasp-crs/crs-setup.conf

# =======================
# STAGE 2 : image finale Nginx + ModSecurity
# =======================
FROM nginx:1.25.3-alpine

LABEL maintainer="ft_transcendence"

# Libs d'exécution nécessaires (C++/yajl/geoip/etc.) + openssl pour certifs
RUN apk add --no-cache \
  libstdc++ libxml2 pcre curl zlib yajl geoip libmaxminddb openssl

# Arborescences
RUN mkdir -p /etc/nginx/ssl /etc/nginx/modsecurity /var/log/modsecurity /usr/share/nginx/html

# Certificats autosignés (dev)
RUN openssl req -x509 -nodes -days 365 \
  -newkey rsa:2048 \
  -keyout /etc/nginx/ssl/privkey.pem \
  -out  /etc/nginx/ssl/fullchain.pem \
  -subj "/CN=localhost"

# 1) Module Nginx + bibliothèques ModSecurity depuis le builder
COPY --from=builder /opt/nginx-1.25.3/objs/ngx_http_modsecurity_module.so /etc/nginx/modules/

COPY --from=builder /usr/local/modsecurity/lib/ /usr/lib/
COPY --from=builder /usr/local/lib/           /usr/lib/

COPY --from=builder /opt/owasp-crs /opt/owasp-crs

COPY nginx/conf/nginx.conf /etc/nginx/nginx.conf
COPY nginx/conf/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/conf/modsecurity.conf /etc/nginx/modsecurity/modsecurity.conf

COPY front/ /usr/share/nginx/html/

# Healthcheck simple (HTTP)
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD \
  wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1
