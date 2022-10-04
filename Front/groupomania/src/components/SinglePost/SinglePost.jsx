import React, { useState, useEffect } from 'react'
import axios from 'axios'
import formData from 'form-data'
import Button from '@mui/material/Button'
import LikeButton from '../LikeButton/LikeButton'

const SinglePost = ({ post }) => {
   // Récupération des infos du propriétaire des posts
   useEffect(() => {
      const postUserId = post.userId
      axios
         .get(`http://localhost:3001/getPostUser/${postUserId}`, config)
         .then((res) => setPostUser(res.data.postUser))
         .catch((err) => console.log(err))
   }, [])

   // Création des Headers pour les requêtes
   let user = sessionStorage.getItem('user')
   user = user && JSON.parse(user)
   const config = {
      headers: {
         Authorization: user.token,
      },
   }

   // UseStates
   const [isEditing, setIsEditing] = useState(false)
   const [postUser, setPostUser] = useState(post)
   const [editContent, setEditContent] = useState(' ')
   const [picture, setPicture] = useState()

   // Modification du timeStamp des posts
   const date = new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
   }).format(post.date)

   // Requête PUT
   async function putRequest() {
      console.log(editContent)
      console.log(picture)
      if (!editContent && !picture) {
         setIsEditing(false)
      } else if (user.id === post.userId && editContent) {
         const form = new formData()
         form.append('userName', user.name)
         form.append('userSurname', user.surname)
         form.append('userPicture', user.picture)
         form.append('text', editContent)
         form.append('file', picture[0])
         form.append('date', Date.now())
         try {
            await axios(`http://localhost:3001/updatePost/${post._id}`, {
               method: 'put',
               headers: {
                  Authorization: user.token,
               },
               data: form,
            })
            window.location.reload()
            setIsEditing(false)
         } catch {
            return
         }
      }
   }

   // Suppression d'un post
   function handleDeletePost() {
      const postId = post._id
      const postUser = post.userId
      const currentUser = user.id

      if (postUser === currentUser) {
         try {
            axios({
               method: 'delete',
               url: `http://localhost:3001/deletePost/${postId}`,
               headers: {
                  Authorization: user.token,
               },
            })
               .then((res) => console.log(res))
               .catch((err) => console.log(err))
            window.location.reload()
         } catch {
            console.log('bla')
         }
      } else {
         console.log('bla')
      }
   }

   // RENDER
   return (
      <>
         <article className="post">
            {/* UTILISATEUR */}

            <div className="post__user">
               <img
                  src={postUser.picture}
                  alt="profil"
                  className="post__user__id-pic"
               />
               <div className="post__user__identity">
                  <p className="post__user__identity__surname">
                     {postUser.surname}
                  </p>
                  <p className="post__user__identity__name">{postUser.name}</p>
               </div>
            </div>

            {/* CORPS DU POST */}

            <div className="post__content">
               {/* CORPS DU POST */}

               {isEditing ? (
                  <textarea
                     onChange={(e) => setEditContent(e.target.value)}
                     defaultValue={post.text}
                  ></textarea>
               ) : (
                  <p>{post.text}</p>
               )}

               {/* IMAGE DU POST */}
               {isEditing ? (
                  <input
                     type="file"
                     name="file"
                     accept=".jpg, .jpeg, .png"
                     id="file"
                     className="add-post-form__picture"
                     onChange={(e) => setPicture(e.target.files)}
                     required
                  />
               ) : (
                  <img
                     src={post.picture}
                     alt="post"
                     className="post__post-picture"
                  ></img>
               )}

               <p className="post__date">{date}</p>
            </div>

            {/* BOUTONS J'AIME */}

            <div className="post__footer">
               <LikeButton post={post} />

               {/* BOUTONS MODIFIER ET SUPPRIMER */}

               {user.id === post.userId ? (
                  <div className="post__footer__data">
                     <div className="post__footer__data__edit-icon">
                        {isEditing ? (
                           <button
                              className="btn valid"
                              onClick={(e) => putRequest(e)}
                           >
                              Valider
                           </button>
                        ) : (
                           <Button
                              variant="text"
                              className="btn edit"
                              onClick={() => setIsEditing(true)}
                           >
                              Modifier
                           </Button>
                        )}
                     </div>
                     <Button
                        variant="text"
                        className="btn delete"
                        onClick={() => handleDeletePost()}
                     >
                        Supprimer
                     </Button>
                  </div>
               ) : (
                  ''
               )}
            </div>
         </article>
      </>
   )
}

export default SinglePost
