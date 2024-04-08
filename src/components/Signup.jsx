import {useState, useEffect} from 'react';
import {useNavigate, NavLink} from 'react-router-dom';
import useFetch from '../hooks/useFetch';

//MUI Imports
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Container,
  Typography,
  Switch,
  FormControlLabel,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// Component Imports

// Context Stuff
import {useUser} from '../hooks/useUser';

const Signup = () => {
  const fetchData = useFetch();
  const {setPageTitle, setUser, user} = useUser(); // comes from user context
  // const [emailExists, setEmailExists] = useState(false);
  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    address1: false,
    address2: false,
    town: false,
    country: false,
    postcode: false,
    email: false,
    emailExists: false,
    password: false,
    passwordMismatch: false,
  });

  const [companyFields, setCompanyFields] = useState({
    companyName: '',
    taxId: '',
  });

  const [passwordErrorText, setPasswordErrorText] = useState('');
  const navigate = useNavigate();
  //state for the form
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
    password: '',
    passwordCheck: '',
  });

  const [checked, setChecked] = useState(false);

  useEffect(() => setPageTitle('Signup'), []);

  const handleSignup = async e => {
    e.preventDefault();
    setSubmitting(true); //we can use this variable for the spinner
    //put the variables into an object if they exist
    const newUser = {
      firstName: inputFields.firstName,
      lastName: inputFields.lastName,
      email: inputFields.email,
      password: inputFields.password,
      address1: inputFields.address1,
      town: inputFields.town,
      country: inputFields.country,
      postcode: inputFields.postcode,
    };
    if (inputFields.address2) newUser.address2 = inputFields.address2;
    if (inputFields.role) newUser.role = inputFields.role;
    if (inputFields.telephone) newUser.telephone = inputFields.telephone;
    //company specific fields
    if (inputFields.checked) updatedUser.role = 'contributor';
    if (companyFields.taxId) updatedUser.taxId = companyFields.taxId;
    if (companyFields.companyName) updatedUser.companyName = companyFields.companyName;

    //send the call to the backend
    const result = await fetchData('/auth/signup', 'PUT', newUser);
    if (result.ok) {
      console.log('signup successful');
    } else {
      //signup has failed for some reason
      console.error('failed signup attempt');
    }
    setSubmitting(false);
  };

  const handleChange = e => {
    if (!e.target.validity.valid) {
      setError({...error, [e.target.name]: true});
    } else {
      setError({...error, [e.target.name]: false});
    }
    SetInputFields({...inputFields, [e.target.name]: e.target.value});
    if (inputFields.password !== inputFields.passwordCheck) {
      setPasswordErrorText('Password Mismatch');
    }
  };

  const handleCompanyChange = e => {
    setCompanyFields({...companyFields, [e.target.name]: e.target.value});
  };

  const handleSwitch = e => {
    setChecked(e.target.checked);
  };

  return (
    <div>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSignup} sx={{mt: 3}}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={inputFields.firstName}
                  onChange={handleChange}
                  autoFocus
                  error={error.firstName}
                  inputProps={{pattern: '[A-Za-z]+'}}
                  helperText={error.firstName}
                  //   disabled={addUser ? true : false}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={inputFields.lastName}
                  onChange={handleChange}
                  inputProps={{pattern: '[A-Za-z]+'}}
                  error={error.lastName}
                  helperText={error.lastName}
                  autoComplete="family-name"
                  //   disabled={addUser ? true : false}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="street"
                  name="address1"
                  required
                  fullWidth
                  id="address1"
                  label="Unit #/Block and Street"
                  value={inputFields.address1}
                  onChange={handleChange}
                  autoFocus
                  inputProps={{pattern: '[A-Za-z0-9 ]+'}}
                  error={error.address1}
                  helperText={error.address1 ? 'Please enter Letters and Numbers Only' : ''}
                  //   disabled={addUser ? true : false}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="address2"
                  label="Address Line 2 (Optional)"
                  name="address2"
                  value={inputFields.address2}
                  inputProps={{pattern: '[A-Za-z0-9 ]+'}}
                  error={error.address2}
                  helperText={error.address2 ? 'Please enter Letters and Numbers Only' : ''}
                  onChange={handleChange}
                  //   disabled={addUser ? true : false}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="town"
                  name="town"
                  required
                  fullWidth
                  id="town"
                  label="Town or City"
                  value={inputFields.town}
                  onChange={handleChange}
                  inputProps={{pattern: '[A-Za-z]+'}}
                  error={error.town}
                  helperText={error.town ? 'Please enter Letters Only' : ''}
                  autoFocus
                  //   disabled={addUser ? true : false}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="country"
                  name="country"
                  required
                  fullWidth
                  id="country"
                  label="Country"
                  value={inputFields.country}
                  inputProps={{pattern: '[A-Za-z]+'}}
                  error={error.country}
                  helperText={error.country ? 'Please enter Letters Only' : ''}
                  onChange={handleChange}
                  autoFocus
                  //   disabled={addUser ? true : false}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="postcode"
                  label="Postcode/Zip Code"
                  name="postcode"
                  inputProps={{pattern: '[A-Za-z0-9]+'}}
                  error={error.postcode}
                  helperText={error.postcode ? 'Please enter Letters and Numbers Only' : ''}
                  value={inputFields.postcode}
                  onChange={handleChange}
                  //   disabled={addUser ? true : false}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="telephone"
                  label="Telephone (Optional)"
                  name="telephone"
                  value={inputFields.telephone}
                  inputProps={{pattern: '[0-9+]+'}}
                  onChange={handleChange}
                  error={error.telephone}
                  helperText={error.telephone ? 'Please enter Numbers and + Only' : ''}
                  //   disabled={addUser ? true : false}
                />
              </Grid>

              {/* <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="spare"
                  label="Telephone (Optional)"
                  name="telephone"
                  value={inputFields.telephone}
                  onChange={handleChange}
                  //   disabled={addUser ? true : false}
                />
              </Grid> */}

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
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

              {checked && (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="filled"
                        id="companyName"
                        name="companyName"
                        label="Company Name/Trading Name"
                        value={companyFields.companyName}
                        onChange={handleCompanyChange}
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
                        onChange={handleCompanyChange}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  value={inputFields.email}
                  onChange={handleChange}
                  autoComplete="email"
                  error={error.password || error.passwordMismatch}
                  helperText={error.password || error.passwordMismatch ? {passwordErrorText} : ''}
                  //   disabled={addUser ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={inputFields.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  //   disabled={addUser ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passwordCheck"
                  label="PasswordCheck"
                  type="password"
                  id="passwordCheck"
                  value={inputFields.passwordCheck}
                  onChange={handleChange}
                  autoComplete="new-password"
                  //   disabled={addUser ? true : false}
                />
              </Grid>
            </Grid>
            {error.emailExists && (
              <Grid>
                <div>
                  User Already Exists - <NavLink to="/signin">Login</NavLink>
                </div>
              </Grid>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
              //   disabled={addUser ? true : false}
            >
              Sign Up Now
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="signin" variant="body2">
                  <NavLink to="/signin">Already have an account? Sign in Here</NavLink>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Signup;
