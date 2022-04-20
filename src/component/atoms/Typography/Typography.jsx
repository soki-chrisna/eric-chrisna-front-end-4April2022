
import React from 'react';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

function Typography({ children }) {
    return (
        <Typography>
          {children}
        </Typography>
    );
};

Typography.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.string
  ]),
  className: PropTypes.string,
};

Typography.defaultProps = {
  children: null,
  label: 'Base'
};

export default Typography;