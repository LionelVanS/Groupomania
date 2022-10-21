// Dépendances et méthodes
import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'
import formData from 'form-data'

// Composants
import ImageTooHeavy from '../../components/ErrorMessage/ImageTooHeavy'
import UploadPictureButton from '../../components/Buttons/UploadPictureButton/UploadPictureButton'

// MUI
import Button from '@mui/material/Button'
import FormIsEmpty from '../../components/ErrorMessage/FormIsEmpty'
import UserProfilIsEmpty from '../../components/ErrorMessage/UserProfilIsEmpty'

const CreatePost = ({ user, mobile, setErrorFromDatabase }) => {
   // Usestates
   const [text, setText] = useState('') // Contient le texte du post
   const [picture, setPicture] = useState() // contient la photo du post
   const [userProfilNotComplet, setUserProfilNotComplet] = useState() // Est ce que le profil de l'utilisateur est complet ?
   const [pictureIsTooHeavy, setPictureIsTooHeavy] = useState() // Est ce que la photo ne dépasse pas le poids max ?
   const [formIsEmpty, setFormIsEmpty] = useState() // Est ce que le formulare est complet ?

   // UseNavigate
   const navigate = useNavigate()

   // Vérification du poids de l'image
   const handlePicture = e => {
      const size = e.target.files[0].size
      if (size > 1500000) {
         setPictureIsTooHeavy(true)
      } else {
         setPicture(e.target.files)
         setPictureIsTooHeavy(false)
      }
   }

   // Récupération des infos du post
   const handleData = e => {
      e.preventDefault()

      // Création du post
      if (text && picture) {
         const form = new formData()
         form.append('text', text)
         form.append('file', picture[0])
         form.append('date', Date.now())

         setFormIsEmpty(false)
         requestToAPI(user, form)
      } else {
         setFormIsEmpty(true)
      }
   }

   // Enregistrement du post dans la BDD
   const requestToAPI = (user, form) => {
      if ('name' in user) {
         axios({
            method: 'post',
            url: 'http://localhost:3001/createPost',
            headers: {
               Authorization: user.token
            },
            data: form
         })
            .then(() => {
               setUserProfilNotComplet(false)
               navigate('/home')
            })
            .catch(err => setErrorFromDatabase(err.code))
      } else {
         setUserProfilNotComplet(true)
      }
   }

   // RENDER
   return (
      <>
         <main className={mobile ? 'mobile-create-post' : 'create-post'}>
            <h1>Partagez avec vos collègues !</h1>
            <form
               id="form"
               className={
                  mobile ? 'mobile-create-post__form' : 'create-post__form'
               }
            >
               <p className="create-post__form__description">
                  Ce site à une vocation de partage, veillez à respecter
                  l'ensemble de vos collègues et soyez polis les uns envers les
                  autres. Bien entendu, aucun message incitant à la haine ou
                  provocateur ne saurait être toléré. <br />
                  <br />
                  Merci !
               </p>
               <div className="create-post__form__input">
                  <textarea
                     id="message-area"
                     type="text"
                     aria-label="créer un post"
                     placeholder="Votre Message"
                     className="create-post__form__input__text"
                     value={text}
                     onChange={e => setText(e.target.value)}
                     required
                  />
                  {/* BOUTON TELECHARGER L'IMAGE */}
                  <UploadPictureButton
                     pictureIsTooHeavy={pictureIsTooHeavy}
                     handlePicture={handlePicture}
                  />
               </div>
               {formIsEmpty ? <FormIsEmpty /> : ''}
               {pictureIsTooHeavy ? <ImageTooHeavy /> : ' '}

               {userProfilNotComplet ? (
                  <>
                     <UserProfilIsEmpty />
                     <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        className="btn"
                     >
                        <NavLink to="/updateUser">
                           Modifier votre Profil
                        </NavLink>
                     </Button>
                  </>
               ) : (
                  <>
                     <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        className="btn"
                        onClick={e => handleData(e)}
                     >
                        Poster
                     </Button>
                  </>
               )}
            </form>
         </main>
      </>
   )
}

export default CreatePost
