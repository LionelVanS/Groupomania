import React from 'react'

const StrengthPassword = () => {
   return (
      <>
         <p className="error">
            Votre mot de passe n'est pas assez fort. Il doit contenir:
         </p>
         <ul>
            <li>Entre 9 et 20 caractères</li>
            <li>Minimum 1 lettre majuscule</li>
            <li>Minimum 3 chiffres</li>
            <li>Les espaces et caractères spéciaux sont interdits</li>
         </ul>
      </>
   )
}

export default StrengthPassword
