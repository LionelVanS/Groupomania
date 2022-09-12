import React from 'react';
import axios from 'axios'

const Login = () => {
    function Log(){
        const email = document.getElementById("email-login-input")
        const password = document.getElementById("password-login-input")

        axios.post("http://localhost:3001/login", { 
            email: email.value,
            password: password.value
         })
            .then( res => {
                // const token = res.data.token

            })
    }

    return(
        <aside className="login">
            <form className="login__form">
                <label>
                    <input id="email-login-input" className="user-input" type="text" placeholder="Adresse mail" required />
                </label>

                <label>
                    <input id="password-login-input" className="user-input" type="text" placeholder="Mot De Passe" required />
                </label>

                <button type="button" onClick={() => Log()}>Valider</button>
            </form>
        </aside>
    )
}

export default Login; 