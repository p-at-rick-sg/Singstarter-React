import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useFetch from '../hooks/useFetch';
//MUI Imports
import {
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
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

//Context
import {useUser} from '../hooks/useUser';

//Main Component Function
const AddProject = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const fetchData = useFetch();
  const {user, setPageTitle} = useUser();
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    target: 0,
    productCost: 0,
    images: null,
    imageDescription: null,
  });
  const [endDate, setEndDate] = useState(null);
  const [image, setImage] = useState({
    file: null,
    name: null,
  });

  useEffect(() => {
    setPageTitle('Add Project');
  });

  const handleChange = e => {
    setNewProject({...newProject, [e.target.name]: e.target.value});
  };

  const handleFile = async e => {
    setImage({
      ...image,
      file: e.target.files[0],
      name: e.target.files[0].name,
      imageDescripion: newProject.imageDescription,
    });
    // setImage(e.target.files[0]);
    // setImageName(e.target.files[0].name);
  };
  //Using a standard fetch for now - may upodate the hook tomorrow to accomodate the application type required
  const uploadImage = async projectID => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + user.accessToken);
    const formdata = new FormData();
    formdata.append('image', image.file, image.name); //change out for description variable once fully tested
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
  };

  const addProject = async () => {
    try {
      const body = {
        title: newProject.title,
        description: newProject.description,
        target: newProject.target,
        productCost: newProject.productCost,
      };
      if (endDate) body.endDate = endDate;
      const result = await fetchData('/api/projects', 'PUT', body, user.accessToken);
      uploadImage(result.data.id);
      return 0;
    } catch (err) {
      console.error('failed to add project');
      return 1;
    }
  };

  const handleSubmit = e => {
    setSubmitting(true);
    e.preventDefault();
    const result = addProject();
    if (!result) {
      setSubmitting(false);
      navigate('/member');
    } else {
      setSubmitting(false);
      setError(true);
    }
  };

  const handleCancel = e => {
    navigate('/member');
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
            }}>
            <Typography component="h1" variant="h5" sx={{color: 'primary.main'}}>
              Adding Your Great idea
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{mt: 0}}>
              <Grid container spacing={2}>
                <Grid item sm={12}>
                  <TextField
                    margin="normal"
                    required
                    id="title"
                    label="Project Title"
                    name="title"
                    autoFocus
                    value={newProject.title}
                    onChange={handleChange}
                    sx={{width: '100%'}}
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
                    sx={{width: '100%'}}
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={{textAlign: 'left'}}>
                  <TextField
                    margin="normal"
                    required
                    InputProps={{
                      startAdornment: <InputAdornment position="start">S$</InputAdornment>,
                    }}
                    id="productCost"
                    label="Produdct Cost"
                    name="productCost"
                    autoFocus
                    value={newProject.productCost}
                    onChange={handleChange}
                    sx={{width: '100%'}}
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
                    onClick={handleCancel}
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
