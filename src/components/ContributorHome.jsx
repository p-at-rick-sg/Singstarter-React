import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useUser} from '../hooks/useUser';
import useFetch from '../hooks/useFetch';
//MUI Imports
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Container,
  Typography,
  CssBaseline,
  InputAdornment,
  InputLabel,
} from '@mui/material';

const ContributorHome = () => {
  const {user, setUser, checkSession, setPageTitle} = useUser();
  const fetchData = useFetch();
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    checkSession();
  }, []);

  const populateUser = async () => {
    if (user.accessToken) {
      const result = await fetchData('/api/users', 'GET', undefined, user.accessToken);
      setUser({...user, firstName: result.data.firstName, createdDate: result.data.createdDate});
    }
  };

  const populateProjects = async () => {
    if (user.accessToken) {
      const result = await fetchData(
        '/api/projects/myProjects',
        'GET',
        undefined,
        user.accessToken
      );
    }
  };

  useEffect(() => {
    setPageTitle('Contributor Home');
  }, []);

  useEffect(() => {
    populateUser();
    populateProjects();
  }, []);

  return (
    <>
      <Container component="main" maxWidth="m">
        {user.role}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid black', //remove once layout looks OK
          }}>
          <Grid container spacing={2}>
            <Grid container item xs={6} direction="column"></Grid>
            <Grid item xs={8} sm={5} sx={{textAlign: 'right'}}>
              <Button
                variant="contained"
                sx={{mt: 3, mb: 2, mr: -7}}
                onClick={() => navigate('/member/add')}>
                Add Project
              </Button>
            </Grid>
          </Grid>

          {user.accessToken && (
            <Typography component="h1" variant="h5" sx={{color: 'primary.main'}}>
              Welcome back {user.firstName}
            </Typography>
          )}
          <Grid container spacing={2}>
            <Grid container item xs={6} direction="column">
              <Grid item xs={12} sm={6}>
                <Typography
                  component="h2"
                  variant="h5"
                  sx={{color: 'primary.main', fontWeight: '600'}}>
                  Your Projects
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={6} direction="column">
              <Grid item xs={12} sm={6}>
                <Typography
                  component="h2"
                  variant="h5"
                  sx={{color: 'primary.main', fontWeight: '600'}}>
                  Questions & Answers
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ContributorHome;

{
  /* <Grid item xs={8} sm={5}>
<Button
  type="submit"
  fullWidth
  variant="contained"
  sx={{mt: 3, mb: 2, margin: '5px'}}>
  Add my Project
</Button>
</Grid> */
}
