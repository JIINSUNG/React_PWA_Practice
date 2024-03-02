export default function swDev() {
  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // 서버로 부터 받은 VAPID 공개키
  const publicKey =
    "BHooaUT-bXWviVr5idV20Yw99wUtrQsmXIQMnfrecxlivXYRWFQQGMH9EDG2-_gNorDcSlQVLXwrkIYqXF9HR7Y";
  // getToken(messaging, { vapidKey: publicKey });

  // Base64 디코딩: 푸시 서비스에서 사용하는 공개 키는 보통 Base64로 인코딩되어 있습니다. 따라서 이를 디코딩하여 바이너리 형태로 변환해야 합니다.
  // Uint8Array 생성: 대부분의 푸시 서비스는 공개 키를 Uint8Array 형식으로 사용합니다. 이 함수는 디코딩된 바이너리 데이터를 Uint8Array로 변환하여 반환합니다.

  // process.env.PUBLIC_URL는 PUBLIC 폴더의 경로를 가리킴
  let swUrl = `${process.env.PUBLIC_URL}/sw.js`;

  // 서비스 워커를 등록
  navigator.serviceWorker.register(swUrl).then((response) => {
    console.warn("response", response);
    return response.pushManager.getSubscription().then(function (subscription) {
      return response.pushManager.subscribe({
        //userVisibleOnly는 푸시 알림이 사용자에게 표시되는지 여부를 나타냄, true인 경우만 사용자에게 알림 표시됨
        userVisibleOnly: true,
        // 푸시 서비스에서 웹 애플리케이션을 식별하는 데 사용되는 키
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });
    });
  });
}
