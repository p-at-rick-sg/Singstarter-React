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

const Signin = () => {
  const {pageTitle, setPageTitle, user, setUser, setAuthenticated} = useUser(); // comes from user context
  const [credentials, setCredentials] = useState({email: '', password: ''});

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitting(true);
  };

  const handleChange = e => {
    if (e.target.name === 'email') console.log('email change:', e.target.value);
    if (e.target.name === 'password') console.log('password change:', e.target.value);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
            <LockOutlinedIcon sx={{color: 'inherit'}} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={credentials.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link>Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link variant="body2">
                  <NavLink to="/signup">{"Don't have an account? Sign Up"}</NavLink>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Signin;
