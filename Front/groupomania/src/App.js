import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//Pages
import Home from './pages/Home/Home'
import Log from './pages/Log/Log'
import CreatePost from './pages/CreatePost/CreatePost'
import UpdateUser from './pages/UpdateUser/UpdateUser'
import Error403 from './pages/Error403/Error403'
import Error404 from './pages/Error404/Error404'

// Composant
import Header from './components/Header/Header'

const App = () => {
   // UseEffect pour savoir si un utilisateur est connecté
   const [userIsLog, setUserIsLog] = useState()
   console.log(userIsLog)

   // RENDER
   return (
      <BrowserRouter>
         <Header userIsLog={userIsLog} setUserIsLog={setUserIsLog} />
         <Routes>
            <Route
               exact
               path="/"
               element={
                  <Log userIsLog={userIsLog} setUserIsLog={setUserIsLog} />
               }
            />
            <Route
               exact
               path="/home"
               element={userIsLog ? <Home /> : <Error403 />}
            />
            <Route
               exact
               path="/createPost"
               element={userIsLog ? <CreatePost /> : <Error403 />}
            />
            <Route
               exact
               path="/updateUser"
               element={userIsLog ? <UpdateUser /> : <Error403 />}
            />
            <Route exact path="/*" element={<Error404 />} />
         </Routes>
      </BrowserRouter>
   )
}

export default App
