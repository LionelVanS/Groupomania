import React from 'react'

// MUI
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const DeleteButton = ({ handleDeletePost }) => {
   return (
      <Button aria-label="supprimer">
         <DeleteIcon className="btn delete" onClick={() => handleDeletePost()}>
            Supprimer
         </DeleteIcon>
      </Button>
   )
}

export default DeleteButton
