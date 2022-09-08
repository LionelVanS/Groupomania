import React from 'react';
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons'

const Error404 = () => {
    return (
        <>
            <Header />
            <main id="error">
                <FontAwesomeIcon icon= { faBan } size="6x" color="#4E5166" />
                <h2>La page recherchée n'existe pas</h2>
            </main>
        </>
    );
};

export default Error404 ;