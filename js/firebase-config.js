// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// IMPORTANT: Replace these values with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhRoR3q-PxVryH7D2WmGVGBY83h3XueF8",
  authDomain: "sanjeevni-67391.firebaseapp.com",
  projectId: "sanjeevni-67391",
  storageBucket: "sanjeevni-67391.firebasestorage.app",
  messagingSenderId: "501400228336",
  appId: "1:501400228336:web:4d4b04dd5b512a7cf78d35",
  measurementId: "G-Y3NJKM446E"
};  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;