import {useState, useEffect} from 'react';
import {Checkbox, FormControlLabel, TextField, Grid, Typography, Box, Switch} from '@mui/material';
import {useUser} from '../hooks/useUser';

const ProfileManager = () => {
  const {user} = useUser();
  const [showUpgrade, setShowUpgrade] = useState();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (user.role === 'user') setShowUpgrade(true);
  }, []);

  const handleSwitch = e => {
    setChecked(e.target.checked);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        paddingLeft={'25%'}
        paddingRight="25%"
        paddingTop={'5%'}>
        <Grid item md={12} justifySelf="center">
          <Typography variant="h6">Profile Manager</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            variant="standard"
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            variant="standard"
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            variant="standard"
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="standard"
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            variant="standard"
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="standard"
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            variant="standard"
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            variant="standard"
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
          />
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <FormControlLabel
              sx={{pl: 2, pt: 2}}
              required
              checked={checked}
              onChange={handleSwitch}
              control={<Switch />}
              label="I need to post projects"
            />
          </Grid>
        </Grid>

        {showUpgrade && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              a conditional section here for the contributor additional fields
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default ProfileManager;
