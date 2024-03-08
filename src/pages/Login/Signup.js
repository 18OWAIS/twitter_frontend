import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useUserAuth } from "../../context/UserAuthContext";
import twitterimg from "../../image/twitter.jpeg";
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleButton from "react-google-button";
import "./Login.css"
import {auth} from "../../context/firebase";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
const Signup = () => {
    const [username, setUsername] = useState(" ");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [password, setPassword] = useState("");
    // const { signUp } = useUserAuth();
    // const { googleSignIn } = useUserAuth();
   
    const x=process.env.REACT_APP_SERVER_URL;

    let navigate = useNavigate();

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);
    
      const [signInWithGoogle,
        googleUser,
        googleLoading,
        googleError,
    ] = useSignInWithGoogle(auth);



    useEffect(() => {
        if (googleUser) {
            console.log(googleUser);
            navigate('/');
        }
        if (user) {
            console.log(user);
            navigate('/');
        }
    }, [user, googleUser, navigate]);




    const handleSubmit = async (e) => {
        console.log("clicked")
        
        e.preventDefault();
        setErrorMessage("");


        try {
     
            const data=await createUserWithEmailAndPassword(email,password)
            
            if(loading)
        console.log("loading.........")

        
        if(error)
        console.log(error.message)
            
            console.log(data)


            const user = {
                username: username,
                name: name,
                email: email,
            }

            fetch(`${x}/register`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        console.log(data)
                        navigate('/')
                    }
                })

        } catch (err) {
            setErrorMessage(err.message);
            window.alert(err.message);
        }
    };

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        signInWithGoogle()
        console.log(googleUser)
        if(user || googleUser)
           {
               console.log(user)
                 navigate('/')
           }

    };

    return (

        <>
            <div className="login-container">

                <div className="image-container">
                    <img className="image" src={twitterimg} alt="twitterImage" />
                </div>


                <div className="form-container">
                    <div className="">
                        <TwitterIcon className="Twittericon" style={{ color: "skyblue" }} />

                        <h2 className="heading">Happening now</h2>

                        <div class="d-flex align-items-sm-center">
                            <h3 className="heading1"> Join twitter today </h3>
                        </div>


                        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                        <form onSubmit={handleSubmit}>

                            <input className="display-name" style={{ backgroudColor: "red" }}
                                type="username"
                                placeholder="@username "
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <input className="display-name" style={{ backgroudColor: "red" }}
                                type="name"
                                placeholder="Enter Full Name"
                                onChange={(e) => setName(e.target.value)}
                            />

                            <input className="email"
                                type="email"
                                placeholder="Email address"
                                onChange={(e) => setEmail(e.target.value)}
                            />



                            <input className="password"
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />


                            <div className="btn-login">
                                <button type="submit" className="btn">Sign Up</button>
                            </div>
                        </form>
                        <hr />
                        <div className="google-button">
                            <GoogleButton

                                className="g-btn"
                                type="light"

                                onClick={handleGoogleSignIn}
                            />
                        </div>
                        <div>
                            Already have an account?
                            <Link
                                to="/login"
                                style={{
                                    textDecoration: 'none',
                                    color: 'var(--twitter-color)',
                                    fontWeight: '600',
                                    marginLeft: '5px'
                                }}
                            >
                                Log In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Signup;