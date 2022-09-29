import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import FavoriteIcon from '@mui/icons-material/Favorite'

const LikeButton = ({ post }) => {
   // UseStates
   const [like, setLike] = useState()

   // Récupération des données de l'utilisateur connecté
   let user = sessionStorage.getItem('user')
   user = user && JSON.parse(user)

   // Récupération de la liste des likes
   useEffect(() => {
      if (post.usersLiked.includes(user.id)) {
         setLike(true)
      } else {
         setLike(false)
      }
   }, [])

   // Gestion des likes
   async function handleLike() {
      setLike(!like)

      await axios(`http://localhost:3001/updateLike/${post._id}`, {
         method: 'put',
         headers: {
            Authorization: user.token,
         },
         params: {
            id: post._id,
         },
         data: {
            userId: user.id,
         },
      })
   }

   // RENDER
   return (
      <>
         <NavLink
            className={
               like === true ? 'post__footer__like red' : 'post__footer__like'
            }
            onClick={() => handleLike()}
         >
            <FavoriteIcon />
         </NavLink>
      </>
   )
}

export default LikeButton
