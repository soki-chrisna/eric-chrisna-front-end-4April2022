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
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useParams } from 'react-router-dom';
import { getUserProfile, getStartDate, geEndDate } from '../ProfilePage/ProfilePageDomain';
import { prepareFieldsDisplayState, getSecondsToDateValue, updateUserProfile } from '../EditProfilePage/EditProfilePageDomain';

import { setUploadedImagePreview } from '../../../utils/imageUpload';

import FieldsWithToggle from '../../molecules/FieldsWithToggle';
import ProfilePicture from '../../molecules/EditProfile/ProfilePicture';
import UserName from '../../molecules/EditProfile/UserName';

const visibilityStyling = { display: "flex", alignItems: "center", justifyContent: "flex-end"};

const EditProfilePage = () => {
  const URLParams = useParams();
  const [userProfileData, setUserProfileData] = useState({});
  const [enteredStartDate, setEnteredStartDate] = useState(null);
  const [enteredEndDate, setEnteredEndDate] = useState(null);

  const [selectedCompanyLogo, setSelectedCompanyLogo] = useState(null);
  const [selectedCompanyLogoURL, setSelectedCompanyLogoURL] = useState("");
  const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);

  const [fieldsDisplayState, setFieldsDisplayState] = useState({
    shouldShowProfilePicture: false,
    shouldShowAge: false,
    shouldShowCompany: false,
    shouldShowEndDate: false,
    shouldShowJobDescription: false,
    shouldShowJobTitle: false,
    shouldShowName: false,
    shouldShowStartDate: false,
  });
  const [formattedEndDateToSeconds, setFormattedEndDateToSeconds] = useState(0);

  useEffect(() => {
    const setInitialData = async () => {
      const data = await getUserProfile(URLParams.userProfileID);
      setUserProfileData(data);

      setEnteredStartDate(getSecondsToDateValue(data.startDate?.seconds));
      setEnteredEndDate(getSecondsToDateValue(data.endDate?.seconds));

      prepareFieldsDisplayState(data, setFieldsDisplayState);
    };
    setInitialData();
  }, [URLParams.userProfileID]);

  const onStartDateChangeHandler = (enteredStartDateValue) => {
    setEnteredStartDate(enteredStartDateValue);
  };
  const onEndDateChangeHandler = (enteredEndDateValue) => {
    setEnteredEndDate(enteredEndDateValue);
  };

  const onProfilePictureChangedHandler = ({ target }) => {
    const selectedProfilePictureFile = target.files[0]
    const formData = new FormData();
    formData.append("image", selectedProfilePictureFile, selectedProfilePictureFile.name);

    setSelectedProfilePicture(selectedProfilePictureFile.name);

    setUploadedImagePreview({
      callback: setSelectedProfilePicture,
      imageFile: selectedProfilePictureFile,
    });
  };
  const onCompanyLogoChangeHandler = ({ target }) => {
    const companyLogoFile = target.files[0]
    const formData = new FormData();
    formData.append("image", companyLogoFile, companyLogoFile.name);
    
    setSelectedCompanyLogo(companyLogoFile.name);

    setUploadedImagePreview({
      callback: setSelectedCompanyLogoURL,
      imageFile: companyLogoFile,
    });
  };

  const onFormSubmitted = (updatedUserProfileValues) => {
    const preparedUpdatedUserProfileValues = {
      ...updatedUserProfileValues,
      startDate: enteredStartDate,
      endDate: enteredEndDate,
      ...fieldsDisplayState,
    };
    // updatedUserProfileValues.startDate= enteredStartDate;
    // updatedUserProfileValues.endDate= enteredEndDate;

    // updateUserProfile(URLParams.userProfileID, updatedUserProfileValues);
    updateUserProfile(URLParams.userProfileID, preparedUpdatedUserProfileValues);
  };

  const onSwitchChangeHandler = ({target}) => {
    const switchName = target.name;
    const switchValue = target.checked;
    setFieldsDisplayState((prevFieldsDisplayState) => {
      return {...prevFieldsDisplayState, [switchName]: switchValue}
    });
  }

  const userProfileDataIsNotEmpty = userProfileData.hasOwnProperty("name");

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
           setSubmitting(false);
           
           onFormSubmitted(values);
           alert(JSON.stringify(values, null, 2));
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
           {/* <input
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
           /> */}
           {errors.password && touched.password && errors.password}
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
           <Grid container xs={12}>
            <Grid item xs={12}>
              <ProfilePicture
                fieldsWithToggleProps={{
                  switchName: "shouldShowProfilePicture",
                  switchLabel: "Visible",
                  switchCheckedValue: fieldsDisplayState.shouldShowProfilePicture,
                  onSwitchChangeHandler: onSwitchChangeHandler,
                }}
                onProfilePictureChangedHandler={onProfilePictureChangedHandler}
                handleChange={handleChange}
                uploadedImageTitle={values.profilePicture}
                selectedProfilePicture={selectedProfilePicture}
              />
              <UserName
                fieldsWithToggleProps={{
                  switchName: "shouldShowName",
                  switchLabel: "Visible",
                  switchCheckedValue: fieldsDisplayState.shouldShowName,
                  onSwitchChangeHandler: onSwitchChangeHandler,
                }}
                fieldName="name"
                handleChange={handleChange}
                inputValue={values.name}
              />
              <Grid container xs={12}>
                <Grid item xs={8}>
                  <Typography component="h3" variant="h6">
                    Age
                  </Typography>
                </Grid>
                <Grid item sx={visibilityStyling} xs={2}>
                  <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked />} label="Visible" />
                  </FormGroup>
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
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Grid container xs={12}>
                <Grid item xs={8}>
                  <Typography component="h3" variant="h6">
                    Work Experience
                  </Typography>
                </Grid>
                <Grid item sx={visibilityStyling} xs={2}>
                  <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked />} label="Visible" />
                  </FormGroup>
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
              <Grid container xs={12}>
                <Grid item xs={8}>
                  <Typography component="h3" variant="h6">
                    Job Title
                  </Typography>
                </Grid>
                <Grid item sx={visibilityStyling} xs={2}>
                  <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked />} label="Visible" />
                  </FormGroup>
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
              <Grid container xs={12}>
                <Grid item xs={8}>
                  <Typography component="h3" variant="h6">
                    Company
                  </Typography>
                </Grid>
                <Grid item sx={visibilityStyling} xs={2}>
                  <FormGroup>
                    <FormControlLabel control={<Switch />} label="Visible" />
                  </FormGroup>
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
              <Grid container xs={12}>
                <Grid item xs={8}>
                  <CardMedia
                    component="img"
                    sx={{ width: 250, display: { xs: 'none', sm: 'block' } }}
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
                      accept='image/png, image/jpg'
                      onChange={(event) => {
                        handleChange(event);
                        onCompanyLogoChangeHandler(event);
                      }}
                      id="company-logo"
                    />
                  </Button>
                </Grid>
                <Grid item sx={visibilityStyling} xs={2}>
                  <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked />} label="Visible" />
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <Typography component="h3" variant="h6">
                    {selectedCompanyLogo ? selectedCompanyLogo.name : "Select Image"}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container xs={12}>
                <Grid item xs={8}>
                  <Typography component="h3" variant="h6">
                    Job Description
                  </Typography>
                </Grid>
                <Grid item sx={visibilityStyling} xs={2}>
                  <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked />} label="Visible" />
                  </FormGroup>
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
            </Grid>
          </Grid>
         </form>
       )}
     </Formik>
  );
};

export default EditProfilePage;
