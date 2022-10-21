import React from 'react'

// Composant
import PostList from '../../components/PostList/PostList'

const Home = ({ user, mobile, tablet, setErrorFromDatabase }) => {
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
