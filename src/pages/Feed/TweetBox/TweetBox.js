import React, { useState } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import axios from "axios";
// import { useUserAuth } from "../../../context/UserAuthContext";
import useLoggedInUser from "../../../hooks/useLoggedInUser";
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from "../../../context/firebase";

function TweetBox() {
    const [post, setPost] = useState('')
    const [imageURL, setImageURL] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [username, setUsername] = useState(' ');
    const [loggedInUser] = useLoggedInUser();
    const [user]=useAuthState(auth);
    // const { user } = useUserAuth();
    const email = user?.email;
    console.log(email)
    console.log(user)

    const y=process.env.REACT_APP_IMAGE_API;
    const x=process.env.REACT_APP_SERVER_URL;

    const userProfilePic = loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
    // const userProfilePic = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"

    // console.log(user?.providerData[0]?.providerId);

    const handleUploadImage = e => {
        setIsLoading(true);
        const image = e.target.files[0];

        const formData = new FormData();
        formData.set('image', image)

        axios.post(`https://api.imgbb.com/1/upload?key=${y}`, formData)
            .then(res => {
                setImageURL(res.data.data.display_url);
                console.log(res.data.data.display_url);
                setIsLoading(false)
                // console.log(res)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleTweet = (e) => {
        e.preventDefault();
                

        console.log("yes")
        if (user?.providerData[0]?.providerId === 'password') {
            fetch(`${x}/loggedInUser?email=${email}`)
            .then(res => 
                res.json())
            .then(data => {
                    setName(data[0]?.name)
                    setUsername(data[0]?.username)
                })
        }
        else {
            setName(user?.displayName)
            setUsername(email?.split('@')[0])
        }

        if (name) {
            const userPost = {
                profilePhoto: userProfilePic,
                post: post,
                photo: imageURL,
                username: username,
                name: name,
                email: email,
            }
            console.log(userPost);
            setPost('')
            setImageURL('')
            fetch(`${x}/post`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userPost),
            })
            // console.log("post")
            .then(res => res.json())
            .then(data => {
                console.log("res")
                    console.log(data);

                })
        }
    }

    return <div className="tweetBox">
        <form onSubmit={handleTweet}>
            <div className="tweetBox__input">
                {/* <Avatar src={loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} /> */}
                <Avatar src={ "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} />
                <input
                    type="text"
                    placeholder="What's happening?"
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    required
                />

            </div>
            <div className="imageIcon_tweetButton">
                <label htmlFor='image' className="imageIcon">
                    {
                        isLoading ? <p>Uploading Image</p> : <p>{imageURL ? 'Image Uploaded' : <AddPhotoAlternateOutlinedIcon />}</p>
                    }
                </label>
                <input
                    type="file"
                    id='image'
                    className="imageInput"
                    onChange={handleUploadImage}
                />
                <Button className="tweetBox__tweetButton" type="submit">Tweet</Button>
            </div>
        </form>

    </div>
}
export default TweetBox;