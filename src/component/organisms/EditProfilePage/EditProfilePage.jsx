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
import FormHelperText from '@mui/material/FormHelperText';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useParams, useNavigate } from 'react-router-dom';
import { getUserProfile, getStartDate, geEndDate } from '../ProfilePage/ProfilePageDomain';
import {
  prepareSwitchesToggleState, getSecondsToDateValue, updateUserProfile,
  validateAge, validateWorkExperienceDate, onDiscardClickedHandler,
  handleConnection,
} from '../EditProfilePage/EditProfilePageDomain';

import { setUploadedImagePreview } from '../../../utils/imageUpload';
import { saveDeferredData, clearDeferredSaveData } from '../../../utils/offlineModeHandler';

import { DEFERRED_SAVE_DATA_ITEM_KEY } from '../../../constants/offline';
import { INTERNET_CONNECTION_ONLINE, INTERNET_CONNECTION_OFFLINE } from "../../../constants/internetConnection";

import FieldsWithToggle from '../../molecules/FieldsWithToggle';
import PictureUpload from '../../molecules/EditProfile/ProfilePicture';
import UserProfileField from '../../molecules/EditProfile/UserProfileField';
import UserProfileTextAreaField from '../../molecules/EditProfile/UserProfileTextAreaField';

import useInternetConnection from '../../../hooks/useInternetConnection';

const visibilityStyling = { display: "flex", alignItems: "center", justifyContent: "flex-end"};

