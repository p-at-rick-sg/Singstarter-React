import './App.css';

import {useState, Fragment} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';

///Component Imports
import LandingPage from './/pages/LandingPage';
import NotFoundPage from '../pages/NotFoundPage';
//Context Imports

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Navigate to="home" />} />
        <Route path="home" element={<LandingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Fragment>
  );
}

export default App;
