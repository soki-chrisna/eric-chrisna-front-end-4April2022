import React from "react";

import FieldsWithToggle from '../../FieldsWithToggle';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid } from "@mui/material";

const PictureUpload = ({
  fieldsWithToggleProps = {},
  handleChange, fieldName,
  onPictureChangedHandler, onRemovePictureClickHandler,
  uploadedImageTitle, selectedPicture, pictureIsRemoved,
}) => {
  return (
    <FieldsWithToggle
      {...fieldsWithToggleProps}
    >
      <Grid container item>
        <Typography component="h3" variant="h6" gutterBottom>
          Profile Picture
        </Typography>
      </Grid>
      <CardMedia
        component="img"
        sx={{ width: 250, display: { xs: 'none', sm: 'block' } }}
        image={selectedPicture}
        alt="Profile Picture"
      />
      <Typography component="h3" variant="h6" gutterBottom>
        {uploadedImageTitle}
      </Typography>
      <Grid container item pb={4}>
        <Button
          variant="contained"
          component="label"
        >
          Upload File
          <input
            type="file"
            hidden
            name={fieldName}
            accept='image/png, image/jpg'
            onChange={(event) => {
              handleChange(event);
              onPictureChangedHandler(event);
            }}
            id="profile-picture"
          />
        </Button>
        <Button
          variant="contained"
          component="label"
          disabled={pictureIsRemoved}
          onClick={onRemovePictureClickHandler}
        >
          Remove
        </Button>
      </Grid>
    </FieldsWithToggle>
  )
}

export default PictureUpload;