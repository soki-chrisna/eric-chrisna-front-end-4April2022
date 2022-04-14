import React from "react";

import FieldsWithToggle from '../../../molecules/FieldsWithToggle';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ProfilePicture = ({
  fieldsWithToggleProps = {},
  handleChange, onProfilePictureChangedHandler,
  uploadedImageTitle, selectedProfilePicture
}) => {
  return (
    <FieldsWithToggle
      {...fieldsWithToggleProps}
    >
      <CardMedia
        component="img"
        sx={{ width: 250, display: { xs: 'none', sm: 'block' } }}
        image={selectedProfilePicture}
        alt="Profile Picture"
      />
      <Typography component="h3" variant="h6">
        {uploadedImageTitle}
      </Typography>
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
    </FieldsWithToggle>
  )
}

export default ProfilePicture;