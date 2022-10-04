import React, { useState } from 'react'
import axios from 'axios'
import formData from 'form-data'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
   // Usestates
   const [text, setText] = useState('')
   const [picture, setPicture] = useState()

   // UseNavigate
   const navigate = useNavigate()

   // Récupération des infos du post
   function handleData(e) {
      e.preventDefault()

      // Récupération des données du profil utilisateur
      let user = sessionStorage.getItem('user')
      user = user && JSON.parse(user)

      // Création du post
      const form = new formData()
      form.append('userName', user.name)
      form.append('userSurname', user.surname)
      form.append('userPicture', user.picture)
      form.append('text', text)
      form.append('file', picture[0])
      form.append('date', Date.now())
      if (user.name) {
         requestToAPI(user, form)
      } else {
         console.log('bla')
      }
   }

   // Enregistrement du post dans la BDD
   async function requestToAPI(user, form) {
      try {
         await axios({
            method: 'post',
            url: 'http://localhost:3001/createPost',
            headers: {
               Authorization: user.token,
            },
            data: form,
         })
         navigate('/home')
      } catch (err) {
         console.log(err)
      }
   }

   // RENDER
   return (
      <>
         <main id="main-create-post">
            <h1>Créez un post</h1>
            <form id="form" className="add-post-form" method="POST">
               <label>
                  <textarea
                     type="text"
                     className="add-post-form__text"
                     rows="10"
                     cols="100"
                     placeholder="Tapez votre message ici"
                     value={text}
                     onChange={(e) => setText(e.target.value)}
                     required
                  />
               </label>
               <label>
                  <input
                     type="file"
                     name="file"
                     accept=".jpg, .jpeg, .png"
                     id="file"
                     className="add-post-form__picture"
                     onChange={(e) => setPicture(e.target.files)}
                     required
                  />
               </label>
               <button
                  type="submit"
                  className="btn"
                  onClick={(e) => handleData(e)}
               >
                  Poster
               </button>
            </form>
         </main>
      </>
   )
}

export default CreatePost
