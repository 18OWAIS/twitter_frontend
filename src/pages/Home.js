import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Widgets from "./Widgets/Widgets";
import Feed from "./Feed/Feed";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from '../context/firebase'
import { signOut } from "firebase/auth";


const Home = () => {
    const  user= useAuthState(auth);
    console.log(user[0])
    const handleLogout =  () => {
       signOut(auth);
    };
    return (
        <div className="app">
            <Sidebar handleLogout={handleLogout} user={user[0]} />
            <Outlet />
            <Widgets />
        </div>
    );
};

export default Home;