import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// MUI
import { TextField, Button } from '@mui/material'

const Login = ({ setUserIsLog }) => {
   // UseNavigate pour faire la redirection à la connexion
   const navigate = useNavigate()

   // Usestates
   const [email, setEmail] = useState(' ')
   const [password, setPassword] = useState(' ')

   // Récupération des données de l'input et authentification
   async function handleInputValue(e) {
      e.preventDefault()

      try {
         await axios
            .post('http://localhost:3001/login', {
               email: email,
               password: password,
            })
            .then((res) => handleProfilData(res))
      } catch {
         alert('Connexion impossible')
      }
   }

   // Récupération des informations du profil
   function handleProfilData(res) {
      const user = res.data
      const config = {
         headers: {
            Authorization: user.token,
         },
      }

      try {
         axios
            .get('http://localhost:3001/getOneUser', config)
            .then((res) => {
               const userToken = user.token
               saveToStorage(res, userToken)
            })
            .catch((err) => console.log(err))
      } catch (err) {
         alert('ca marche pas')
      }
   }

   // Enregistrement des infos du profil sur le storage
   function saveToStorage(res, userToken) {
      const user = {
         id: res.data.user._id,
         token: userToken,
         name: res.data.user.name,
         surname: res.data.user.surname,
         picture: res.data.user.picture,
      }
      sessionStorage.setItem('user', JSON.stringify(user))
      setUserIsLog(true)
      navigate('/home')
   }

   // RENDER
   return (
      <>
         <div className="login">
            <form className="login__form">
               <h2>Connectez vous pour partager avec vos collègues !</h2>
               <TextField
                  variant="filled"
                  label="Email"
                  id="email-login-input"
                  className="user-input"
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  required
               />

               <TextField
                  variant="filled"
                  label="Mot de Passe"
                  id="password-login-input"
                  className="user-input"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
               />

               <Button onClick={(e) => handleInputValue(e)}>Valider</Button>
            </form>
         </div>
      </>
   )
}

export default Login
