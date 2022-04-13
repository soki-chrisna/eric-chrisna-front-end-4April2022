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
import Button from '@mui/material/Button';
import { Formik } from 'formik';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Link from '@mui/material/Link';
import { getUserProfile, getStartDate, geEndDate } from '../ProfilePage/ProfilePageDomain';
import { geFormattedStartDate, getSecondsToDateValue, updateUserProfile } from '../EditProfilePage/EditProfilePageDomain';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import { setUploadedImagePreview } from '../../../utils/imageUpload';

// import TextField from '../../atoms/TextField/TextFieldBase';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';

const EditProfilePage = () => {
  const URLParams = useParams();
  const [userProfileData, setUserProfileData] = useState({});
  const [enteredStartDate, setEnteredStartDate] = useState(null);
  const [enteredEndDate, setEnteredEndDate] = useState(null);

  const [selectedCompanylogo, setSelectedCompanyLogo] = useState(null);
  const [selectedCompanyLogoURL, setSelectedCompanyLogoURL] = useState(null);

  const [formattedStartDate, setFormattedStartDate] = useState(0);
  const [formattedEndDate, setFormatteEndtDate] = useState(0);

  useEffect(() => {
    const setInitialData = async () => {

      const data = await getUserProfile(URLParams.userProfileID);
      setUserProfileData(data);

      setEnteredStartDate(getSecondsToDateValue(data.startDate?.seconds));
      setEnteredEndDate(getSecondsToDateValue(data.endDate?.seconds));
    };
    setInitialData();
  }, [URLParams.userProfileID]);

  const onStartDateChangeHandler = (enteredStartDateValue) => {
    setFormattedStartDateToSeconds(enteredStartDateValue);
    setEnteredStartDate(enteredStartDateValue);
  };
  const onEndDateChangeHandler = (enteredEndDateValue) => {
    setFormattedStartDateToSeconds(enteredEndDateValue);
    setEnteredEndDate(enteredEndDateValue);
  };

  const onCompanyLogoChangeHandler = ({ target }) => {
    setSelectedCompanyLogo(target.files[0]);
    const reader = new FileReader();
    const url = reader.readAsDataURL(target.files[0]);
    setSelectedCompanyLogoURL(url);
  };

  return (
    userProfileDataIsNotEmpty && <Formik
       initialValues={{
         ...userProfileData, 
         startDate: enteredStartDate,
         endDate: enteredEndDate,
        }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);

           onFormSubmitted(values);
         }, 400);
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
         <form onSubmit={handleSubmit}>
           <input
             type="email"
             name="email"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
           />
           {errors.email && touched.email && errors.email}
           <input
             type="password"
             name="password"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.password}
           />
           {errors.password && touched.password && errors.password}
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
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
                  <TextField
                    required
                    id="name"
                    name="name"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={values.name}
                    onChange={handleChange}
                  />
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
                  <TextField
                    required
                    id="age"
                    name="age"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={userProfileData.age || ""}
                  />
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
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          value={enteredStartDate}
                          onChange={onStartDateChangeHandler}
                          renderInput={(params) => <TextField {...params} />}
                          name="startDate"
                        />
                      </LocalizationProvider>
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
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          value={enteredEndDate}
                          onChange={onEndDateChangeHandler}
                          renderInput={(params) => <TextField {...params} />}
                          name="endDate"
                        />
                      </LocalizationProvider>
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
                  <TextField
                    required
                    id="jobTitle"
                    name="jobTitle"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={values.jobTitle}
                    onChange={handleChange}
                  />
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
                  <TextField
                    required
                    id="company"
                    name="company"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={values.company}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <CardMedia
                    component="img"
                    sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                    image={selectedCompanyLogoURL}
                    alt="Company Logo"
                  />
                  <Button
                    variant="contained"
                    component="label"
                  >
                    Upload File
                    <input
                      type="file"
                      hidden
                      onChange={onCompanyLogoChangeHandler}
                    />
                  </Button>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <Typography component="h3" variant="h6">
                    {selectedCompanylogo ? selectedCompanylogo.name : "Select Image"}
                    {console.log(selectedCompanyLogoURL)}
                  </Typography>
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
                  <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="Empty"
                    style={{ width: 200 }}
                    minRows={3}
                    name="jobDesc"
                    value={values.jobDesc}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  {/* <Link color="primary" href={`/edit-profile/${currentUserProfileID}`} sx={{ mt: 3 }}>
                    Edit Profile
                  </Link> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
         </form>
       )}
     </Formik>
  );
};

export default EditProfilePage;
