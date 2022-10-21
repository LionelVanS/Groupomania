// Dépendances et méthodes
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

// MUI
import { TextField, Button } from '@mui/material'

// Composants
import TooManyRequest from '../ErrorMessage/TooManyRequest'
import UserIsNotIdentify from '../ErrorMessage/UserIsNotIdentify'

const Login = ({ setUserIsLog, mobile, openSignup }) => {
   // Usestates
   const [userIsNotIdentify, setUserIsNotIdentify] = useState() // Est ce que l'utilisateur a renseigné la bonne pair identifiant/mot de passe
   const [tooManyRequest, setTooManyRequest] = useState(false) // Est ce que l'utilisateur à tenter d'entrer 5 mauvais mot de passe ?
   const [email, setEmail] = useState(' ') // Contient l'email renseigné pour la connexion
   const [password, setPassword] = useState(' ') // Contient le mot de passe renseigné pour la connexion

   // UseNavigate
   const navigate = useNavigate()

   // Récupération des données de l'input et authentification
   const postUser = () => {
      axios
         .post('http://localhost:3001/login', {
            email: email,
            password: password
         })
         .then(res => handleProfilData(res))
         .catch(err => {
            if (err.response.status === 429) {
               setTooManyRequest(true)
               setUserIsNotIdentify(false)
            } else {
               setTooManyRequest(false)
               setUserIsNotIdentify(true)
            }
         })
   }

   // Récupération des informations du profil
   const handleProfilData = res => {
      setTooManyRequest(false)
      const user = res.data

      axios
         .get('http://localhost:3001/getOneUser', {
            headers: {
               Authorization: user.token
            }
         })
         .then(res => {
            const userToken = user.token
            saveToStorage(res, userToken)
            setUserIsNotIdentify(false)
         })
         .catch(() => setUserIsNotIdentify(true))
   }

   // Enregistrement des infos du profil sur le storage
   const saveToStorage = (res, userToken) => {
      const user = {
         id: res.data.user.id,
         token: userToken,
         name: res.data.user.name,
         surname: res.data.user.surname,
         picture: res.data.user.picture,
         admin: res.data.user.admin
      }
      sessionStorage.setItem('user', JSON.stringify(user))
      setUserIsLog(true)
      navigate('/home')
   }

   // RENDER
   return (
      <>
         <div className={mobile ? 'mobile-login' : 'login'}>
            <h1>
               Connectez vous <br /> et partager avec vos collègues
            </h1>
            <form className={mobile ? 'mobile-login__form' : 'login__form'}>
               <div
                  className={
                     mobile ? 'mobile-login__form__input' : 'login__form__input'
                  }
               >
                  <TextField
                     variant="outlined"
                     color="tertiary"
                     label="Email"
                     id="email-login-input"
                     className="user-input"
                     type="text"
                     onChange={e => setEmail(e.target.value)}
                     required
                  />
                  <TextField
                     variant="outlined"
                     color="tertiary"
                     label="Mot de Passe"
                     id="password-login-input"
                     className="user-input"
                     type="password"
                     onChange={e => setPassword(e.target.value)}
                     required
                  />
               </div>

               <Button
                  variant="contained"
                  color="secondary"
                  className="btn-valid"
                  type="button"
                  onClick={() => postUser()}
               >
                  Valider
               </Button>
               {tooManyRequest ? <TooManyRequest /> : ' '}
               {userIsNotIdentify ? <UserIsNotIdentify /> : ' '}
               <NavLink onClick={openSignup}>Pas encore membre ?</NavLink>
            </form>
         </div>
      </>
   )
}

export default Login
