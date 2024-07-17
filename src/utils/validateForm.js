export const validateForm = (formData) => {
  let errors = {};

  // Validación para el título
  if (!formData.title.trim()) {
    errors.title = 'El título es requerido';
  }

  // Validación para la categoría
  if (!formData.category.trim()) {
    errors.category = 'La categoría es requerida';
  }

  // Validación para la imagen
  if (!formData.photo.trim()) {
    errors.photo = 'La URL de la imagen es requerida';
  } else if (!isValidUrl(formData.photo)) {
    errors.photo = 'La URL de la imagen no es válida';
  }

  // Validación para el video
  if (!formData.link.trim()) {
    errors.link = 'La URL del video es requerida';
  } else if (!isValidUrl(formData.link)) {
    errors.link = 'La URL del video no es válida';
  }

  // Validación para la descripción
  if (!formData.description.trim()) {
    errors.description = 'La descripción es requerida';
  }

  return errors;
};

// Función para validar URLs
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};
