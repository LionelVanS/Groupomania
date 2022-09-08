import React from 'react';
import { NavLink } from "react-router-dom"

const Navigation = () => {
    return (
        <ul>
            <NavLink to="/">
                Accueil
            </NavLink>
            <NavLink to="/signup">
                S'inscrire
            </NavLink> 
        </ul>
    );
};

export default Navigation;