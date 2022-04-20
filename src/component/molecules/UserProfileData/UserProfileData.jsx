
import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

import Switch from '@mui/material/Switch';

import AppRoutes from '../../../routes';

const visibilityStyling = { display: "flex", alignItems: "center", justifyContent: "flex-end"};

const FieldsWithToggle = ({
  label, value, isVisible = true,
}) => {
  return (
    isVisible && <>
      <Grid container>
        <Grid item>
          <Typography component="h3" variant="h6">
            {label}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <Typography paragraph>
            {value}
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default FieldsWithToggle;