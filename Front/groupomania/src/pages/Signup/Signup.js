import React from 'react';

const Signup = () => {
    return (
        <>
            <main classname="signup">
                <h1 className="signup__title">Veuillez remplir le formulaire suivant pour s'inscrire</h1>
                <div className="signup__form">
                    <label htmlFor="user-email">Adresse mail:</label>
                    <input id="user-email" classname="user-input" type="text" required />
                    <label htmlFor="user-password">Mot de Passe:</label>
                    <input id="user-password" classname="user-input" type="text" required />
                    <button>Valider</button>
                </div>
            </main>
        </>
    );
}

export default Signup;