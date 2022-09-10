import React from 'react';
import Header from '../../components/Header/Header';
import Login from '../../components/Login/Login';
import Post from '../../components/Post/Post';

const Home = () => {
    return (
        <>
            <Header />
            <main className="main-container">
                <Login />
                <Post />
            </main>
        </>
    );
};

export default Home;