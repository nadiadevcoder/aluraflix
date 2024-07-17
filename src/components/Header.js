import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css';

const Header = ({ logo }) => {
    return (
        <header className={styles.cabecera}>
            <Link to="/">
                <section className={styles.contenedorLogo}>
                    <img src={logo} alt="Logo Alura" />
                </section>
            </Link>
            <nav className={styles.navegacion}>
                <div className={styles.enlacesNav}>
                    <Link to="/" className={styles.headerLink}>INICIO</Link>
                    <Link to="/newVideo" className={styles.headerLink}>NUEVO VIDEO</Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
