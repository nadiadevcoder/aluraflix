import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} AluraFlix. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
