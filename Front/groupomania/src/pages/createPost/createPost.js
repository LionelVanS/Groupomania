import React from 'react';

const CreatePost = () => {
    
    return (
        <>
        <main id="main-create-post">
            <h1>Créez un post</h1>
            <form className="add-post-form">
                <label>
                    <input type="text" className="add-post-form__title" placeholder="Titre" required />
                </label>

                <input type="file" id="input" className="up-pic" required/>

                <label>
                    <textarea type="text"  placeholder="Tapez votre message ici" required />
                </label>

                <button type="button" className="btn">Poster</button>
            </form>
        </main>
        </>
    );
};

export default CreatePost;