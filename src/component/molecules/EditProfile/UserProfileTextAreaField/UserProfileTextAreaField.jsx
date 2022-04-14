import React from "react";

import FieldsWithToggle from '../../FieldsWithToggle';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Grid from '@mui/material/Grid';

const UserProfileField = ({
  fieldsWithToggleProps = {},
  handleChange, fieldName,
  inputValue, fieldLabel
}) => {
  return (
    <FieldsWithToggle
      {...fieldsWithToggleProps}
    >
      <Grid container xs={12}>
        <Grid item xs={6}>
          <Typography component="h3" variant="h6">
            {fieldLabel}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Empty"
            style={{ width: 200 }}
            minRows={3}
            name={fieldName}
            value={inputValue}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </FieldsWithToggle>
  )
}

export default UserProfileField;