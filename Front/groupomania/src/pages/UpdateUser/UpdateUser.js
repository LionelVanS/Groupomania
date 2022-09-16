import React from 'react';
import axios from 'axios'

const updateUser = () => {

    function updateProfil(e){
        e.preventDefault()

        const name = document.getElementById("update-user__name")
        const surname = document.getElementById("update-user__surname")
        // const profilPic = document.getElementById("update-user__profil-pic")

        axios.post("http://localhost:3001/updateUser", { 
            name: name.value,
            surname: surname.value
        })
        .then( res => {
            console.log('res :>> ', res.data);
        }).catch(err => {
            console.log(err.code, err.message);
        })
    }

    // RENDER
    return (
        <>
            <main id="update-user">
                <h1>Il ne vous reste plus qu'à compléter votre profil !</h1>

                <form className="update-user__form">
                    <label>
                        <input type="text" id="update-user__name" className="update-user__name" placeholder="Votre nom"/>
                    </label>
                    
                    <label>
                        <input type="text" id="update-user__surname" className="update-user__surname" placeholder="Votre prénom"/>
                    </label>

                    <label>
                        <input type="file" id="update-user__profil-pic up-pic" className="update-user__profil-pic up-pic" />
                    </label>

                    <button className="btn" onClick={(e) => updateProfil(e)}>Valider</button>
                </form>
            </main>
        </>
    );
};

export default updateUser;