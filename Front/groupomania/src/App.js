import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.js'
import Signup from './pages/Signup/Signup'
import Error404 from './pages/error404/Error404';
import CreatePost from './pages/createPost/createPost'
import Header from './components/Header/Header';
// import Footer from './components/Footer/Footer';


const App = () => {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/signup' element={<Signup />} />
      <Route exact path='/createPost' element={<CreatePost />} />
      <Route exact path='/*' element={<Error404 />} />
    </Routes>
    {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default App;