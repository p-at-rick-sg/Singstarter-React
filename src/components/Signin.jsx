import {useState, useEffect} from 'react';
import {useNavigate, NavLink} from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import {jwtDecode} from 'jwt-decode';
// Context Stuff
import {useUser} from '../hooks/useUser'; //import the hgook here to be able to easily import the reqwuired items below from it
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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// Component Imports

const Signin = () => {
  const fetchData = useFetch();
  const {pageTitle, setPageTitle, user, setUser} = useUser(); // comes from user context
  const [credentials, setCredentials] = useState({email: '', password: ''});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  //check logged in session data and bypass login if exists
  const checkSession = () => {
    console.log('checking session');
    if (sessionStorage.getItem('access') !== null) {
      console.log('data in session storage, bypassing login');
      const sessionAccess = sessionStorage.getItem('access');
      const role = sessionStorage.getItem('role');
      setUser({...user, accessToken: sessionAccess, role: role});
      if (user.role === 'contributor') {
        navigate('/member');
      } else {
        navigate('/member');
      }
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const handleSignin = async e => {
    e.preventDefault();
    setSubmitting(true); //we can use this variable for the spinner
    const result = await fetchData('/auth/signin', 'POST', {
      email: credentials.email,
      password: credentials.password,
    });
    if (result.ok) {
      localStorage.setItem('refresh', result.data.refresh); //set the refresh in local storage
      const decodedClaims = jwtDecode(result.data.access); //decode the access token
      setUser({...user, role: decodedClaims.role, accessToken: result.data.access});
      sessionStorage.setItem('access', result.data.access);
      sessionStorage.setItem('role', decodedClaims.role);
      setSubmitting(false);
      if (user.role === 'contributor') {
        navigate('/member');
      } else {
        navigate('/member');
      }
    } else {
      //login has failed for some reason
      console.error('failed login attempt');
      setSubmitting(false);
    }
  };

  const handleChange = e => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
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
          <Box component="form" onSubmit={handleSignin} sx={{mt: 1}}>
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
