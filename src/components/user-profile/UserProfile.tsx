// ** MUI Components
import Grid from '@mui/material/Grid';

// ** Demo Components
import UserProfileHeader from './UserProfileHeader';
import AboutProfile from './profile/AboutProfile';
import AboutCompany from './profile/AboutCompany';
import { Typography } from '@mui/material';

const UserProfile = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserProfileHeader />
      </Grid>
      <Grid item xs={12}>

      <Typography><h2 className='font-bold text-xl'>User Profile</h2> </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={6}>
          <Grid item xl={6} md={5} xs={12}>
            <AboutProfile />
          </Grid>
          <Grid item xl={6} md={7} xs={12}>
            <AboutCompany />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
