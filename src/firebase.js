import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyDLv3ukGOqhmMN1N9TQPqHknORw6rohFSo",
  authDomain: "task-management-16680.firebaseapp.com",
  projectId: "task-management-16680",
  storageBucket: "task-management-16680.appspot.com",
  messagingSenderId: "411321653191",
  appId: "1:411321653191:web:6923deebce13d0f14d6be2",
  measurementId: "G-85C4S7FXLN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
const auth = getAuth();
export { app, auth };

