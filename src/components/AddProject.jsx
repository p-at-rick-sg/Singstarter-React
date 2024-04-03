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
  CssBaseline,
  InputAdornment,
  ListItem,
  List,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  InputLabel,
} from '@mui/material';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';

import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {Dayjs} from 'dayjs';

//Context
import {useUser} from '../hooks/useUser';

//Main Component Function
const AddProject = () => {
  const fetchData = useFetch();
  const {user, setPageTitle} = useUser();
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    target: 0,
    images: null,
    imageDescription: null,
  });
  const [endDate, setEndDate] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    setPageTitle('Add Project');
  }, []);

  const handleChange = e => {
    setNewProject({...newProject, [e.target.name]: e.target.value});
  };

  const handleFile = async e => {
    setImage(e.target.files[0]);
  };
  //Using a standard fetch for now - may upodate the hook tomorrow to accomodate the application type required
  const uploadImage = async projectID => {
    const myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvbnRyaWJ1dG9yQHRlc3QuY29tIiwicm9sZSI6ImNvbnRyaWJ1dG9yIiwiaWQiOiI2NzAwZGU2YjFmZDExNjJhYWUyMmZmMzAiLCJpYXQiOjE3MTIxNDc3MjEsImV4cCI6MTcxMjE0OTUyMSwianRpIjoiNWM0ZTYwNjEtNmJlZC00ZTYwLWJiMmMtMmM5NTNkYmFlZDE1In0.TcvlWSrWS6ddg6zPQJVqK1Wc87zEmCKTCNekgth8isg'
    );
    const formdata = new FormData();
    formdata.append('image', image, 'test-image.jpg'); //change out for description variable once fully tested

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    const result = await fetch(
      'http://localhost:7001/api/projects/uploadAsset/' + projectID,
      requestOptions
    );
    const data = await result.json();
    console.log(data);
  };

  const addProject = async () => {
    const body = {
      title: newProject.title,
      description: newProject.description,
      target: newProject.target,
    };
    if (endDate) body.endDate = endDate;
    const result = await fetchData(
      '/api/projects',
      'PUT',
      body,
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvbnRyaWJ1dG9yQHRlc3QuY29tIiwicm9sZSI6ImNvbnRyaWJ1dG9yIiwiaWQiOiI2NzAwZGU2YjFmZDExNjJhYWUyMmZmMzAiLCJpYXQiOjE3MTIxNDc3MjEsImV4cCI6MTcxMjE0OTUyMSwianRpIjoiNWM0ZTYwNjEtNmJlZC00ZTYwLWJiMmMtMmM5NTNkYmFlZDE1In0.TcvlWSrWS6ddg6zPQJVqK1Wc87zEmCKTCNekgth8isg'
    );
    uploadImage(result.data.id);
  };

  const handleSubmit = e => {
    console.log('submit function');
    e.preventDefault();
    addProject();
    const formData = new FormData();
    formData.append(newProject.title, image);
  };

  const handleCancel = e => {
    //return the the member page once we have one
  };

  return (
    <>
      <CssBaseline>
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
            <Typography component="h1" variant="h5" sx={{color: 'primary.main'}}>
              Adding Your Great idea
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{mt: 0}}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    id="title"
                    label="Project Title"
                    name="title"
                    autoFocus
                    value={newProject.title}
                    onChange={handleChange}
                    sx={{width: '90%'}}
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={{textAlign: 'right'}}>
                  <TextField
                    margin="normal"
                    required
                    InputProps={{
                      startAdornment: <InputAdornment position="start">S$</InputAdornment>,
                    }}
                    id="target"
                    label="Funding Target"
                    name="target"
                    autoFocus
                    value={newProject.target}
                    onChange={handleChange}
                    sx={{width: '90%'}}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    margin="normal"
                    fullWidth
                    required
                    id="description"
                    label="Project Description"
                    name="description"
                    autoFocus
                    value={newProject.description}
                    onChange={handleChange}
                    multiline
                    minRows={8}
                    maxRows={8}
                  />
                </Grid>

                <Grid
                  container
                  spacing={2}
                  direction="row"
                  alignItems="center"
                  justifyContent="center">
                  <Grid item xs={12} sm={4}>
                    <InputLabel htmlFor="image">Select A Main Image</InputLabel>
                    <input
                      type="file"
                      margin="normal"
                      required
                      id="image"
                      label="Upload Images"
                      name="image"
                      autoFocus
                      value={newProject.image}
                      onChange={handleFile}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      margin="normal"
                      fullWidth
                      required
                      id="imageDescritpion"
                      label="Image Description"
                      name="imageDescritpion"
                      autoFocus
                      value={newProject.imageDescription}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} sx={{textAlign: 'right'}}>
                    <DatePicker
                      sx={{}}
                      id="endDate"
                      label="End Date (Optional)"
                      name="endDate"
                      autoFocus
                      value={endDate}
                      onChange={setEndDate}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                direction="row"
                alignItems="center"
                justifyContent="center">
                <Grid item xs={8} sm={5}>
                  <Button
                    type="cancel"
                    fullWidth
                    variant="outlined"
                    sx={{mt: 3, mb: 2, margin: '5px'}}
                    //   disabled={addProject ? true : false}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={8} sm={5}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2, margin: '5px'}}>
                    Add my Project
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </CssBaseline>
    </>
  );
};

export default AddProject;
