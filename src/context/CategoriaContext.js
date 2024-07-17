import React, { createContext, useContext, useState } from 'react';

const CategoriaContext = createContext();

export const useCategoria = () => {
  return useContext(CategoriaContext);
};

export const CategoriaProvider = ({ children }) => {
  const [selectedCategoria, setSelectedCategoria] = useState('front end');

  const handleCategoriaChange = (categoria) => {
    setSelectedCategoria(categoria);
  };

  return (
    <CategoriaContext.Provider value={{ selectedCategoria, handleCategoriaChange }}>
      {children}
    </CategoriaContext.Provider>
  );
};
