import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NewVideo from './pages/NewVideo'; 
import Footer from './components/Footer';
import { CategoriaProvider } from './context/CategoriaContext';

function App() {
  return (
    <Router>
      <CategoriaProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nuevo-video" element={<NewVideo />} /> 
          </Routes>
          <Footer />
        </div>
      </CategoriaProvider>
    </Router>
  );
}

export default App;
