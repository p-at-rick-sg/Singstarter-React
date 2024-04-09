import {useState, useEffect, Fragment} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  Container,
  FormControlLabel,
  TextField,
  Grid,
  Typography,
  Box,
  Switch,
  Button,
} from '@mui/material';
import {useUser} from '../hooks/useUser';
import useFetch from '../hooks/useFetch';

const ProfileManager = () => {
  const {user, setUser} = useUser(); //also remember to push back to the database
  const fetchData = useFetch();
  const navigate = useNavigate();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [checked, setChecked] = useState(false);
  const [inputFields, SetInputFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address1: '',
    address2: '',
    town: '',
    country: 'Singapore',
    postcode: '',
    telephone: '',
    role: 'user',
  });
  const [companyFields, setCompanyFields] = useState({
    companyName: '',
    taxId: '',
  });

  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    address1: false,
    address2: false,
    town: false,
    country: false,
    postcode: false,
  });
  //grab the users full details from the db to populate
  const getUser = async () => {
    const result = await fetchData('/api/users', 'GET', undefined, user.accessToken);
    if (result.ok) {
      try {
        console.log('setting user deets');
        SetInputFields({
          firstName: result.data.firstName || '',
          lastName: result.data.lastName || '',
          email: result.data.email || '',
          address1: result.data.address1 || '',
          address2: result.data.address2 || '',
          town: result.data.town || '',
          country: result.data.country || 'Singapore',
          postcode: result.data.postcode || '',
          telephone: result.data.telephone || '',
        });
        if (user.role === 'user') setShowUpgrade(true);
      } catch (err) {
        console.error('failed to get user details');
      }
    }
  };

  useEffect(() => {
    getUser();
  }, [user]);

  const handleSwitch = e => {
    setChecked(e.target.checked);
  };

  const handleUpdate = async e => {
    e.preventDefault();
    console.log(e);
    //put all the values into a single object to send 1 update
    const updatedUser = {
      firstName: inputFields.firstName,
      lastName: inputFields.lastName,
      email: inputFields.email,
      password: inputFields.password,
      address1: inputFields.address1,
      town: inputFields.town,
      country: inputFields.country,
      postcode: inputFields.postcode,
    };
    if (inputFields.address2) updatedUser.address2 = inputFields.address2;
    if (inputFields.telephone) updatedUser.telephone = inputFields.telephone;
    // check if the user is currently a standard user so we don;t accidentally remoove contributor access
    if (user.role === 'user' && inputFields.checked === true) updatedUser.role = 'contributor';
    if (companyFields.taxId) updatedUser.taxId = companyFields.taxId;
    if (companyFields.companyName) updatedUser.companyName = companyFields.companyName;

    try {
      const result = await fetchData('/api/users/update', 'PATCH', updatedUser, user.accessToken);
      console.log(result);
      if (result.ok) navigate('/member');
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleChange = e => {
    if (!e.target.validity.valid) {
      setError({...error, [e.target.name]: true});
    } else {
      setError({...error, [e.target.name]: false});
    }
    SetInputFields({...inputFields, [e.target.name]: e.target.value});
  };

  return (
    <>
      <Container component="main" maxWidth="lg">
        <Box component="form" onSubmit={handleUpdate} sx={{mt: 3}}>
          {checked && <p>{checked}</p>}
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
                label="First Name"
                value={inputFields.firstName}
                onChange={handleChange}
                error={error.firstName}
                inputProps={{pattern: '[A-Za-z]+'}}
                helperText={error.firstName}
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
                value={inputFields.lastName}
                onChange={handleChange}
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
                value={inputFields.address1}
                onChange={handleChange}
                label="Address line 1"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                id="address2"
                name="address2"
                label="Address line 2"
                value={inputFields.address2}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                variant="standard"
                id="town"
                name="town"
                value={inputFields.town}
                onChange={handleChange}
                label="Town or City"
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                variant="standard"
                id="postcode"
                name="postcode"
                value={inputFields.postcode}
                onChange={handleChange}
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
                value={inputFields.country}
                onChange={handleChange}
                fullWidth
                autoComplete="shipping country"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="standard"
                id="telephone"
                name="telephone"
                value={inputFields.telephone}
                onChange={handleChange}
                label="Telephone (Optional)"
                fullWidth
              />
            </Grid>
            {showUpgrade && (
              <Fragment>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <FormControlLabel
                      sx={{pl: 2, pt: 2}}
                      checked={checked}
                      onChange={handleSwitch}
                      control={<Switch />}
                      label="I want to post projects"
                    />
                  </Grid>
                </Grid>
              </Fragment>
            )}
            {checked ||
              (!showUpgrade && (
                <>
                  <Grid container spacing={2} sx={{mt: '5px'}}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="filled"
                        id="companyName"
                        name="companyName"
                        label="Comnpany or Trading Name"
                        value={companyFields.companyName}
                        onChange={handleChange}
                        fullWidth
                        autoComplete="companny-name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="filled"
                        id="taxId"
                        name="taxId"
                        label="Tax ID or Company UEN"
                        value={companyFields.taxId}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </>
              ))}
            <Grid container spacing={2} justifyContent="flex-end" sx={{pt: 2}}>
              <Grid item xs={12} sm={12}>
                <Button type="submit" fullWidth variant="contained">
                  Update Details
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ProfileManager;
