import React, { useEffect, useState } from 'react'
import {db, auth} from "../firebase-config";
import {getDocs, doc, collection, deleteDoc} from "firebase/firestore";
function Home({isAuth}) {
  const [postLists, setPostLists] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostLists(data.docs.map((doc) => ({...doc.data(), id: doc.id}))); 
    }

    getPosts();
  });
  const deletePost = async (id) =>{
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  }
  return (
    <div className='homePage'>
      {postLists.map((post) => {
        return (
        <div className='post'>
          <div className="postHeader">
            <div className="title">
              <h1>{post.title}</h1>
            </div>
            <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    🗑️
                  </button>
                )}
            </div>
          </div>
          <div className="postTextContainer">{post.post}</div>
          <h3>@ {post.author.name}</h3>  
        </div>);
      })}
    </div>
  )
}

export default Home