import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import styles from '../styles/Modal.module.css'; 
import { validateForm } from '../utils/ValidateForm';
import FormButton from './FormButton';
import ConfirmationDialog from './ConfirmationDialog';

const Modal = ({ card, isOpen, onClose, onSave }) => {
  const initialFormData = useMemo(() => ({
    title: '',
    category: '',
    photo: '',
    link: '',
    description: '',
  }), []);

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (isOpen && card) {
      setFormData({ ...card });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  }, [card, isOpen, initialFormData]);

  useEffect(() => {
    const validate = async () => {
      const formErrors = await validateForm(formData);
      setErrors(formErrors);
      setIsButtonDisabled(Object.keys(formErrors).length > 0);
    };
    validate();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formErrors = await validateForm(formData);
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmSave = () => {
    onSave(formData);
    setShowConfirmation(false);
  };

  const handleCancelSave = () => {
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setErrors({});
    setIsButtonDisabled(true);
  };

  // Agregar clase 'active' al overlay y contenido del modal cuando isOpen es true
  const modalClasses = `${styles['modal-overlay']} ${isOpen ? styles.active : ''}`;
  const contentClasses = `${styles['modal-content']} ${isOpen ? styles.active : ''}`;

  if (!isOpen) return null;

  return (
    <div className={modalClasses}>
      <div className={contentClasses}>
        <IoMdCloseCircleOutline className={styles['close-icon']} onClick={onClose} />
        <h1>EDITAR TARJETA:</h1>
        <form className={styles['modal-form']} onSubmit={handleSave} autoComplete="off">
          <label>
            Título:
            <input
              className={`${styles['modal-form-input']} ${errors.title ? styles['error'] : ''}`}
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              maxLength="200"
              required
              autoComplete="off"
            />
            {errors.title && <span className={styles['error-message']}>{errors.title}</span>}
          </label>
          {/* Resto de tu formulario */}
          <div className={styles['new-video__form-buttons']}>
            <FormButton
              type="submit"
              label="Guardar"
              disabled={isButtonDisabled}
              buttonType={styles['form-button--save']}
            />
            <FormButton
              type="button"
              label="Limpiar"
              onClick={handleCancel}
              buttonType={styles['form-button--cancel']}
            />
          </div>
        </form>
      </div>
      {showConfirmation && (
        <ConfirmationDialog
          message="¿Estás seguro de que deseas guardar los cambios?"
          onConfirm={handleConfirmSave}
          onCancel={handleCancelSave}
        />
      )}
    </div>
  );
};

Modal.propTypes = {
  card: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Modal;
