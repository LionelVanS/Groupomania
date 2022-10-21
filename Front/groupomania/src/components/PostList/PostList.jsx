import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Composants
import SinglePost from '../SinglePost/SinglePost'
import MobileSinglePost from '../SinglePost/MobileSinglePost/MobileSinglePost'

const PostList = ({ user, mobile, tablet, setErrorFromDatabase }) => {
   // UseStates
   const [posts, setPosts] = useState([]) // Contient les posts récupérer par la requête

   // Obtention des posts
   useEffect(() => {
      axios
         .get('http://localhost:3001/getAllPosts', {
            headers: {
               Authorization: user.token
            }
         })
         .then(res => setPosts(res.data.post))
         .catch(err => setErrorFromDatabase(err.code))
   }, [])

   // Tri du tableau de posts par ordre antéchronologique
   const newPost = posts.sort((a, b) => b.date - a.date)

   // RENDER
   return (
      <>
         <h1>Découvrez les nouveautés chez Groupomania !</h1>

         {newPost.map((post, index) =>
            mobile ? (
               <MobileSinglePost
                  key={index}
                  post={post}
                  user={user}
                  setErrorFromDatabase={setErrorFromDatabase}
               />
            ) : (
               <SinglePost
                  key={index}
                  post={post}
                  user={user}
                  tablet={tablet}
                  setErrorFromDatabase={setErrorFromDatabase}
               />
            )
         )}
      </>
   )
}

export default PostList
