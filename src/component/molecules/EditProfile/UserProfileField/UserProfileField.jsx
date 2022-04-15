import React from "react";

import FieldsWithToggle from '../../FieldsWithToggle';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const UserProfileField = ({
  fieldsWithToggleProps = {},
  handleChange, fieldName,
  inputValue, fieldLabel, errorMessage, isRequired = false,
}) => {
  const isError = errorMessage && errorMessage !== "" ? true : false;

  return (
    <FieldsWithToggle
      {...fieldsWithToggleProps}
    >
      <Grid container>
        <Grid item xs={6}>
          <Typography component="h3" variant="h6">
            {fieldLabel}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <TextField
            required={isRequired}
            id={fieldName}
            name={fieldName}
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={inputValue}
            onChange={handleChange}
            error={isError}
            helperText={errorMessage}
          />
        </Grid>
      </Grid>
    </FieldsWithToggle>
  )
}

export default UserProfileField;