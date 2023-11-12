FROM nginx:1.25.3-alpine
COPY nginx/site.template /etc/nginx/templates/default.conf.template
COPY site /usr/share/nginx/html
RUN find /usr/share/nginx/html -type f ! -regex ".*\.\(jpg\|webp\|png\|otf\|eot\|ttf\|woff\|woff2\|mp4\)$" -exec gzip -9c {} > {}.gz \;

