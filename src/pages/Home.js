import React, { useState } from 'react';
import { useCategoria } from '../context/CategoriaContext';
import Banner from '../components/Banner';
import FilaCategoria from '../components/FilaCategoria';
import Header from '../components/Header';
import Modal from '../components/Modal'; 
import cardsData from '../data/cardsData';
import logo from '../images/Logo.png';
import categoriaLookup from '../data/categoriaLookup';

const Home = () => {
  const { selectedCategoria } = useCategoria();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);

  const handleEdit = (tarjetaActualizada) => {
    console.log('Tarjeta actualizada:', tarjetaActualizada);
    // Implementar lógica para editar la tarjeta
  };

  const handleDelete = (id) => {
    console.log(`Eliminar tarjeta con ID ${id}`);
    // Implementar lógica para eliminar la tarjeta
  };

  const handleOpenModal = (card) => {
    setCurrentCard(card);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Header logo={logo} />
      <Banner
        tarjetas={cardsData}
        categoriaLookup={categoriaLookup}
        selectedCategoria={selectedCategoria}
        handleVideoClick={() => {}}
      />
   
      {Object.keys(categoriaLookup).map((key) => (
        <FilaCategoria
          key={key}
          categoria={categoriaLookup[key].nombre}
          colorPrimario={categoriaLookup[key].color} 
          tarjetas={cardsData.filter(t => t.categoria === key)}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onOpenModal={handleOpenModal} 
        />
      ))}

      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSave={handleEdit} 
        card={currentCard}
      />
    </div>
  );
};

export default Home;
