import React from "react";

import FieldsWithToggle from '../../FieldsWithToggle';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const ProfilePicture = ({
  fieldsWithToggleProps = {},
  handleChange, fieldName,
  inputValue,
}) => {
  return (
    <FieldsWithToggle
      {...fieldsWithToggleProps}
    >
      <Grid container xs={12}>
        <Grid item xs={6}>
          <Typography component="h3" variant="h6">
            Name
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <TextField
            required
            id={fieldName}
            name={fieldName}
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={inputValue}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </FieldsWithToggle>
  )
}

export default ProfilePicture;