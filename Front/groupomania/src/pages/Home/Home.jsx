import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Composant
import PostList from '../../components/PostList/PostList'

const Home = ({
   user,
   mobile,
   tablet,
   setErrorFromDatabase,
   userProfilIsEmpty
}) => {
   // UseNavigate
   const navigate = useNavigate()

   // Redirection vers la page de modification si le profil n'est pas complet
   useEffect(() => {
      if (userProfilIsEmpty) {
         navigate('/updateUser')
      }
   }, [])

   // RENDER
   return (
      <>
         <main
            className={
               mobile || tablet ? 'main-mobile-container' : 'main-container'
            }
         >
            <div className="all-posts">
               <div className="main-containeur__body">
                  <PostList
                     user={user}
                     mobile={mobile}
                     tablet={tablet}
                     setErrorFromDatabase={setErrorFromDatabase}
                  />
               </div>
            </div>
         </main>
      </>
   )
}

export default Home
