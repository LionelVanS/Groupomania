import React from 'react';
import Login from '../../components/Login/Login';
import Post from '../../components/Post/Post';

const Home = () => {
    return (
        <>
            <main className="main-container">
                <div className="all-posts">
                    <h1>Quels sont les nouveautés chez Groupomania ?</h1>
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </div>
                <Login />
            </main>
        </>
    );
};

export default Home;