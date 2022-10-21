import React, { useState, useEffect } from 'react'
import axios from 'axios'

// MUI
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Button } from '@mui/material'

const LikeButton = ({ post, user }) => {
   // UseStates
   const [like, setLike] = useState() // Est ce que j'aime ou pas ?

   // Récupération de la liste des likes
   useEffect(() => {
      if (post.usersLiked.includes(user.id)) {
         setLike(true)
      } else {
         setLike(false)
      }
   }, [])

   // Gestion des likes
   const updateLike = async () => {
      setLike(!like)

      try {
         await axios(`http://localhost:3001/updateLike/${post._id}`, {
            method: 'put',
            headers: {
               Authorization: user.token
            },
            params: {
               id: post._id
            },
            data: {
               userId: user.id
            }
         })
      } catch {
         return
      }
   }

   // RENDER
   return (
      <>
         <Button
            aria-label="j'aime"
            className={
               like === true ? 'post__footer__like red' : 'post__footer__like'
            }
            onClick={() => updateLike()}
         >
            <FavoriteIcon color={like === true ? 'primary' : 'tertiary'} />
         </Button>
      </>
   )
}

export default LikeButton
