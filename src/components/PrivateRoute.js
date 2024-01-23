// import {Navigate} from 'react-router-dom'
// import {useAuthValue} from './AuthContext'

// export default function PrivateRoute({children}) {
//   const {currentUser} = useAuthValue()

//   if(!currentUser){
//     return <Navigate to='/login' replace/>
//   }

//   return children
// }

import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();

  console.log("Check user in Private: ", user);
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;