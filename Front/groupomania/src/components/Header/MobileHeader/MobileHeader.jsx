import React, { useState, useEffect } from 'react'

// MUI
import AppBar from '@mui/material/AppBar'

//Composants
import MobileNavBar from '../../NavBar/MobileNavBar/MobileNavBar'
import ResponsiveNavBarButton from '../../Buttons/ResponsiveNavBarButton/ResponsiveNavBarButton'
import UserData from '../../UserData/UserData'

const MobileHeader = ({
   user,
   userIsLog,
   setUserIsLog,
   profilIsComplet,
   setProfilIsComplet,
   mobile,
   tablet
}) => {
   // UseState
   const [isOpen, setIsOpen] = useState(false) // Est ce que le menu de navigation est ouvert ?

   // Gestion de l'ouverture du menu de navigation
   const handleClick = () => {
      setIsOpen(!isOpen)
   }

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
      <>
         <AppBar position="static">
            <div className="app-bar">
               {/* LOGO GROUPOMANIA */}
               <div className="app-bar__logo">
                  <img
                     src="./images/logo-white.png"
                     alt="Logo Groupomania"
                     className="app-bar__logo-mobile"
                  />
               </div>
               <div className="app-bar__menu">
                  {/* UTILISATEUR */}
                  {userIsLog && profilIsComplet ? (
                     <UserData user={user} mobile={mobile} tablet={tablet} />
                  ) : (
                     ''
                  )}
                  {/* MENU DE NAVIGATION */}
                  {userIsLog ? (
                     <div className="menu">
                        <ResponsiveNavBarButton handleClick={handleClick} />
                        {isOpen ? (
                           <>
                              <MobileNavBar
                                 setUserIsLog={setUserIsLog}
                                 handleClick={handleClick}
                                 setIsOpen={setIsOpen}
                              />
                           </>
                        ) : (
                           ''
                        )}
                     </div>
                  ) : (
                     ''
                  )}
               </div>
            </div>
         </AppBar>
      </>
   )
}
export default MobileHeader
