import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <img src="./images/icon-left-font-monochrome-white.svg" alt="Logo Groupomania" />

            <ul>
            <NavLink to="/">
                Accueil
            </NavLink>
            <NavLink to="/signup">
                S'inscrire
            </NavLink> 
        </ul>
        </header>
    );
};

export default Header;