import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from '../context/firebase'
import PageLoading from "./PageLoading";
const ProtectedRoute = ({ children }) => {
    const [user, loading, error] = useAuthState(auth);
      // console.log(user)
      if(loading)
      {
        return <PageLoading/>
      
      }
      console.log("Check user in Private: ", user);
      if (!user) {
        return <Navigate to="/login" />;
    }
    console.log("loggedin")
    return children;
};

export default ProtectedRoute;