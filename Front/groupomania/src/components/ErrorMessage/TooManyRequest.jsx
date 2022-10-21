import React from 'react'

const TooManyRequest = () => {
   return (
      <p className="error">
         Trop de tentatives echouées.
         <br />
         Veuillez attendre 5 minutes avant de retenter de vous connecter.
      </p>
   )
}

export default TooManyRequest
