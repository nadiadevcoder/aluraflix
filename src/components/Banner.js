
import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/Banner.module.css";
import imagenBanner from "../images/banner.png";

const Banner = ({ tarjetas, categoriaLookup, selectedCategoria, handleVideoClick }) => {
  const categoria = categoriaLookup[selectedCategoria];
  const tarjeta = tarjetas.find((t) => t.categoria === selectedCategoria);

  if (!categoria || !tarjeta) {
    return <div>Selecciona una categoría válida.</div>;
  }

  const estiloBanner = {
    backgroundImage: `url(${imagenBanner})`,
  };

  const estiloTitulo = {
    backgroundColor: categoria.colorPrimario,
  };

  return (
    <main id="banner" className={styles.contenedorBanner} style={estiloBanner}>
      <section className={styles.contenidoTexto}>
        <h1 className={styles.nombreCategoria} style={estiloTitulo}>
          {categoria.nombre}
        </h1>
        <h2 className={styles.tituloBanner}>Challenge React</h2>
        <p className={styles.descripcion}>
          Este challenge es una forma de aprendizaje. Es un mecanismo donde podrás
          comprometerte en la resolución de un problema para poder aplicar todos los
          conocimientos adquiridos en la formación React.
        </p>
      </section>

      <section className={styles.contenedorVideo}>
        <img
          src={`https://img.youtube.com/vi/${tarjeta.enlace}/0.jpg`}
          alt="Video Thumbnail"
          className={styles.videoThumbnail}
          onClick={() => handleVideoClick(tarjeta.id)}
        />
      </section>
    </main>
  );
};

Banner.propTypes = {
  tarjetas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      titulo: PropTypes.string.isRequired,
      categoria: PropTypes.string.isRequired,
      enlace: PropTypes.string.isRequired,
      descripcion: PropTypes.string.isRequired,
      imagenPortada: PropTypes.string,
    })
  ).isRequired,
  categoriaLookup: PropTypes.object.isRequired,
  selectedCategoria: PropTypes.string.isRequired,
  handleVideoClick: PropTypes.func.isRequired,
};

export default Banner;
