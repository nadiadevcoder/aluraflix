import React, { useState } from 'react';

const EditCardForm = ({ cardData, onSave, onCancel }) => {
  const [titulo, setTitulo] = useState(cardData.titulo);
  const [categoria, setCategoria] = useState(cardData.categoria);
  const [enlace, setEnlace] = useState(cardData.enlace);
  const [descripcion, setDescripcion] = useState(cardData.descripcion);

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedCard = {
      id: cardData.id,
      titulo,
      categoria,
      enlace,
      descripcion,
    };
    onSave(editedCard);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Título:
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Categoría:
        <input
          type="text"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Enlace de Video:
        <input
          type="text"
          value={enlace}
          onChange={(e) => setEnlace(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Descripción:
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit">Guardar</button>
      <button type="button" onClick={handleCancel}>Cancelar</button>
    </form>
  );
};

export default EditCardForm;
