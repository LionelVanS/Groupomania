import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// MUI
import { TextField, Button } from '@mui/material'

const Signup = ({ setUserIsLog }) => {
   const navigate = useNavigate()

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   // Requete post pour enregistrer l'email
   async function handleInputValue() {
      try {
         await axios
            .post('http://localhost:3001/signup', {
               email: email,
               password: password,
            })
            .then((res) => saveToStorage(res))
            .catch((err) => {
               console.log(err)
            })
      } catch (err) {
         console.log(err)
      }
   }

   // Enregistrement des infos du profil sur le storage
   function saveToStorage(res) {
      const user = {
         userId: res.data.userId,
         token: res.data.token,
      }
      sessionStorage.setItem('user', JSON.stringify(user))
      setUserIsLog(true)
      navigate('/updateUser')
   }

   // RENDER
   return (
      <>
         <div className="signup">
            <form className="signup__form">
               <h2>Si vous n'avez pas de compte, vous pouvez en créer un</h2>
               <label>
                  <TextField
                     variant="filled"
                     label="Email"
                     id="email-signup-input"
                     className="user-input"
                     type="text"
                     onChange={(e) => setEmail(e.target.value)}
                     required
                  />
               </label>

               <label>
                  <TextField
                     variant="filled"
                     label="Mot de Passe"
                     id="password-signup-input"
                     className="user-input"
                     type="password"
                     onChange={(e) => setPassword(e.target.value)}
                     required
                  />
               </label>

               <Button type="button" onClick={() => handleInputValue()}>
                  Valider
               </Button>
            </form>
         </div>
      </>
   )
}

export default Signup
