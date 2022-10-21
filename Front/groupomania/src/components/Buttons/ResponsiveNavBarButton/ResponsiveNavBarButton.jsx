import React from 'react'
import { NavLink } from 'react-router-dom'

const ResponsiveNavBarButton = ({ handleClick }) => {
   return (
      <div className="menu__button">
         <NavLink
            aria-label="menu"
            variant="contained"
            color="secondary"
            id="menu-button"
            onClick={handleClick}
         >
            <span></span>
            <span></span>
            <span></span>
         </NavLink>
      </div>
   )
}

export default ResponsiveNavBarButton
