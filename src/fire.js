// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyB896pvCZwGVU5RUIWBIVzUAtTllNAu0n8",
//   authDomain: "fir-auth-1132.firebaseapp.com",
//   projectId: "fir-auth-1132",
//   storageBucket: "fir-auth-1132.appspot.com",
//   messagingSenderId: "1029021654707",
//   appId: "1:1029021654707:web:14aa4dee98449061701ac6",
//   measurementId: "G-MFP6M081T7",
// };

// const app = initializeApp(firebaseConfig);

// const auth = getAuth();

// export { app, auth };

// Import the functions you need from the SDKs you need
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

// const analytics = getAnalytics(app);
// const app = initializeApp(firebaseConfig);

// const auth = getAuth();