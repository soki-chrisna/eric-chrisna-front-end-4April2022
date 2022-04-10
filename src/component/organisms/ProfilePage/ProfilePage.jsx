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
import { getUserProfile, getStartDate, geEndDate, currentUserProfileID } from './ProfilePageDomain';

const ProfilePage = () => {
  const [userProfileData, setUserProfileData] = useState({});

  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await getUserProfile();
      setUserProfileData(data);
    };
    fetchInitialData();
  }, []);

  return (
    <Grid container >
      <Grid item>
        <Grid container>
          <Grid item>
            <CardMedia
              component="img"
              sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
              image={null}
              alt="Profile Image"
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Typography component="h3" variant="h6">
              Name
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Typography  paragraph>
              {userProfileData.name}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Typography component="h3" variant="h6">
              Age
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Typography  paragraph>
              {userProfileData.age}
            </Typography>
          </Grid>
        </Grid>
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
              <Grid item>
                <Typography component="h3" variant="h6">
                  Start Date
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <Typography component="h3" variant="h6">
                  {getStartDate(userProfileData.startDate?.seconds)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
          <Grid container>
            <Grid item>
              <Typography component="h3" variant="h6">
                End Date
              </Typography>
            </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <Typography component="h3" variant="h6">
                  {geEndDate(userProfileData.startDate?.seconds)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Typography component="h3" variant="h6">
              Job Title
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Typography component="h3" variant="h6">
              {userProfileData.jobTitle}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Typography component="h3" variant="h6">
              Company
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Typography component="h3" variant="h6">
              {userProfileData.company}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <CardMedia
              component="img"
              sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
              image={null}
              alt="Profile Image"
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Typography component="h3" variant="h6">
              Job Description
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Typography component="h3" variant="h6">
              {userProfileData.jobDesc}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Link color="primary" href={`/edit-profile?userProfile=${currentUserProfileID}`} sx={{ mt: 3 }}>
              Edit Profile
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
