import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
// import { useUserAuth } from "../../context/UserAuthContext";
import twitterimg from "../../image/twitter.jpeg";
import TwitterIcon from '@mui/icons-material/Twitter';
import "./Login.css";
import {auth} from "../../context/firebase";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    // const { logIn, googleSignIn } = useUserAuth();
    const navigate = useNavigate();
    
    const [signInWithGoogle,
        
        googleUser,
        googleLoading,
        googleError,
    ] = useSignInWithGoogle(auth);


    const [signInWithEmailAndPassword,
         user,
          loading,
           error] = useSignInWithEmailAndPassword(auth)
    
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
    
           
           if(error)
           console.log(error.message)
   
           if(loading)
           console.log("loading.........")

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        await signInWithEmailAndPassword(email, password);
  
    };

    const handleGoogleSignIn = async (e) => {
        console.log("clicked")
        e.preventDefault();
        await signInWithGoogle()
    
    };

    return (
        <>




            <div className="login-container">
                <div className="image-container">
                    <img className=" image" src={twitterimg} alt="twitterImage" />
                </div>

                <div className="form-container">
                    <div className="form-box" >
                        <TwitterIcon style={{ color: "skyblue" }} />
                        <h2 className="heading">Happening now</h2>

                        {error && <p>{error.message}</p>}
                        <form onSubmit={handleSubmit}>

                            <input
                                type="email" className="email"
                                placeholder="Email address"
                                onChange={(e) => setEmail(e.target.value)}
                            />



                            <input className="password"
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />


                            <div className="btn-login">
                                <button type="submit" className="btn" >Log In</button>
                            </div>
                        </form>
                        <hr />
                        <div>
                            <GoogleButton

                                className="g-btn"
                                type="light"

                                onClick={handleGoogleSignIn}
                            />


                        </div>
                    </div>
                    <div>
                        Don't have an account?
                        <Link
                            to="/signup"
                            style={{
                                textDecoration: 'none',
                                color: 'var(--twitter-color)',
                                fontWeight: '600',
                                marginLeft: '5px'
                            }}
                        >
                            Sign up
                        </Link>
                    </div>

                </div>


            </div>


        </>
    );
};

export default Login;