import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

// // MUI
import { slide as Menu } from 'react-burger-menu'

const NavBar = ({ setUserIsLog }) => {
   // Déconnexion de l'utilisateur
   const disconnectUser = () => {
      sessionStorage.clear()
      setUserIsLog(false)
   }

   // Logique ouverture menu de navigation
   const [menuOpen, setMenuOpen] = useState(false)
   const handleOpenMenu = React.forwardRef(() => {
      setMenuOpen(!menuOpen)
   })

   return (
      <>
         <Menu isOpen={menuOpen} onClick={handleOpenMenu}>
            <NavLink className="menu-item" to="/home">
               Accueil
            </NavLink>
            <NavLink className="menu-item" to="/updateUser">
               Modifier son profil
            </NavLink>
            <NavLink className="menu-item" to="/createPost">
               Créer un nouveau post
            </NavLink>
            <NavLink
               to="/"
               className="menu-item"
               onClick={() => disconnectUser()}
            >
               Déconnexion
            </NavLink>
         </Menu>
      </>
   )
}

export default NavBar
