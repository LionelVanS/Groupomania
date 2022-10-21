// DEPENDANCES ET METHODES
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import formData from 'form-data'

// COMPOSANTS
import PostUser from '../../PostUser/PostUser'
import FormIsEmpty from '../../ErrorMessage/FormIsEmpty'

// BOUTONS
import LikeButton from '../../Buttons/LikeButton/LikeButton'
import EditButton from '../../Buttons/EditButton/EditButton'
import CancelButton from '../../Buttons/CancelButton/CancelButton'
import ValidateButton from '../../Buttons/ValidateButton/ValidateButton'
import DeleteButton from '../../Buttons/DeleteButton/DeleteButton'

// MUI
import { ButtonGroup, Chip } from '@mui/material'
import ImageTooHeavy from '../../ErrorMessage/ImageTooHeavy'
import UploadPictureButton from '../../Buttons/UploadPictureButton/UploadPictureButton'

const SinglePost = ({ post, user, setErrorFromDatabase }) => {
   // UseStates
   const [isEditing, setIsEditing] = useState(false) // Est ce que le post est en modification
   const [formIsNotComplet, setFormIsNotComplet] = useState() // Est ce que le formulaire est rempli
   const [pictureIsTooHeavy, setPictureIsTooHeavy] = useState() // Est ce que la photo n'est pas trop lourde
   const [isAdmin, setIsAdmin] = useState(false) // Est ce que l'utilisateur est administrateur
   const [postUsers, setPostUsers] = useState([]) // Contient les profils des propriétaires des posts
   const [editContent, setEditContent] = useState() // Contient les modifications de texte d'un post
   const [picture, setPicture] = useState() // Contient l'image modifié d'un post

   // Récupération des infos du propriétaire des posts
   useEffect(() => {
      const postUserId = post.userId
      axios
         .get(`http://localhost:3001/getPostUser/${postUserId}`, {
            headers: {
               Authorization: user.token
            }
         })
         .then(res => setPostUsers(res.data.user))
         .catch(err => setErrorFromDatabase(err.code))
   }, [])

   // Vérification si l'utilisateur n'est pas administrateur
   useEffect(() => {
      if (user.admin === true) {
         setIsAdmin(true)
      }
   }, [])

   // Vérification du poids de l'image
   const checkPicture = e => {
      const size = e.target.files[0].size
      if (size > 1500000) {
         setPictureIsTooHeavy(true)
      } else {
         setPicture(e.target.files)
         setPictureIsTooHeavy(false)
      }
   }

   // Modification du timeStamp des posts
   const date = new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
   }).format(post.date)

   // Modification d'un post
   const updatePost = async () => {
      if (
         (user.id === post.userId || isAdmin === true) &&
         editContent !== undefined &&
         picture !== undefined
      ) {
         const form = new formData()
         form.append('admin', user.admin)
         form.append('text', editContent)
         form.append('file', picture[0])
         form.append('date', Date.now())
         setFormIsNotComplet(false)

         try {
            await axios(`http://localhost:3001/updatePost/${post._id}`, {
               method: 'put',
               headers: {
                  Authorization: user.token
               },
               data: form
            })
            setIsEditing(false)
            window.location.reload()
         } catch {
            return
         }
      } else {
         setFormIsNotComplet(true)
      }
   }

   // Suppression d'un post
   const deletePost = () => {
      const postId = post._id
      const currentUser = user.id

      if (postUsers.id === currentUser || isAdmin === true) {
         axios({
            method: 'delete',
            url: `http://localhost:3001/deletePost/${postId}`,
            headers: {
               Authorization: user.token
            }
         })
            .then(() => {
               window.location.reload()
            })
            .catch(err => setErrorFromDatabase(err.code))
      } else {
         return
      }
   }

   // Annulation de la modification de post
   const cancelUpdate = () => {
      setIsEditing(false)
      setEditContent()
      setPicture()
      setFormIsNotComplet(false)
      setPictureIsTooHeavy(false)
   }

   // RENDER
   return (
      <>
         <article className="post-mobile">
            <div className="post-mobile__module">
               {/* UTILISATEUR */}
               <PostUser postUsers={postUsers} />

               <div className="post-mobile-content">
                  {/* CONTENU DU POST */}
                  {isEditing ? (
                     <>
                        <div className="post-mobile-content__update">
                           <UploadPictureButton
                              pictureIsTooHeavy={pictureIsTooHeavy}
                              handlePicture={checkPicture}
                           />
                           <textarea
                              className="post-mobile-content__update__textarea"
                              onChange={e => setEditContent(e.target.value)}
                              defaultValue={post.text}
                           ></textarea>
                           {/* ERREUR EN CAS DE CHAMPS MANQUANTS */}
                           {formIsNotComplet ? <FormIsEmpty /> : ''}
                           {/* ERREUR EN CAS D'IMAGE TROP LOURDE */}
                           {pictureIsTooHeavy ? <ImageTooHeavy /> : ' '}
                        </div>
                     </>
                  ) : (
                     <>
                        <img
                           src={post.picture}
                           alt="post"
                           className="post-mobile__post-picture"
                        ></img>
                        <p className="post-mobile-content__text">{post.text}</p>
                        <p className="post-mobile-content__date">{date}</p>
                     </>
                  )}
               </div>

               <div className="post-mobile-footer">
                  {isAdmin ? (
                     <Chip
                        color="secondary"
                        label="Droits Administrateur"
                        className="post-mobile-footer__admin"
                     />
                  ) : (
                     ''
                  )}
                  <ButtonGroup
                     variant="text"
                     className="post-mobile-footer__buttons"
                  >
                     {/* BOUTON J'AIME */}
                     {isEditing ? '' : <LikeButton post={post} user={user} />}

                     {/* VERIFICATIONS DES DROITS SUR LE POST */}
                     {user.id === post.userId || isAdmin === true ? (
                        <>
                           {isEditing ? (
                              <>
                                 {/* BOUTON VALIDER */}
                                 <ValidateButton putRequest={updatePost} />
                                 {/* BOUTON ANNULER */}
                                 <CancelButton cancelUpdate={cancelUpdate} />
                              </>
                           ) : (
                              // BOUTON MODIFIER
                              <EditButton setIsEditing={setIsEditing} />
                           )}

                           {/* BOUTON SUPPRIMER */}
                           <DeleteButton handleDeletePost={deletePost} />
                        </>
                     ) : (
                        ''
                     )}
                  </ButtonGroup>
               </div>
            </div>
         </article>
      </>
   )
}

export default SinglePost
