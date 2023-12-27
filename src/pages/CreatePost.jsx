import React, { useEffect, useState } from 'react'
import {addDoc, collection} from "firebase/firestore";
import {db, auth} from "../firebase-config";
import {useNavigate} from "react-router-dom";


function CreatePost({isAuth}) {
    const [title, setTitle] = useState("");
    const [post, setPost] = useState("");

    const postsCollectionRef = collection(db, "posts");
    let navigate = useNavigate();
    const createPost = async () => {
        await addDoc(postsCollectionRef, {
            title: title, 
            post: post, 
            author: {name: auth.currentUser.displayName, id: auth.currentUser.uid}
        });
        navigate("/");
    };
    useEffect(() => {
        if (!isAuth){
            navigate("/login");
        }
    }, [])
    return (
        <div className='createPostPage'>
            <div className='cpContainer'>
                <h1>Create A Post</h1>
                <div className="inputGp">
                    <label htmlFor="">Title:</label>
                    <input type="text" placeholder='Title...' onChange={(e) => { setTitle(e.target.value) }} />
                </div>
                <div className="inputGp">
                    <label htmlFor="">Post</label>
                    <textarea onChange={(e) => { setPost(e.target.value) }} placeholder='Post Content...' cols="30" rows="10"></textarea>
                </div>
                <button onClick={createPost}>Submit Post</button>
            </div>
        </div>
    )
}

export default CreatePost