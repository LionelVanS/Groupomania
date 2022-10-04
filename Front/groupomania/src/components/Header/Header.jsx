import React from 'react'
import { NavLink } from 'react-router-dom'

// MUI
import { Button } from '@mui/material'

const Header = ({ userIsLog, setUserIsLog }) => {
   // Déconnexion de l'utilisateur
   const disconnectUser = () => {
      sessionStorage.clear()
      setUserIsLog(false)
   }

   // RENDER
   return (
      <header>
         <img src="./images/logo.png" alt="Logo Groupomania" />

         {userIsLog ? (
            <nav>
               <ul>
                  <NavLink to="/home">
                     <Button>Accueil</Button>
                  </NavLink>
                  <NavLink to="/createPost">
                     <Button>Nouveau Post</Button>
                  </NavLink>
                  <NavLink to="/updateuser">
                     <Button>Modifier votre Profil</Button>
                  </NavLink>
               </ul>
            </nav>
         ) : (
            ' '
         )}
         <div className="disconnect">
            <NavLink
               to="/"
               className={
                  userIsLog ? 'disconnect__btn' : 'disconnect__btn display-none'
               }
               onClick={() => disconnectUser()}
            >
               Déconnexion
            </NavLink>
         </div>
      </header>
   )
}

export default Header
