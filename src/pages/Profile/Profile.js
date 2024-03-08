import React from 'react'
import '../pages.css'
// import { useUserAuth } from "../../context/UserAuthContext"
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '../../context/firebase'
import MainProfile from './MainProfile/MainProfile'

function Profile() {

    const [ user ] = useAuthState(auth);
    return (
        <div className='profilePage'>
            <MainProfile user={user} />
        </div>
    )
}

export default Profile