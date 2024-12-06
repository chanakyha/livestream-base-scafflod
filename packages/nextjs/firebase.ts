import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAke4ijl8mNWBsiFglUMNhZOgHMgq7b32o",
  authDomain: "web3-twitch.firebaseapp.com",
  projectId: "web3-twitch",
  storageBucket: "web3-twitch.firebasestorage.app",
  messagingSenderId: "536699337156",
  appId: "1:536699337156:web:966938e250a51eb1638c91",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
