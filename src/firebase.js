import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMBCsax5FycTNygrzS9P3haayjpWs8WSY",
  authDomain: "findear-80793.firebaseapp.com",
  projectId: "findear-80793",
  storageBucket: "findear-80793.appspot.com",
  messagingSenderId: "966001186521",
  appId: "1:966001186521:web:8103039d53aeb0b08810c8",
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
