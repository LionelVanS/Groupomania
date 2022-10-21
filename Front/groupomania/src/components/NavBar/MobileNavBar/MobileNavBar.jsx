import React from 'react'

// Composant
import MobileMenu from '../../MobileMenu/MobileMenu'

// MUI
import CloseIcon from '@mui/icons-material/Close'

const MobileNavBar = ({ setUserIsLog, handleClick, setIsOpen }) => {
   const disconnectUser = () => {
      sessionStorage.clear()
      setUserIsLog(false)
   }

   return (
      <>
         <div className="menu__background">
            <CloseIcon onClick={() => setIsOpen(false)} />
            <MobileMenu
               disconnectUser={disconnectUser}
               handleClick={handleClick}
            />
         </div>
      </>
   )
}

export default MobileNavBar
