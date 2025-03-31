import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyC20qxzh8H4zN6YKZbUfiYcfbp2G_pI63k",
    authDomain: "useful-librairies-test.firebaseapp.com",
    projectId: "useful-librairies-test",
    storageBucket: "useful-librairies-test.firebasestorage.app",
    messagingSenderId: "89383818052",
    appId: "1:89383818052:web:ec97c459c5b2c9b90afd11"
}

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

export { storage, auth };