import React from "react";

import FieldsWithToggle from '../../FieldsWithToggle';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Grid from '@mui/material/Grid';

const UserProfileTextAreaField = ({
  fieldsWithToggleProps = {},
  handleChange, fieldName,
  inputValue, fieldLabel
}) => {
  return (
    <FieldsWithToggle
      {...fieldsWithToggleProps}
    >
      <Grid container>
        <Grid item>
          <Typography component="h3" variant="h6" gutterBottom>
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

export default UserProfileTextAreaField;