import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SinglePost from '../SinglePost/SinglePost'

const PostList = () => {
   // UseStates
   const [posts, setPosts] = useState([])

   // Création des Headers pour les requêtes
   let userId = sessionStorage.getItem('user')
   userId = userId && JSON.parse(userId)
   const config = {
      headers: {
         Authorization: userId.token,
      },
   }

   // Requête GET pour obtenir les posts
   useEffect(() => {
      axios
         .get('http://localhost:3001/getAllPosts', config)
         .then((res) => setPosts(res.data))
         .catch((err) => console.log(err))
   }, [])

   // RENDER
   return (
      <>
         {posts.map((post, index) => (
            <SinglePost key={index} post={post} />
         ))}
      </>
   )
}

export default PostList
