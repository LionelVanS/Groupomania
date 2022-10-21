import React from 'react'
import { NavLink } from 'react-router-dom'

// Composant
import GoToLogPageButton from '../../../components/Buttons/GoToLogPageButton/GoToLogPageButton'

const Error403 = ({ mobile }) => {
   return (
      <>
         <main
            id="error403"
            className={mobile ? 'mobile-error-page' : 'error-page'}
         >
            <h2>Vous devez vous connecter avant de pouvoir utiliser ce site</h2>
            <NavLink to="/">
               <GoToLogPageButton />
            </NavLink>
         </main>
      </>
   )
}

export default Error403
