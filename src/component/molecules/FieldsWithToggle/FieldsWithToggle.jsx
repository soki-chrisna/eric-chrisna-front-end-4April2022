
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import Switch from '@mui/material/Switch';

import AppRoutes from '../../../routes';

const visibilityStyling = { display: "flex", alignItems: "center", justifyContent: "flex-end"};

const FieldsWithToggle = ({
  children, switchName, switchLabel,
  switchCheckedValue, onSwitchChangeHandler,
}) => {
  return (
    <Grid container xs={12}>
      <Grid item xs={8}>
        {children}
      </Grid>
      <Grid item sx={visibilityStyling} xs={2}>
        <FormGroup>
          <FormControlLabel control={
              <Switch
                name={switchName}
                // checked={values.shouldShowProfilePicture}
                checked={switchCheckedValue}
                onChange={onSwitchChangeHandler}
              />
            }
            label={switchLabel}
          />
        </FormGroup>
      </Grid>
    </Grid>
  )
}

export default FieldsWithToggle;