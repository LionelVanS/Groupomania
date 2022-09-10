import React from 'react';

const Login = () => (
    <aside className="login">
        <div className="login__form">
            <label htmlFor="user-email">Adresse mail:</label>
            <input id="user-email" classname="user-input" type="text" required />
            <label htmlFor="user-password">Mot de Passe:</label>
            <input id="user-password" classname="user-input" type="text" required />
            <button>Valider</button>
        </div>
    </aside>
)

export default Login; 