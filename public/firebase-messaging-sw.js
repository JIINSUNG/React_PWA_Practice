importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMBCsax5FycTNygrzS9P3haayjpWs8WSY",
  authDomain: "findear-80793.firebaseapp.com",
  projectId: "findear-80793",
  storageBucket: "findear-80793.appspot.com",
  messagingSenderId: "966001186521",
  appId: "1:966001186521:web:8103039d53aeb0b08810c8",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  //   console.log('[firebase-messaging-sw.js] Received background message ', payload);
  console.log(
    "[firebase-messaging-sw.js] PAYLOAD NOTIFICATION: ",
    payload.notification
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// /*
// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("../firebase-messaging-sw.js")
//     .then(function (registration) {
//       console.log("Registration successful, scope is:", registration.scope);
//     })
//     .catch(function (err) {
//       console.log("Service worker registration failed, error:", err);
//     });
// }*/
