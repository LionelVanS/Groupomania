import React from 'react'
import { NavLink } from 'react-router-dom'

// Composant
import BackToHomeButton from '../../../components/Buttons/BackToHomeButton/BackToHomeButton'

const Error404 = ({ mobile, userIsLog }) => {
   return (
      <>
         <main
            id="error404"
            className={mobile ? 'mobile-error-page' : 'error-page'}
         >
            <p>OUPS...</p>
            <h2>La page recherchée n'existe pas</h2>
            <NavLink to={userIsLog ? '/home' : '/'}>
               <BackToHomeButton />
            </NavLink>
         </main>
      </>
   )
}

export default Error404
