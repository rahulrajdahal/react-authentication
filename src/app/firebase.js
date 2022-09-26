import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWLVHOz-JLHsUdfMcvGW6mIPCvri2pRsk",
  authDomain: "web-apps-33cce.firebaseapp.com",
  projectId: "web-apps-33cce",
  storageBucket: "web-apps-33cce.appspot.com",
  messagingSenderId: "778800259426",
  appId: "1:778800259426:web:df77f9e49ddca8bdee0c3b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
