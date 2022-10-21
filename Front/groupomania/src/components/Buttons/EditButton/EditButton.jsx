import React from 'react'

// MUI
import EditIcon from '@mui/icons-material/Edit'
import { Button } from '@mui/material'

const EditButton = ({ setIsEditing }) => {
   return (
      <>
         <Button aria-label="modifier">
            <EditIcon className="btn edit" onClick={() => setIsEditing(true)}>
               Modifier
            </EditIcon>
         </Button>
      </>
   )
}

export default EditButton
