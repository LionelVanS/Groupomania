// Dépendances et méthodes
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import formData from 'form-data'

// Composants
import UploadPictureButton from '../../components/Buttons/UploadPictureButton/UploadPictureButton'
import ImageTooHeavy from '../../components/ErrorMessage/ImageTooHeavy'
import FormIsEmpty from '../../components/ErrorMessage/FormIsEmpty'

// MUI
import { TextField, Button } from '@mui/material'

const UpdateUser = ({
   user,
   mobile,
   setErrorFromDatabase,
   userProfilIsEmpty
}) => {
   // UseNavigate
   const navigate = useNavigate()

   // Usestates
   const [name, setName] = useState(' ') // Contient le nouveau nom de l'utilisateur
   const [surname, setSurname] = useState(' ') // Contient le nouveau prénom de l'utilisateur
   const [picture, setPicture] = useState() // Contient la nouvelle image de profil de l'utilisateur
   const [pictureIsTooHeavy, setPictureIsTooHeavy] = useState() // Est ce que la photo ne dépasse pas le poids max ?
   const [formIsEmpty, setFormIsEmpty] = useState() // Est ce que le formulaire est complet ?

   // Vérification du poids des images
   const handlePicture = e => {
      const size = e.target.files[0].size
      if (size > 1500000) {
         setPictureIsTooHeavy(true)
      } else {
         setPicture(e.target.files)
         setPictureIsTooHeavy(false)
      }
   }

   // Récupérations des modifications dans les inputs
   const createNewProfil = () => {
      if (name && surname && picture) {
         const form = new formData()
         form.append('name', name)
         form.append('surname', surname)
         form.append('file', picture[0])
         form.append('id', user.userId)
         form.append('token', user.token)

         updateUser(form)
         setFormIsEmpty(false)
      } else {
         setFormIsEmpty(true)
      }
   }

   // Requête PUT pour enregistrer les modifications
   const updateUser = form => {
      axios({
         method: 'put',
         url: 'http://localhost:3001/updateUser',
         headers: {
            Authorization: user.token
         },
         data: form
      })
         .then(res => handleStorageData(res))
         .catch(err => setErrorFromDatabase(err.code))
   }

   // Enregistrement des modifications dans le storage
   const handleStorageData = res => {
      const userNewProfil = {
         id: res.data.id,
         name: res.data.name,
         surname: res.data.surname,
         picture: res.data.picture,
         token: user.token
      }
      sessionStorage.clear()
      sessionStorage.setItem('user', JSON.stringify(userNewProfil))
      navigate('/home')
   }

   // RENDER
   return (
      <>
         <main className={mobile ? 'mobile-update-user' : 'update-user'}>
            <h1>
               {userProfilIsEmpty
                  ? 'Dernière étape !'
                  : 'Vous souhaitez modifier votre profil ?'}
            </h1>
            <form
               className={
                  mobile ? 'mobile-update-user__form' : 'update-user__form'
               }
            >
               <p>
                  {userProfilIsEmpty
                     ? 'Prenez une minute pour compléter votre profil. Vous pourrez ensuite consulter les posts de vos collègues et poster votre premier message !'
                     : "N'oubliez pas que vos collègues doivent pouvoir vous retrouvez !"}
               </p>

               <div
                  className={
                     mobile
                        ? 'mobile-update-user__form__input'
                        : 'update-user__form__input'
                  }
               >
                  <div
                     className={
                        mobile
                           ? 'mobile-input-update-user'
                           : 'input-update-user'
                     }
                  >
                     <TextField
                        variant="outlined"
                        color="tertiary"
                        label="Nom"
                        type="text"
                        id={
                           mobile
                              ? 'mobile-update-user__name'
                              : 'update-user__name'
                        }
                        className={
                           mobile
                              ? 'mobile-update-user__name'
                              : 'update-user__name'
                        }
                        onChange={e => setName(e.target.value)}
                        required
                     />
                  </div>

                  <div
                     className={
                        mobile
                           ? 'mobile-input-update-user'
                           : 'input-update-user'
                     }
                  >
                     <TextField
                        variant="outlined"
                        color="tertiary"
                        label="Prénom"
                        type="text"
                        id={
                           mobile
                              ? 'mobile-update-user__surname'
                              : 'update-user__surname'
                        }
                        className={
                           mobile
                              ? 'mobile-update-user__surname'
                              : 'update-user__surname'
                        }
                        onChange={e => setSurname(e.target.value)}
                        required
                     />
                  </div>
               </div>
               <UploadPictureButton
                  pictureIsTooHeavy={pictureIsTooHeavy}
                  handlePicture={handlePicture}
               />
               {/* Le formulaire n'est pas complet */}
               {formIsEmpty ? <FormIsEmpty /> : ''}
               {/* L'image est trop lourde */}
               {pictureIsTooHeavy ? <ImageTooHeavy /> : ' '}

               <Button
                  variant="contained"
                  color="secondary"
                  className="btn"
                  onClick={e => createNewProfil(e)}
               >
                  Valider
               </Button>
            </form>
         </main>
      </>
   )
}

export default UpdateUser
