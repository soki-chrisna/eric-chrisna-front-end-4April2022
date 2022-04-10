
import React from 'react';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

function TextFieldBase({ ...props }) {
    return (
        <TextField {...props}/>
    );
};

TextFieldBase.propTypes = {
  props: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.string
  ]),
};

TextFieldBase.defaultProps = {
  props: {},
};

export default TextFieldBase;