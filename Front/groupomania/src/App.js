import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import json2mq from 'json2mq'
import useMediaQuery from '@mui/material/useMediaQuery'

// MUI
import { ThemeProvider, createTheme } from '@mui/material/styles'

//Pages
import Home from './pages/Home/Home'
import Log from './pages/Log/Log'
import CreatePost from './pages/CreatePost/CreatePost'
import UpdateUser from './pages/UpdateUser/UpdateUser'
import Error403 from './pages/ErrorPages/Error403/Error403'
import Error404 from './pages/ErrorPages/Error404/Error404'
import Error504 from './pages/ErrorPages/Error504/Error504'

// Composant
import Header from './components/Header/Header'

const App = () => {
   // UseStates
   const [userIsLog, setUserIsLog] = useState() // Est ce qu'un utilisateur est connecté ?
   const [errorFromDatabase, setErrorFromDatabase] = useState() // Gestion d'erreur venant de la base de données

   // Récupération des informations de l'utilisateur connecté
   let user = sessionStorage.getItem('user')
   user = user && JSON.parse(user)

   // Attribution de l'état à userIsLog
   useEffect(() => {
      if (user !== null) {
         setUserIsLog(true)
      } else {
         setUserIsLog(false)
      }
   }, [])

   // Couleurs du thème
   const theme = createTheme({
      palette: {
         primary: {
            main: '#FD2D01'
         },
         secondary: {
            main: '#FFD7D7'
         },
         tertiary: {
            main: '#4E5166'
         }
      }
   })

   // Définitions des breakpoints
   // Mobile: 768px
   const mobile = useMediaQuery(
      json2mq({
         maxWidth: 768
      })
   )

   // Tablet: 769px à 992px
   const tablet = useMediaQuery(
      json2mq({
         minWidth: 769,
         maxWidth: 992
      })
   )

   // RENDER
   return (
      <BrowserRouter>
         <ThemeProvider theme={theme}>
            {errorFromDatabase ? (
               <Error504 />
            ) : (
               <>
                  <Header
                     userIsLog={userIsLog}
                     setUserIsLog={setUserIsLog}
                     user={user}
                     mobile={mobile}
                     tablet={tablet}
                  />
                  {/* PAGE DE LOG */}
                  <Routes>
                     <Route
                        exact
                        path="/"
                        element={
                           userIsLog ? (
                              <Home
                                 user={user}
                                 userIsLog={userIsLog}
                                 setUserIsLog={setUserIsLog}
                                 mobile={mobile}
                                 tablet={tablet}
                                 setErrorFromDatabase={setErrorFromDatabase}
                              />
                           ) : (
                              <Log
                                 userIsLog={userIsLog}
                                 setUserIsLog={setUserIsLog}
                                 user={user}
                                 mobile={mobile}
                                 tablet={tablet}
                              />
                           )
                        }
                     />
                     {/* PAGE D'ACCUEIL */}
                     <Route
                        exact
                        path="/home"
                        element={
                           userIsLog ? (
                              <Home
                                 user={user}
                                 userIsLog={userIsLog}
                                 setUserIsLog={setUserIsLog}
                                 mobile={mobile}
                                 tablet={tablet}
                                 setErrorFromDatabase={setErrorFromDatabase}
                              />
                           ) : (
                              <Error403 mobile={mobile} />
                           )
                        }
                     />
                     {/* PAGE DE CREATION DE POST */}
                     <Route
                        exact
                        path="/createPost"
                        element={
                           userIsLog ? (
                              <CreatePost
                                 user={user}
                                 mobile={mobile}
                                 setErrorFromDatabase={setErrorFromDatabase}
                              />
                           ) : (
                              <Error403 mobile={mobile} />
                           )
                        }
                     />
                     {/* PAGE DE MODIFICATION DU PROFIL UTILISATEUR */}
                     <Route
                        exact
                        path="/updateUser"
                        element={
                           userIsLog ? (
                              <UpdateUser
                                 user={user}
                                 mobile={mobile}
                                 tablet={tablet}
                                 setErrorFromDatabase={setErrorFromDatabase}
                              />
                           ) : (
                              <Error403 mobile={mobile} />
                           )
                        }
                     />
                     {/* PAGE D'ERREUR 404 */}
                     <Route
                        exact
                        path="/*"
                        element={
                           <Error404 mobile={mobile} userIsLog={userIsLog} />
                        }
                     />
                  </Routes>
               </>
            )}
         </ThemeProvider>
      </BrowserRouter>
   )
}

export default App
