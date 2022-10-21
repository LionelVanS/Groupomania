import React, { useState } from 'react'

// Composant
import Login from '../../components/Login/Login'
import Signup from '../../components/Signup/Signup'

// MUI
import { Modal } from '@mui/material'

const Log = ({ setUserIsLog, mobile }) => {
   // UseStates
   const [isOpen, setIsOpen] = useState(false)

   // Contrôle de l'ouverture de la frame Signup
   const openSignup = () => {
      setIsOpen(!isOpen)
   }

   // RENDER
   return (
      <>
         <main className="log">
            <div className="log__container">
               <Login
                  setUserIsLog={setUserIsLog}
                  mobile={mobile}
                  openSignup={openSignup}
               />
               <Modal open={isOpen} onClose={openSignup}>
                  <>
                     <Signup setUserIsLog={setUserIsLog} mobile={mobile} />
                  </>
               </Modal>
            </div>
         </main>
      </>
   )
}

export default Log
