FROM nginx:1.25.3-alpine
COPY nginx/site.template /etc/nginx/templates/default.conf.template
COPY site/media/video1.mp4 /usr/share/nginx/html/media/
COPY site/media/heart.svg site/media/logo.png site/media/og_image.jpg /usr/share/nginx/html/media/
COPY site/icons /usr/share/nginx/html/icons
COPY site/favicon.ico site/robots.txt site/browserconfig.xml site/site.webmanifest site/manifest.json /usr/share/nginx/html/
COPY site/index.html /usr/share/nginx/html/
COPY site/service-worker.js /usr/share/nginx/html/
COPY site/styles.css /usr/share/nginx/html/
RUN find /usr/share/nginx/html -type f ! -regex ".*\.\(jpg\|webp\|png\|otf\|eot\|ttf\|woff\|woff2\|mp4\)$" -exec gzip -9c {} > {}.gz \;
COPY --chown=nginx:nginx . /usr/share/nginx/html
RUN chmod -R 755 /usr/share/nginx/html

