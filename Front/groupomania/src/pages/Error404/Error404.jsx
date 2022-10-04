import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons'

const Error404 = () => {
   return (
      <>
         <main id="error404" className="error">
            <FontAwesomeIcon icon={faBan} size="6x" color="#4E5166" />
            <h2>La page recherchée n'existe pas</h2>
            <NavLink to="/home">Retour à l'accueil</NavLink>
         </main>
      </>
   )
}

export default Error404
