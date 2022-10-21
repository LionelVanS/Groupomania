import React from 'react'

// Composant
import ReloadButton from '../../../components/Buttons/ReloadButton/ReloadButton'

const Error504 = ({ mobile }) => {
   // Contrôle du bouton recharger la page
   const handleReloadPage = () => {
      window.location.reload()
   }

   return (
      <>
         <main
            id="error504"
            className={mobile ? 'mobile-error-page' : 'error-page'}
         >
            <p>OUPS...</p>
            <h2>Il y a un souci avec la base de données</h2>
            <ReloadButton handleReloadPage={handleReloadPage} />
         </main>
      </>
   )
}

export default Error504
