import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <img src="./images/icon-left-font-monochrome-white.svg" alt="Logo Groupomania" />

            <nav>
                <ul>
                    <NavLink to="/">
                        Accueil
                    </NavLink>
                    <NavLink to="/signup">
                        S'inscrire
                    </NavLink> 
                    <NavLink to="/createPost">
                        Nouveau Post
                    </NavLink> 
                </ul>
            </nav>
        </header>
    );
};

export default Header;