import React from 'react'

// MUI
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault'
import { Button } from '@mui/material'

const CancelButton = ({ cancelUpdate }) => {
   return (
      <Button aria-label="annuler">
         <DisabledByDefaultIcon className="btn cancel" onClick={cancelUpdate} />
      </Button>
   )
}

export default CancelButton
