import {useUser} from '../hooks/useUser';

//MUI Imports
import {FormControl, Box, TextField, LinearProgress, Button} from '@mui/material';

const UploadFiles = ({}) => {
  const {user} = useUser();
  const handleFiles = async e => {
    setImage({...image, file: e.target.files[0], name: e.target.files[0].name});
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

  const handleSubmit = e => {
    e.preventDefault();
    addProject();
    const formData = new FormData();
    formData.append(newProject.title, image);
  };

  return (
    <form>
      <TextField type="file" />
      <Button variant="contained" color="primary" component="span">
        Upload Files
      </Button>
    </form>
  );
};

export default UploadForm;
