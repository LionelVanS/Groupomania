import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js'
import Signup from './pages/Signup.js'
import Error404 from './pages/Error404.js';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = '/signup' element = {<Signup />} />
        <Route path = '/*' element = {<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;