const EditProfilePage = () => {
  const URLParams = useParams();
  const {connected, setConnected} = useInternetConnection();

  const [userProfileData, setUserProfileData] = useState({});
  const [enteredStartDate, setEnteredStartDate] = useState(null);
  const [enteredEndDate, setEnteredEndDate] = useState(null);
  const [startDateErrorMessage, setStartDateErrorMessage] = useState("");

  const [selectedCompanyLogo, setSelectedCompanyLogo] = useState(null);
  const [selectedCompanyLogoURL, setSelectedCompanyLogoURL] = useState("");
  const [companyLogoIsRemoved, setCompanyLogoIsRemovedIsRemoved] = useState(true);

  const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);
  const [profilePictureIsRemoved, setProfilePictureIsRemoved] = useState(true);

  const [fieldsDisplayState, setFieldsDisplayState] = useState({
    shouldShowProfilePicture: false,
    shouldShowAge: false,
    shouldShowCompany: false,
    shouldShowEndDate: false,
    shouldShowJobDescription: false,
    shouldShowJobTitle: false,
    shouldShowName: false,
    shouldShowWorkExperience: false,
  });
  const [formattedEndDateToSeconds, setFormattedEndDateToSeconds] = useState(0);

  useEffect(() => {
    const setInitialData = async () => {
      const data = await getUserProfile(URLParams.userProfileID);
      setUserProfileData(data);

      setEnteredStartDate(getSecondsToDateValue(data.startDate?.seconds));
      setEnteredEndDate(getSecondsToDateValue(data.endDate?.seconds));

      prepareSwitchesToggleState(data, setFieldsDisplayState);
    };
    setInitialData();
  }, [URLParams.userProfileID]);

  useEffect(() => {
    const doSaveOnReconnect = async () => {
      if (connected) {
        await saveDeferredData(URLParams.userProfileID);
        clearDeferredSaveData(DEFERRED_SAVE_DATA_ITEM_KEY);
      }
    };
    doSaveOnReconnect();
  }, [connected]);

  useEffect(() => {
    window.addEventListener(INTERNET_CONNECTION_ONLINE, () => {
      handleConnection(setConnected);
    });
    window.addEventListener(INTERNET_CONNECTION_OFFLINE, () => {
      handleConnection(setConnected);
    });
    handleConnection(setConnected);

    return () => {
      window.removeEventListener(INTERNET_CONNECTION_ONLINE, handleConnection(setConnected));
      window.removeEventListener(INTERNET_CONNECTION_OFFLINE, handleConnection(setConnected));
    };
  }, []);

  const onStartDateChangeHandler = (enteredStartDateValue) => {
    const invalidStartDateMessage = validateWorkExperienceDate(enteredStartDateValue, enteredEndDate);
    setStartDateErrorMessage("");
    if (invalidStartDateMessage) {
      setStartDateErrorMessage(invalidStartDateMessage);
    };

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

    setProfilePictureIsRemoved(false);

    setUploadedImagePreview({
      callback: setSelectedProfilePicture,
      imageFile: selectedProfilePictureFile,
    });
  };
  const onRemoveProfilePictureClickHandler = () => {
    setProfilePictureIsRemoved(true);
    setSelectedProfilePicture("");
  };

  const onCompanyLogoChangeHandler = ({ target }) => {
    const companyLogoFile = target.files[0]
    const formData = new FormData();
    formData.append("image", companyLogoFile, companyLogoFile.name);
    
    setSelectedCompanyLogoURL(companyLogoFile.name);

    setCompanyLogoIsRemovedIsRemoved(false);

    setUploadedImagePreview({
      callback: setSelectedCompanyLogoURL,
      imageFile: companyLogoFile,
    });
  };
  const onRemoveCompanyLogoClickHandler = () => {
    setCompanyLogoIsRemovedIsRemoved(true);
    setSelectedCompanyLogoURL("");
  };

  const onFormSubmitted = (updatedUserProfileValues) => {
    const preparedUpdatedUserProfileValues = {
      ...updatedUserProfileValues,
      startDate: enteredStartDate,
      endDate: enteredEndDate,
      ...fieldsDisplayState,
    };
    updateUserProfile(preparedUpdatedUserProfileValues, URLParams.userProfileID, connected);
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

         if (!values.name) {
          errors.name = 'Name can not be empty.';
         }

        validateAge(errors, values.age);

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
         dirty,
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
           <Grid container>
            <Grid item xs={12}>
              <PictureUpload
                fieldsWithToggleProps={{
                  switchName: "shouldShowProfilePicture",
                  switchLabel: "Visible",
                  switchCheckedValue: fieldsDisplayState.shouldShowProfilePicture,
                  onSwitchChangeHandler: onSwitchChangeHandler,
                }}
                fieldName="profilePicture"
                onPictureChangedHandler={onProfilePictureChangedHandler}
                onRemovePictureClickHandler={onRemoveProfilePictureClickHandler}
                pictureIsRemoved={profilePictureIsRemoved}
                handleChange={handleChange}
                uploadedImageTitle={values.profilePicture}
                selectedPicture={selectedProfilePicture}
              />
              <UserProfileField
                fieldsWithToggleProps={{
                  switchName: "shouldShowName",
                  switchLabel: "Visible",
                  switchCheckedValue: fieldsDisplayState.shouldShowName,
                  onSwitchChangeHandler: onSwitchChangeHandler,
                }}
                fieldName="name"
                handleChange={handleChange}
                inputValue={values.name}
                fieldLabel="Name*"
                // isError={errors.name}
                isRequired
                errorMessage={errors.name}
              />
              <UserProfileField
                fieldsWithToggleProps={{
                  switchName: "shouldShowAge",
                  switchLabel: "Visible",
                  switchCheckedValue: fieldsDisplayState.shouldShowAge,
                  onSwitchChangeHandler: onSwitchChangeHandler,
                }}
                fieldName="age"
                handleChange={handleChange}
                inputValue={values.age}
                fieldLabel="Age"
                // isError={errors.age}
                errorMessage={errors.age}
              />
              <Grid container>
                <Grid container justifyContent="center" item display="flex" xs={8}>
                  <Typography component="h3" variant="h6">
                    Work Experience
                  </Typography>
                </Grid>
                <Grid item sx={visibilityStyling} xs={2}>
                  <FormGroup>
                    <FormControlLabel control={
                      <Switch
                        name="shouldShowWorkExperience"
                        checked={fieldsDisplayState.shouldShowWorkExperience || false}
                        onChange={onSwitchChangeHandler}
                      />
                    } label="Visible" />
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid justifyContent="center" spacing={8} xs={10} container pb={4}>
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
                      { startDateErrorMessage && <FormHelperText error>{startDateErrorMessage}</FormHelperText> }
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
              <UserProfileField
                fieldsWithToggleProps={{
                  switchName: "shouldShowJobTitle",
                  switchLabel: "Visible",
                  switchCheckedValue: fieldsDisplayState.shouldShowJobTitle,
                  onSwitchChangeHandler: onSwitchChangeHandler,
                }}
                fieldName="jobTitle"
                handleChange={handleChange}
                inputValue={values.jobTitle}
                fieldLabel="Job Title"
              />
              <UserProfileField
                fieldsWithToggleProps={{
                  switchName: "shouldShowCompany",
                  switchLabel: "Visible",
                  switchCheckedValue: fieldsDisplayState.shouldShowCompany,
                  onSwitchChangeHandler: onSwitchChangeHandler,
                }}
                fieldName="company"
                handleChange={handleChange}
                inputValue={values.company}
                fieldLabel="Company"
              />
              <PictureUpload
                fieldsWithToggleProps={{
                  switchName: "shouldShowCompanyLogo",
                  switchLabel: "Visible",
                  switchCheckedValue: fieldsDisplayState.shouldShowCompanyLogo,
                  onSwitchChangeHandler: onSwitchChangeHandler,
                }}
                fieldName="companyLogo"
                onPictureChangedHandler={onCompanyLogoChangeHandler}
                onRemovePictureClickHandler={onRemoveCompanyLogoClickHandler}
                pictureIsRemoved={companyLogoIsRemoved}
                handleChange={handleChange}
                uploadedImageTitle={values.companyLogo}
                selectedPicture={selectedCompanyLogoURL}
              />
              <UserProfileTextAreaField
                fieldsWithToggleProps={{
                  switchName: "shouldShowJobDesc",
                  switchLabel: "Visible",
                  switchCheckedValue: fieldsDisplayState.shouldShowJobDesc,
                  onSwitchChangeHandler: onSwitchChangeHandler,
                }}
                fieldName="jobDesc"
                handleChange={handleChange}
                inputValue={values.jobDesc}
                fieldLabel="Job Description"
              />
              <Grid mt={5} container item xs={12} justifyContent="center">
                <Button
                  onClick={onDiscardClickedHandler(dirty)}
                >
                  Discard
                </Button>
                <Button
                  variant="contained"
                  component="label"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
         </form>
       )}
     </Formik>
  );
};

export default EditProfilePage;
