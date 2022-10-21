import React from 'react'

// MUI
import { Button } from '@mui/material'

const UploadPictureButton = ({ pictureIsTooHeavy, handlePicture }) => {
   return (
      <Button
         aria-label="charger une photo"
         className="upload-btn"
         variant={pictureIsTooHeavy ? 'contained' : 'outlined'}
         color={pictureIsTooHeavy ? 'primary' : 'tertiary'}
         component="label"
      >
         {pictureIsTooHeavy
            ? 'CHOISISSEZ UNE AUTRE IMAGE'
            : 'TELECHARGEZ VOTRE IMAGE'}
         <input
            hidden
            type="file"
            name="file"
            accept=".jpg, .jpeg, .png"
            id="file"
            onChange={e => handlePicture(e)}
            required
         />
      </Button>
   )
}

export default UploadPictureButton
