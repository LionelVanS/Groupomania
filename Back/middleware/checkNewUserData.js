// Appel des dépendances
const passwordValidator = require('password-validator')
const emailValidator = require('validator')

// Validation du format de l'email
function checkEmailFormat(req){
    return emailValidator.isEmail(req.body.email)
}

// Vérification de la force du mot de passe
function checkPassword(req){
    const password = req.body.password
    const passwordSchema = new passwordValidator()

    passwordSchema
        .is().min(9)                                    // Il doit contenir au minimum 9 caractères
        .is().max(20)                                   // Il doit contenir au maximum 20 caractères
        .has().uppercase()                              // Il doit contenir des majuscules
        .has().lowercase()                              // Il doit contenir des minuscules
        .has().digits(3)                                // Il doit contenir au moins 3 chiffres
        .has().not().spaces()                           // Il ne doit pas contenir d'espace
        .is().not().oneOf(['Password123']);             // Ces mots de passes sont interdits

    const isPasswordIsValid = passwordSchema.validate(password)
    return isPasswordIsValid

}

module.exports = { checkEmailFormat, checkPassword }