import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/FilaCategoria.module.css";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import YouTube from "react-youtube";

const FilaCategoria = ({
  categoria,
  colorPrimario,
  tarjetas,
  onEdit,
  onDelete,
}) => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [idEditar, setIdEditar] = useState(null);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [tituloEditado, setTituloEditado] = useState("");
  const [categoriaEditada, setCategoriaEditada] = useState("");
  const [imagenEditada, setImagenEditada] = useState("");
  const [videoEditado, setVideoEditado] = useState("");
  const [descripcionEditada, setDescripcionEditada] = useState("");

  const handleCloseModal = () => {
    setMostrarModalEdicion(false); // Cierra el modal de edición
  };

  const handleVideoClick = (id) => {
    setActiveVideo(id);
  };

  const handleEditar = (id) => {
    setIdEditar(id); // Guarda el ID de la tarjeta que se está editando
    setMostrarModalEdicion(true); // Muestra el modal de edición

    // Obtener y usar los datos de la tarjeta a editar si es necesario
    const tarjetaEditar = tarjetas.find((tarjeta) => tarjeta.id === id);
    if (tarjetaEditar) {
      setTituloEditado(tarjetaEditar.titulo);
      setCategoriaEditada(tarjetaEditar.categoria);
      setImagenEditada(tarjetaEditar.imagenPortada || ''); // Ajusta el nombre del campo según tu estructura de datos
      setVideoEditado(tarjetaEditar.enlace);
      setDescripcionEditada(tarjetaEditar.descripcion);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí deberías implementar la lógica para guardar los cambios del formulario
    // Puedes usar idEditar para identificar qué tarjeta está siendo editada
    // Y los estados (tituloEditado, categoriaEditada, imagenEditada, videoEditado, descripcionEditada)
    // para obtener los nuevos valores editados de la tarjeta
    if (idEditar !== null) {
      const tarjetaActualizada = {
        id: idEditar,
        titulo: tituloEditado,
        categoria: categoriaEditada,
        imagenPortada: imagenEditada, // Ajusta el nombre del campo según tu estructura de datos
        enlace: videoEditado,
        descripcion: descripcionEditada,
      };
      onEdit(tarjetaActualizada); // Llama a la función onEdit para guardar los cambios
      setMostrarModalEdicion(false); // Cierra el modal después de guardar
    }
  };

  const handleLimpiarFormulario = () => {
    // Limpia todos los campos del formulario de edición
    setTituloEditado("");
    setCategoriaEditada("");
    setImagenEditada("");
    setVideoEditado("");
    setDescripcionEditada("");
  };

  return (
    <div
      className={styles.filaCategoria}
      style={{ backgroundColor: colorPrimario }}
    >
      <h2
        className={`${styles.tituloCategoria} ${
          styles[`categoria_${categoria.toLowerCase().replace(/\s/g, "")}`]
        }`}
      >
        {categoria}
      </h2>
      <div className={styles.tarjetas}>
        {tarjetas.map((tarjeta) => (
          <div key={tarjeta.id} className={`${styles.tarjeta}`}>
            {tarjeta.enlace ? (
              <div className={styles.videoWrapper}>
                {activeVideo === tarjeta.id ? (
                  <YouTube
                    videoId={tarjeta.enlace}
                    className={styles.video}
                    opts={{
                      width: "100%",
                      height: "100%",
                      playerVars: {
                        autoplay: 1,
                      },
                    }}
                  />
                ) : (
                  <img
                    src={`https://img.youtube.com/vi/${tarjeta.enlace}/0.jpg`}
                    alt="Video Thumbnail"
                    className={styles.videoThumbnail}
                    onClick={() => handleVideoClick(tarjeta.id)}
                  />
                )}
              </div>
            ) : (
              <div className={styles.sinVideo}>No hay video disponible</div>
            )}
            <div className={styles.iconosTarjeta}>
              <button
                className={styles.botonEditar}
                onClick={() => handleEditar(tarjeta.id)}
              >
                <AiOutlineEdit className={styles.iconoEditar} />
              </button>
              <button
                className={styles.botonEliminar}
                onClick={() => onDelete(tarjeta.id)}
              >
                <AiOutlineDelete className={styles.iconoEliminar} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de edición */}
      {mostrarModalEdicion && (
        <div className={styles.modal}>
          <div className={styles.modalContenido}>
            <h2>Editar Tarjeta</h2>
            <form onSubmit={handleSubmit}>
              <label>Título:</label>
              <input
                type="text"
                value={tituloEditado}
                onChange={(e) => setTituloEditado(e.target.value)}
                placeholder="Título"
                required
              />
              <label>Categoría:</label>
              <input
                type="text"
                value={categoriaEditada}
                onChange={(e) => setCategoriaEditada(e.target.value)}
                placeholder="Categoría"
                required
              />
              <label>URL de Imagen:</label>
              <input
                type="text"
                value={imagenEditada}
                onChange={(e) => setImagenEditada(e.target.value)}
                placeholder="URL de Imagen"
              />
              <label>Enlace de Video:</label>
              <input
                type="text"
                value={videoEditado}
                onChange={(e) => setVideoEditado(e.target.value)}
                placeholder="Enlace de Video"
              />
              <label>Descripción:</label>
              <textarea
                value={descripcionEditada}
                onChange={(e) => setDescripcionEditada(e.target.value)}
                placeholder="Descripción"
              />
              {/* Botones de acción */}
              <div>
                <button type="submit">Guardar</button>
                <button type="button" onClick={handleLimpiarFormulario}>
                  Limpiar
                </button>
                <button type="button" onClick={handleCloseModal}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

FilaCategoria.propTypes = {
  categoria: PropTypes.string.isRequired,
  colorPrimario: PropTypes.string.isRequired,
  tarjetas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      titulo: PropTypes.string.isRequired,
      categoria: PropTypes.string.isRequired,
      enlace: PropTypes.string.isRequired,
      descripcion: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default FilaCategoria;
