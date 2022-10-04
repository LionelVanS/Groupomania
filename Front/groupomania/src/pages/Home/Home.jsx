import React from 'react'
import PostList from '../../components/PostList/PostList'

const Home = () => {
   return (
      <>
         <main className="main-container">
            <div className="all-posts">
               <h1>Quels sont les nouveautés chez Groupomania ?</h1>
               <PostList />
            </div>
         </main>
      </>
   )
}

export default Home
