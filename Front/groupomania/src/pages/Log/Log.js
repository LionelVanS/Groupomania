import React from 'react';
import Login from '../../components/Login/Login';
import Signup from '../../components/Signup/Signup';


const Log = () => {

    // RENDER
    return (
        <>
            <h1 className="signup__title">Veuillez vous identifier avant de poursuivre !</h1>
            <main className="log">
                <Login />
                <Signup />
            </main>
        </>
    );
}

export default Log;