// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNPjUh49_umSBsW9VJbRDxxHBv7feiM_8",
  authDomain: "upload-image-61981.firebaseapp.com",
  projectId: "upload-image-61981",
  storageBucket: "upload-image-61981.appspot.com",
  messagingSenderId: "424013547854",
  appId: "1:424013547854:web:d9fdad9fa9f8345943f61f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);