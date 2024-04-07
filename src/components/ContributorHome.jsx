import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useUser} from '../hooks/useUser';
import useFetch from '../hooks/useFetch';
//MUI Imports
import {Button, TextField, Grid, Box, Container, Typography} from '@mui/material';

//Component Imports
import ProjectTable from './ProjectTable';
import QandASection from './QandASection';

const ContributorHome = () => {
  const {user, setUser, checkSession, setPageTitle} = useUser();
  const navigate = useNavigate();
  const fetchData = useFetch();
  const [projects, setProjects] = useState([]);
  const [selectedProjectID, setSelectedProjectID] = useState();

  const populateUser = async () => {
    if (user.accessToken) {
      const result = await fetchData('/api/users', 'GET', undefined, user.accessToken);
      setUser({
        ...user,
        firstName: result.data.firstName,
        createdDate: result.data.createdDate,
      });
    }
  };

  const populateProjects = async () => {
    if (user.accessToken) {
      try {
        const result = await fetchData(
          '/api/projects/myProjects',
          'GET',
          undefined,
          user.accessToken
        );
        if (result.ok) {
          console.log(result);
          setProjects(result.data);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    checkSession();
    setPageTitle('Contributor Home');
    populateUser();
    populateProjects();
  }, []);

  return (
    <>
      <Container component="main" maxWidth="lg">
        <Grid container spacing={2} sx={{marginTop: '10px'}}>
          <Grid container item sm={6} direction="column" sx={{border: 'red 0px solid'}}>
            <Typography component="h2" variant="h5" sx={{color: 'primary.main', fontWeight: '600'}}>
              Your Projects
            </Typography>
          </Grid>
          <Grid item sm={3} sx={{textAlign: 'right', border: 'green 0px solid'}}>
            <Typography component="h2" variant="h5" sx={{color: 'primary.main', fontWeight: '600'}}>
              Questions & Answers
            </Typography>
          </Grid>
          <Grid
            item
            sm={3}
            sx={{
              textAlign: 'right',
              alignItems: 'flex-start',
              marginBottom: '0px',
              border: 'green 0px solid',
            }}>
            <Button
              variant="contained"
              sx={{mt: 0, mb: 2, mr: 0}}
              onClick={() => navigate('/member/add')}>
              Add Project
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{border: 'black 0px solid'}}>
          <Grid container item xs={6} direction="column">
            <Grid item xs={12} sm={6} sx={{border: 'pink 0px solid'}}>
              <Grid item xs={12} sm={6} sx={{border: 'pink 0px solid'}}>
                <ProjectTable
                  projects={projects}
                  user={user}
                  setSelectedProjectID={setSelectedProjectID}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container item xs={6} direction="column">
            <Grid item sm={6} sx={{border: 'orange 0px solid'}}>
              <QandASection selectedProjectID={selectedProjectID} />
            </Grid>
          </Grid>
        </Grid>
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
