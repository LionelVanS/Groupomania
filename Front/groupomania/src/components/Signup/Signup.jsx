// Dépendances et méthodes
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// Composant
import StrengthPassword from '../ErrorMessage/StrengthPassword'
import EmailFormatIsNotOk from '../ErrorMessage/EmailFormatIsNotOk'

// MUI
import { TextField, Button } from '@mui/material'

const Signup = ({ setUserIsLog, mobile }) => {
   // UseNavigate
   const navigate = useNavigate()

   // UseStates
   const [strengthPassword, setStrengthPassword] = useState(true) // Vérification de la longueur du mot de passe
   const [formatEmailIsOk, setFormatEmailIsOk] = useState(true) // Vérification du format de l'adress mail
   const [email, setEmail] = useState(' ') // Contient l'adresse mail renseignée
   const [password, setPassword] = useState(' ') // Contient le mot de passe renseignée

   // Vérification du format de l'adresse mail
   const checkEmailFormat = () => {
      const regexForEmail = /^[0-9a-zA-Z._-]+@{1}[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,5}$/

      if (email.match(regexForEmail)) {
         checkPasswordFormat()
         setFormatEmailIsOk(true)
      } else {
         setFormatEmailIsOk(false)
      }
   }

   // Vériification du format de mot de passe
   const checkPasswordFormat = () => {
      if (password.length < 9) {
         setStrengthPassword(false)
         return
      } else {
         postUser()
         setStrengthPassword(true)
      }
   }

   // Requete post pour enregistrer l'email
   const postUser = async () => {
      try {
         const res = await axios.post('http://localhost:3001/signup', {
            email: email,
            password: password
         })
         saveToStorage(res)
      } catch {
         setStrengthPassword(false)
      }
   }

   // Enregistrement des infos du profil sur le storage
   const saveToStorage = res => {
      const user = {
         userId: res.data.userId,
         token: res.data.token
      }
      sessionStorage.setItem('user', JSON.stringify(user))
      setUserIsLog(true)
      navigate('/updateUser')
   }

   // RENDER
   return (
      <>
         <div className={mobile ? 'mobile-signup' : 'signup'}>
            <h1>Si vous n'avez pas de compte, créez en un ici !</h1>
            <form className={mobile ? 'mobile-signup__form' : 'signup__form'}>
               <div
                  className={
                     mobile
                        ? 'mobile-signup__form__input'
                        : 'signup__form__input'
                  }
               >
                  <TextField
                     variant="outlined"
                     color="tertiary"
                     label="Email"
                     id="email-signup-input"
                     className="user-input"
                     type="text"
                     onChange={e => setEmail(e.target.value)}
                     required
                  />
                  <TextField
                     variant="outlined"
                     color="tertiary"
                     label="Mot de Passe"
                     id="password-signup-input"
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
                  onClick={() => checkEmailFormat()}
               >
                  Valider
               </Button>
               {formatEmailIsOk ? '' : <EmailFormatIsNotOk />}
               {strengthPassword ? (
                  ' '
               ) : (
                  <div className="error-password">
                     <StrengthPassword />
                  </div>
               )}
            </form>
         </div>
      </>
   )
}

export default Signup
