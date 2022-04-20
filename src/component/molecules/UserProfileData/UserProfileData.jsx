
import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

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