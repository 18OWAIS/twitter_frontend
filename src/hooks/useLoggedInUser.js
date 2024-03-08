import { useEffect, useState } from "react";
// import { useUserAuth } from "../context/UserAuthContext";
import {auth} from "../context/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const useLoggedInUser = () => {
    const [user ] = useAuthState(auth);
    const email = user?.email;
    // console.log(email)
    // console.log(user)
    const [loggedInUser, setLoggedInUser] = useState({});

    const x=process.env.REACT_APP_SERVER_URL;
    useEffect(() => {
        fetch(`${x}/loggedInUser?email=${email}`)
            .then(res => res.json())
            .then(data => {
                setLoggedInUser(data)
            })
    }, [])

    return [loggedInUser, setLoggedInUser];
}

export default useLoggedInUser