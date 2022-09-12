import React from 'react';
import axios from 'axios'

const Signup = () => {
    function Sign(){
        const email = document.getElementById("email-signup-input")
        const password = document.getElementById("password-signup-input")

        axios.post("http://localhost:3001/signup", { 
            email: email.value,
            password: password.value
         })
            .then( res => {
                                
            })
        
}
    
    return (
        <>
            <main className="signup">
                <h1 className="signup__title">Veuillez remplir le formulaire suivant pour vous inscrire</h1>
                <div className="signup__form">
                    <label>
                        <input id="email-signup-input" className="user-input" type="text" placeholder='Email' required />
                    </label>

                    <label>
                        <input id="password-signup-input" className="user-input" type="text" placeholder='Mot de Passe' required />
                    </label>

                    <button onClick={() => Sign()}>Valider</button>
                </div>
            </main>
        </>
    );
}

export default Signup;