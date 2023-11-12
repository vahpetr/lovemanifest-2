const CACHE_NAME = "v1";
const urlsToCache = [
  "/",
  "index.html",
  "styles.css",
  "favicon.ico",
  "media/video1.mp4",
  "media/heart.svg",
  "media/og_image.jpg",
  "icons/android-chrome-192x192.png",
  "icons/android-chrome-512x512.png",
  "icons/apple-touch-icon.png",
  "icons/favicon-16x16.png",
  "icons/favicon-32x32.png",
  "icons/maskable_icon_x48.png",
  "icons/maskable_icon_x72.png",
  "icons/maskable_icon_x96.png",
  "icons/maskable_icon_x128.png",
  "icons/maskable_icon_x192.png",
  "icons/maskable_icon_x384.png",
  "icons/maskable_icon_x512.png",
  "icons/mstile-150x150.png",
  "icons/safari-pinned-tab.svg",
  "fonts/tt-espina/TT_Espina_Black.eot",
  "fonts/tt-espina/TT_Espina_Black.otf",
  "fonts/tt-espina/TT_Espina_Black.ttf",
  "fonts/tt-espina/TT_Espina_Black.woff",
  "fonts/tt-espina/TT_Espina_Black.woff2"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      const cachePromises = urlsToCache.map((url) => {
        return cache.add(url).catch((err) => {
          console.error(`Ошибка при кэшировании ${url}: ${err}`);
        });
      });
      return Promise.all(cachePromises);
    })
  );
});

self.addEventListener("fetch", (event) => {
  console.log("Обработка fetch для", event.request.url);

  const url = new URL(event.request.url);
  if (!url.protocol.startsWith("http")) {
    console.log("Кеширование ресурса отменено:", event.request.url);
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log("Найдено в кеше:", event.request.url);
        return response;
      }

      console.log("Не найдено в кеше, загрузка из сети:", event.request.url);
      return fetch(event.request).then((response) => {
        // Этот блок кода можно использовать, если вы хотите кэшировать новые запросы динамически
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        var responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
          console.log("Динамически добавленно в кеш:", event.request.url);
        });

        return response;
      });
    })
  );
});
