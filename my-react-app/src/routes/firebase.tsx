import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAisrlSh0cwH0A8aNX9mfYX68rxVFsxyCo",
  authDomain: "twiter-clone-5dfaa.firebaseapp.com",
  projectId: "twiter-clone-5dfaa",
  storageBucket: "twiter-clone-5dfaa.firebasestorage.app",
  messagingSenderId: "551295352270",
  appId: "1:551295352270:web:700de21acd48f740daff9f",
  measurementId: "G-P24WEXCYXE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); => 분석 기능
export const auth = getAuth(app);
