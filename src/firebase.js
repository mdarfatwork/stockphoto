import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBud3LrW9CMDBz9ZZkejirT3Y2hPBRqTac",
  authDomain: "arfatstockphoto.firebaseapp.com",
  projectId: "arfatstockphoto",
  storageBucket: "arfatstockphoto.appspot.com",
  messagingSenderId: "755084263203",
  appId: "1:755084263203:web:ddfb5d5177aceb11f19696"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);