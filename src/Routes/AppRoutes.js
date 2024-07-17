import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { VideoProvider } from '../contexts/VideoContext';
import { CategoriaProvider } from '../contexts/CategoriaContext';
import Home from '../pages/Home';
import NewVideo from '../pages/NewVideo';

const AppRoutes = () => {
  return (
    <VideoProvider>
      <CategoriaProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/newVideo" element={<NewVideo />} />
          </Routes>
        </BrowserRouter>
      </CategoriaProvider>
    </VideoProvider>
  );
};

export default AppRoutes;
