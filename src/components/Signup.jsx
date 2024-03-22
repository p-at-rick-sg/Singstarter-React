import {useState, useEffect} from 'react';
import {useNavigate, NavLink} from 'react-router-dom';

//MUI Imports
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Container,
  Typography,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// Component Imports

// Context Stuff
import {useUser} from '../hooks/useUser';

const Signup = () => {
  const {pageTitle, setPageTitle, user} = useUser(); // comes from user context

  //state for the form
  const [inputFields, SetInputFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordCheck: '',
  });

  const handleSubmit = e => {
    e.preventDefault();
  };

  const handleChange = e => {
    SetInputFields({...inputFields, [e.target.name]: e.target.value});
  };

  return (
    <div>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
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
                  autoComplete="family-name"
                  //   disabled={addUser ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={inputFields.email}
                  onChange={handleChange}
                  autoComplete="email"
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

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive great promotions and updates via email."
                />
              </Grid>
            </Grid>
            {/* {userExists && (
              <Grid>
                <div>
                  User Already Exists - <NavLink to="/signin">Login</NavLink>
                </div>
              </Grid>
            )} */}
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
