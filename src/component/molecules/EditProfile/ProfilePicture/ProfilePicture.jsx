import React from "react";

import FieldsWithToggle from '../../../molecules/FieldsWithToggle';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid } from "@mui/material";

const ProfilePicture = ({
  fieldsWithToggleProps = {},
  handleChange,
  onProfilePictureChangedHandler, onRemoveProfilePictureClickHandler,
  uploadedImageTitle, selectedProfilePicture, pictureIsRemoved,
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
        image={selectedProfilePicture}
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
            name="profilePicture"
            accept='image/png, image/jpg'
            onChange={(event) => {
              handleChange(event);
              onProfilePictureChangedHandler(event);
            }}
            id="profile-picture"
          />
        </Button>
        <Button
          variant="contained"
          component="label"
          disabled={pictureIsRemoved}
          onClick={onRemoveProfilePictureClickHandler}
        >
          Remove
        </Button>
      </Grid>
    </FieldsWithToggle>
  )
}

export default ProfilePicture;