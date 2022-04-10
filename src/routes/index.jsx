import { Router, Route, Routes, Switch } from "react-router-dom";
import ProfilePage from '../component/organisms/ProfilePage'
import { history } from "../utils/history";

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const AppRoutes = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Routes history={history}>
            <Route path="/" element={<ProfilePage />}  exact />
          </Routes>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default AppRoutes;