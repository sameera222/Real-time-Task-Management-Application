// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./components/Home";
// import Login from "./components/Login";
// import Signup from "./components/SignUp";
// import { auth } from "./fire";
// import "./App.css";
// import CreateTask from "./components/CreateTask";
// import Navbar from "./components/Navbar";

// function App() {
//   const [userName, setUserName] = useState("");

//   useEffect(() => {
//     auth.onAuthStateChanged((user) => {
//       if (user) {
//         setUserName(user.displayName);
//       } else setUserName("");
//     });
//   }, []);

//   return (
//     <div className="App">
//       <Router>
//         <Navbar/>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/createTask" element={<CreateTask />} />
//           <Route path="/" element={<Home name={userName} />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;
// import './App.css';
// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import SignUp from './components/SignUp';
// import Login from './components/Login';
// import {useState, useEffect} from 'react';
// import {AuthProvider} from './components/AuthContext';
// import {auth} from './fire';
// import {onAuthStateChanged} from 'firebase/auth';
// import PrivateRoute from './components/PrivateRoute';
// import Home from "./components/Home";
// import {Navigate} from 'react-router-dom';

// function App() {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//     })
//   }, []);

//   return (
//     <Router>
//       <AuthProvider value={{currentUser}}>
//         <Routes>
//           <Route exact path='/' element={
//             <PrivateRoute>
//               <Home/>

//             </PrivateRoute>
//           }/>
//           <Route path="/login" element={
//             !currentUser
//             ? <Login/>
//             : <Navigate to='/' replace/>
//           } />
//           <Route path="/SignUp" element={
//             !currentUser
//             ? <SignUp/>
//             : <Navigate to='/' replace/>
//           } />

//         </Routes>
//       </AuthProvider>
//   </Router>
//   );
// }

// export default App;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Navbar from "./components/Navbar";
import CreateTask from "./components/CreateTask";
import PrivateRoute from "./components/PrivateRoute";

import { UserAuthContextProvider } from "./context/UserAuthContext";
import ViewUpdateDeletePage from "./components/ViewUpdateDeletepage";


function App() {

  return (
    <UserAuthContextProvider>
      <Router>
        <Routes>
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Navbar />
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/createTask" element={<CreateTask />} />
          <Route
            path='tasks/:id'
            element={<ViewUpdateDeletePage />}
          />
        </Routes>
      </Router>
    </UserAuthContextProvider>
  );
}

export default App;
