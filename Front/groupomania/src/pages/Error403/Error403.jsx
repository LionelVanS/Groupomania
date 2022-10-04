import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

const Error403 = () => {
   return (
      <>
         <main id="error403" className="error">
            <FontAwesomeIcon icon={faBan} size="6x" color="#4E5166" />
            <h2>Vous devez vous connecter avant de pouvoir utiliser ce site</h2>
            <NavLink to="/">Se connecter</NavLink>
         </main>
      </>
   )
}

export default Error403
