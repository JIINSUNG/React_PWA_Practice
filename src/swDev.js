export default function swDev() {
  let swUrl = `${process.env.PUBLIC_URL}/sw.js`;

  // 서비스 워커 등록
  navigator.serviceWorker.register(swUrl).then((response) => {
    console.warn("response", response);
  });
}
