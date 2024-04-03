import {useEffect, useState} from 'react';
import useFetch from '../hooks/useFetch';
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

//Context
import {useUser} from '../hooks/useUser';

const AddProject = () => {
  const {user} = useUser();
  const [newProject, setNewProject] = useState({
    title: '',
    details: '',
    target: 0,
    endDate: Date.now(),
    images: [],
  });

  const handleChange = e => {
    console.log('change function');
    setNewProject({...newProject, [e.target.name]: e.target.value});
  };

  const handleSubmit = e => {
    console.log('submit function');
  };

  return (
    <>
      <Container component="main" maxWidth="m">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid black', //remove once layout looks OK
          }}>
          {/* <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
            <LockOutlinedIcon sx={{color: 'inherit'}} />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            Adding Your Great idea
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{mt: 0}}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  id="title"
                  label="Project Title"
                  name="title"
                  autoFocus
                  value={newProject.title}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  id="title"
                  label="Project Title"
                  name="title"
                  autoFocus
                  value={newProject.title}
                  onChange={handleChange}
                />
                <TextField type="file" />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default AddProject;
