import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../styles/Header.module.css';

const HeaderLink = ({ url, children }) => {
    return (
        <Link to={url} className={styles.headerLink}>
            {children}
        </Link>
    );
};

HeaderLink.propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default HeaderLink;
