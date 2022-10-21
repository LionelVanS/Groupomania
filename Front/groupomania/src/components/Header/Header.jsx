import React, { useEffect, useState } from 'react'

// Composants
import NavBar from '../NavBar/NavBar'
import UserData from '../UserData/UserData'
import MobileHeader from './MobileHeader/MobileHeader'

const Header = ({ userIsLog, setUserIsLog, user, mobile, tablet }) => {
   // UseStates
   const [profilIsComplet, setProfilIsComplet] = useState() // Est ce que le profil utilisateur est complet ?

   // Contrôle de la complétion du profil utilisateur
   useEffect(() => {
      if (user !== null) {
         if ('name' in user) {
            setProfilIsComplet(true)
         } else {
            setProfilIsComplet(false)
         }
      } else {
         return
      }
   }, [])

   // RENDER
   return (
      <header>
         {mobile || tablet ? (
            <MobileHeader
               user={user}
               userIsLog={userIsLog}
               setUserIsLog={setUserIsLog}
               profilIsComplet={profilIsComplet}
               setProfilIsComplet={setProfilIsComplet}
               mobile={mobile}
               tablet={tablet}
            />
         ) : (
            ' '
         )}

         {!mobile && !tablet ? (
            <div className="header__content">
               <div className="header__content__img">
                  <img src="./images/logo.png" alt="Logo Groupomania" />
               </div>
               {userIsLog && profilIsComplet ? <UserData user={user} /> : ''}
            </div>
         ) : (
            ' '
         )}

         {userIsLog && !mobile && !tablet ? (
            <NavBar setUserIsLog={setUserIsLog} />
         ) : (
            ' '
         )}
      </header>
   )
}

export default Header
