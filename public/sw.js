let cacheData = "appV1";

// 서비스 워커 설치
this.addEventListener("install", (event) => {
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

this.addEventListener("fetch", (event) => {
  // 데이터를 가져오는데 만약 온라인 상태가 아니라면
  if (!navigator.onLine) {
    event.respondWith(
      // 캐시에서 해당 요청에 대한 응답을 찾는다.
      //만약 캐시에 해당 요청에 대한 응답이 존재한다면, 그 응답을 반환
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        //해당 요청에 대한 응답이 없다면, event.request.clone()을 통해 원본 요청을 복제한 후,
        // fetch(requestUrl)을 호출
        // 오프라인 모드 이므로 호출 하는 부분에서 에러가 날 것임
        // 해당 함수의 에러 처리 부분에서 캐시에 저장된 데이터를 반환하면 됨
        let requestUrl = event.request.clone();
        fetch(requestUrl);
      })
    );
  }
});
