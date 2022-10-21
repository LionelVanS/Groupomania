import React from 'react'
import { NavLink } from 'react-router-dom'

// MUI
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'

const MobileMenu = ({ disconnectUser, handleClick }) => {
   return (
      <nav className="menu__link">
         <ul>
            <li>
               <NavLink className="menu__item" to="/home" onClick={handleClick}>
                  Accueil
               </NavLink>
            </li>
            <li>
               <NavLink
                  className="menu__item"
                  to="/updateUser"
                  onClick={handleClick}
               >
                  Modifier son profil
               </NavLink>
            </li>
            <li>
               <NavLink
                  className="menu__item"
                  to="/createPost"
                  onClick={handleClick}
               >
                  Créer un nouveau post
               </NavLink>
            </li>
            <li>
               <NavLink
                  to="/"
                  aria-label="se déconnecter"
                  className="menu__item"
                  onClick={() => disconnectUser()}
               >
                  <PowerSettingsNewIcon fontSize="large" />
               </NavLink>
            </li>
         </ul>
      </nav>
   )
}

export default MobileMenu
