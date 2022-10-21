import React from 'react'

// MUI
import { Button } from '@mui/material'
import TaskAltIcon from '@mui/icons-material/TaskAlt'

const ValidateButton = ({ putRequest }) => {
   return (
      <Button aria-label="valider">
         <TaskAltIcon className="btn valid" onClick={e => putRequest(e)}>
            Valider
         </TaskAltIcon>
      </Button>
   )
}

export default ValidateButton
