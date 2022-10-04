import React, { useState, useEffect } from 'react'
import axios from 'axios'
import formData from 'form-data'
import { useNavigate } from 'react-router-dom'

const UpdateUser = () => {
   const navigate = useNavigate()

   // Usestates
   const [name, setName] = useState(' ')
   const [surname, setSurname] = useState(' ')
   const [picture, setPicture] = useState()

   let userId = sessionStorage.getItem('user')
   userId = userId && JSON.parse(userId)

   function updateProfil(e) {
      e.preventDefault()

      const form = new formData()
      form.append('name', name)
      form.append('surname', surname)
      form.append('file', picture[0])

      try {
         axios({
            method: 'put',
            url: 'http://localhost:3001/updateUser',
            headers: {
               Authorization: userId.token,
            },
            data: form,
         })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
         navigate('/home')
      } catch {
         console.log('bla')
      }
   }

   // RENDER
   return (
      <>
         <main id="update-user">
            <h1>Il ne vous reste plus qu'à compléter votre profil !</h1>

            <form className="update-user__form">
               <label>
                  <input
                     type="text"
                     id="update-user__name"
                     className="update-user__name"
                     placeholder="Votre nom"
                     onChange={(e) => setName(e.target.value)}
                  />
               </label>

               <label>
                  <input
                     type="text"
                     id="update-user__surname"
                     className="update-user__surname"
                     placeholder="Votre prénom"
                     onChange={(e) => setSurname(e.target.value)}
                  />
               </label>

               <label>
                  <input
                     type="file"
                     id="update-user__profil-pic up-pic"
                     className="update-user__profil-pic up-pic"
                     onChange={(e) => setPicture(e.target.files)}
                  />
               </label>

               <button className="btn" onClick={(e) => updateProfil(e)}>
                  Valider
               </button>
            </form>
         </main>
      </>
   )
}

export default UpdateUser
