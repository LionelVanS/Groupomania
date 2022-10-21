import React from 'react'

// MUI
import { Button } from '@mui/material'

const ReloadButton = ({ handleReloadPage }) => {
   return (
      <Button variant="contained" color="secondary" onClick={handleReloadPage}>
         Recharger la page
      </Button>
   )
}

export default ReloadButton
