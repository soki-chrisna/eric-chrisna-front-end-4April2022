import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { getUserProfile, getStartDate, geEndDate } from './ProfilePageDomain';

import UserProfileData from '../../molecules/UserProfileData'

export const currentUserProfileID = "pg9wefMNwiB1S9u8IGfT";

const ProfilePage = () => {
  const [userProfileData, setUserProfileData] = useState({});

  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await getUserProfile(currentUserProfileID);
      setUserProfileData(data);
    };
    fetchInitialData();
  }, []);

  return (
    <Grid container >
      <Grid item xs={12}>
        <Grid container>
          <Grid item>
            <CardMedia
              component="img"
              sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
              image={userProfileData.profilePicture}
              alt="Profile Image"
            />
          </Grid>
        </Grid>
        <UserProfileData 
          label="Name"
          value={userProfileData.name}
          isVisible={userProfileData.shouldShowName}
        />
        <UserProfileData 
          label="Age"
          value={userProfileData.age}
        />

        <Grid container>
          <Grid item>
            <Typography component="h3" variant="h6">
              Work Experience
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Grid container>
              <Grid item  mr={5}>
                <UserProfileData 
                  label="Start Date"
                  value={getStartDate(userProfileData.startDate?.seconds)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
          <Grid container>
            <Grid item>
              <UserProfileData 
                label="End Date"
                value={geEndDate(userProfileData.startDate?.seconds)}
              />
            </Grid>
            </Grid>
          </Grid>
        </Grid>
        <UserProfileData 
          label="Job Title"
          value={userProfileData.jobTitle}
        />
        <UserProfileData 
          label="Company"
          value={userProfileData.company}
        />
        <Grid container>
          <Grid item mb={2}>
            <CardMedia
              component="img"
              sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
              image={userProfileData.companyLogo}
              alt="Profile Image"
            />
          </Grid>
        </Grid>
        <UserProfileData 
          label="Job Description"
          value={userProfileData.jobDesc}
        />
        <Grid container>
          <Grid item display="flex" xs={12} justifyContent="center">
            <Link color="primary" href={`/edit-profile/${currentUserProfileID}`} sx={{ mt: 3 }}>
              Edit Profile
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
