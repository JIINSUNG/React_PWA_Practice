let cacheData = "appV1";

// 서비스 워커 설치
self.addEventListener("install", (event) => {
  event.waitUntil(
    // 캐시를 열고, 캐시에 필요한 파일들을 저장
    // 캐시에 저장할 파일들을 배열로 저장
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "/static/js/bundle.js",
        "/index.html",
        "/",
        "/users",
        "/about",
        "/app.js",
        "/style.css",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  // 데이터를 가져오는데 만약 온라인 상태가 아니라면
  if (!navigator.onLine) {
    if(event.request.url === "http://localhost:3000/static/js/bundle.js"){
    event.waitUntil(
      this.registration.showNotification("Internet", {
        body: "Internet not working",
      })
    );
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // 캐시에 리소스가 존재하는 경우 캐시에서 반환
      if (response) {
        return response;
      }
    })
  );

  return fetch(event.request).then(function (response) {
    // 유효한 응답인 경우 캐시에 저장
    if (!response || response.status !== 200 || response.type !== "basic") {
      return response;
    }

    var responseToCache = response.clone();

    caches.open(cacheData).then((cache) => {
      cache.put(event.request, responseToCache);
    });

    return response;
  });
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
