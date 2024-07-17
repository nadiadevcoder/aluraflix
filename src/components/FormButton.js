// FormButton.js

import React from 'react';
import PropTypes from 'prop-types';

const FormButton = ({ type, label, onClick, disabled, buttonType }) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`form-button ${buttonType}`}>
      {label}
    </button>
  );
};

FormButton.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']).isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  buttonType: PropTypes.string,
};

export default FormButton;
