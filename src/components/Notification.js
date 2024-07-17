import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Notification.module.css'; 

const Notification = ({ message, onClose }) => {
  return (
    <div className={styles.notification}>
      <p>{message}</p>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Notification;
