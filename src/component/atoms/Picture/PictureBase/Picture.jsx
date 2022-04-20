
import React from 'react';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import PropTypes from 'prop-types';

const Picture = ({
  picture, alt, isVisible,
}) => {
  return (
    isVisible && <Grid container>
      <Grid item>
        <CardMedia
          component="img"
          sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
          image={picture}
          alt={alt}
        />
      </Grid>
    </Grid>
  )
}

Picture.propTypes = {
  picture: PropTypes.string,
  alt: PropTypes.string,
  isVisible: PropTypes.bool,
};

Picture.defaultProps = {
  picture: "",
  alt: "",
  isVisible: true,
};

export default Picture;