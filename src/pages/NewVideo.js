import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import categoryData from '../data/CategoryData';
import { validateForm } from '../utils/ValidateForm';
import OptionList from '../components/OptionList';
import { useVideoContext } from '../context/VideoContext';
import FormButton from '../components/FormButton';
import Notification from '../components/Notification';
import ConfirmationDialog from '../components/ConfirmationDialog';
import styles from '../pages/NewVideo.module.css';

const NewVideo = () => {
    const { addVideo } = useVideoContext();
    const initialFormData = {
        title: '',
        category: '',
        photo: '',
        link: '',
        description: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({
        title: false,
        category: false,
        photo: false,
        link: false,
        description: false,
    });
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const descriptionRef = useRef(null);
    const navigateTo = useNavigate();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        validateFormAndSetErrors();
    }, [formData]);

    const validateFormAndSetErrors = async () => {
        const formErrors = await validateForm(formData);
        setErrors(formErrors);
        setIsButtonDisabled(Object.keys(formErrors).length > 0 || !isFormFilled(formData));
    };

    const isFormFilled = (formData) => {
        return (
            formData.title.trim() !== '' &&
            formData.category.trim() !== '' &&
            formData.photo.trim() !== '' &&
            formData.link.trim() !== '' &&
            formData.description.trim() !== ''
        );
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFieldBlur = (field) => {
        setTouchedFields({ ...touchedFields, [field]: true });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        await validateFormAndSetErrors();
        if (isFormFilled(formData) && Object.keys(errors).length === 0) {
            setShowConfirmation(true);
        }
    };

    const handleConfirmSave = () => {
        addVideo(formData);
        setNotificationMessage('El video se ha guardado exitosamente.');
        setShowConfirmation(false);
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
            navigateTo('/');
        }, 3000);
    };

    const handleCancelSave = () => {
        setShowConfirmation(false);
    };

    const handleCancel = () => {
        setFormData(initialFormData);
        setErrors({});
        setTouchedFields({
            title: false,
            category: false,
            photo: false,
            link: false,
            description: false,
        });
    };

    return (
        <div className={styles['new-video-page']}>
            <div className={styles['container__new-video']}>
                <header className={styles['new-video__header']}>
                    <h1 className={styles['new-video__title']}>NUEVO VIDEO</h1>
                    <p className={styles['new-video__description']}>
                        COMPLETE EL FORMULARIO PARA CREAR UNA NUEVA TARJETA DE VIDEO
                    </p>
                </header>
                <form className={styles['new-video__form']} onSubmit={handleSave}>
                    <div className={styles['form-section']}>
                        <div className={styles['form-section__left']}>
                            <h2 className={styles['new-video__form-title']}>Crear Tarjeta</h2>
                        </div>
                    </div>
                    <div className={styles['form-section']}>
                        <div className={styles['form-section__left']}>
                            <label className={`${styles['new-video__form-label']} ${errors.title && touchedFields.title ? styles['error-label'] : ''}`}>
                                Título:
                                <input
                                    className={`${styles['new-video__form-input']} ${errors.title && touchedFields.title ? styles['error'] : ''}`}
                                    type="text"
                                    placeholder='Ingresar título del video'
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    onBlur={() => handleFieldBlur('title')}
                                    maxLength="200"
                                    required
                                />
                                {errors.title && touchedFields.title && <span className={styles['error-message']}>{errors.title}</span>}
                            </label>
                        </div>
                        <div className={styles['form-section__right']}>
                            <OptionList
                                clase={`${styles['new-video__form-input']} ${styles['new-video__form-option']} ${errors.category && touchedFields.category ? styles['error-label'] : ''}`}
                                clase2={styles['new-video__dropdown-option']}
                                value={formData.category}
                                onChange={(e) => {
                                    handleChange({ target: { name: 'category', value: e.target.value } });
                                    handleFieldBlur('category');
                                }}
                                options={categoryData}
                            />
                            {errors.category && touchedFields.category && <span className={styles['error-message']}>{errors.category}</span>}
                        </div>
                    </div>
                    <div className={styles['form-section']}>
                        <div className={styles['form-section__left']}>
                            <label className={`${styles['new-video__form-label']} ${errors.photo && touchedFields.photo ? styles['error-label'] : ''}`}>
                                Imagen:
                                <input
                                    className={`${styles['new-video__form-input']} ${errors.photo && touchedFields.photo ? styles['error'] : ''}`}
                                    type="url"
                                    placeholder='Ingresar enlace de la imagen'
                                    name="photo"
                                    value={formData.photo}
                                    onChange={handleChange}
                                    onBlur={() => handleFieldBlur('photo')}
                                    maxLength="200"
                                    required
                                />
                                {errors.photo && touchedFields.photo && <span className={styles['error-message']}>{errors.photo}</span>}
                            </label>
                        </div>
                        <div className={styles['form-section__right']}>
                            <label className={`${styles['new-video__form-label']} ${errors.link && touchedFields.link ? styles['error-label'] : ''}`}>
                                Video:
                                <input
                                    className={`${styles['new-video__form-input']} ${errors.link && touchedFields.link ? styles['error'] : ''}`}
                                    type="url"
                                    placeholder='Ingresar enlace del video'
                                    name="link"
                                    value={formData.link}
                                    onChange={handleChange}
                                    onBlur={() => handleFieldBlur('link')}
                                    maxLength="200"
                                    required
                                />
                                {errors.link && touchedFields.link && <span className={styles['error-message']}>{errors.link}</span>}
                            </label>
                        </div>
                    </div>
                    <div className={styles['form-section']}>
                        <div className={styles['form-section__left']}>
                            <label className={`${styles['new-video__form-label']} ${errors.description && touchedFields.description ? styles['error-label'] : ''}`}>
                                Descripción:
                                <textarea
                                    className={`${styles['new-video__form-input']} ${styles['new-video__form-textarea']} ${errors.description && touchedFields.description ? styles['error'] : ''}`}
                                    name="description"
                                    placeholder='¿De qué se trata este vídeo?'
                                    value={formData.description}
                                    onChange={handleChange}
                                    onBlur={() => handleFieldBlur('description')}
                                    ref={descriptionRef}
                                    rows="4"
                                    maxLength="300"
                                    required
                                />
                                {errors.description && touchedFields.description && <span className={styles['error-message']}>{errors.description}</span>}
                            </label>
                        </div>
                    </div>
                    <div className={styles['new-video__form-buttons']}>
                        <FormButton
                            type="submit"
                            label="GUARDAR"
                            disabled={isButtonDisabled}
                            buttonType={styles['form-button--save']}
                        />
                        <FormButton
                            type="button"
                            label="LIMPIAR"
                            onClick={handleCancel}
                            buttonType={styles['form-button--cancel']}
                        />
                    </div>
                </form>
            </div>
            {showNotification && (
                <Notification
                    message={notificationMessage}
                    onClose={() => setShowNotification(false)}
                />
            )}
            {showConfirmation && (
                <ConfirmationDialog
                    message={`¿Estás seguro de que deseas guardar este nuevo video?`}
                    onConfirm={handleConfirmSave}
                    onCancel={handleCancelSave}
                />
            )}
        </div>
    );
};

export default NewVideo;
