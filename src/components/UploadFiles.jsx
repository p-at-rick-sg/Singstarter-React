import {useState} from 'react';
import {useUser} from '../hooks/useUser';

//MUI Imports
import {
  List,
  ListItem,
  ListItemText,
  Box,
  TextField,
  Grid,
  LinearProgress,
  Button,
  IconButton,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';

const UploadFiles = ({projectID}) => {
  //add projectID prop after testing
  const {user} = useUser();
  const [imageList, setImageList] = useState([]);
  const [secondary, setSecondary] = useState(false);
  const [fileError, setFileError] = useState(null);

  const handleFile = e => {
    setFileError(false);
    const allowedFileTypes = ['png', 'jpg', 'jpeg', 'tiff'];
    const fileSuffix = e.target.files[0].name.split('.').pop();
    console.log(fileSuffix);
    if (allowedFileTypes.includes(fileSuffix)) {
      try {
        const tmpImageObj = {file: e.target.files[0], name: e.target.files[0].name};
        setImageList(prevState => [...prevState, tmpImageObj]);
      } catch (err) {
        console.error('error: ', err.message);
      }
    } else {
      console.error('file type not supported');
      setFileError(true);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (imageList.length !== 0) {
      for (const imageObj of imageList) {
        uploadImage(imageObj);
      }
    } else {
      setFileError(true);
    }
  };

  //Using a standard fetch for now - may upodate the hook tomorrow to accomodate the application type required
  const uploadImage = async imageObj => {
    //temp project id var:
    console.log('attempting to upload image');
    // const projectID = '6700ddf51fd1162aae22ea26';
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + user.accessToken);
    const formdata = new FormData();
    formdata.append('image', imageObj.file, imageObj.name); //change out for description variable once fully tested
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

  const removeFile = e => {
    console.log(imageList);
    const newImageList = imageList.filter((image, idx) => {
      if (idx === e.target.id) {
        return image;
      }
    });
    console.log(newImageList);
    setImageList(newImageList);
  };

  return (
    <Box component="form" maxWidth={300} onSubmit={handleSubmit} sx={{m: 5}}>
      <Grid container spacing={2}>
        <List dense={true}>
          {imageList.map((image, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" id={index} onClick={removeFile}>
                  <DeleteIcon />
                </IconButton>
              }>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={image.name} />
            </ListItem>
          ))}
        </List>
        <TextField type="file" id="image" name="images" onChange={handleFile} />
      </Grid>
      <Grid container spacing={2} sx={{mt: '10px', alignItems: 'center', justifyContent: 'center'}}>
        <Button variant="contained" color="primary" component="span" onClick={handleSubmit}>
          Upload Files
        </Button>
      </Grid>
    </Box>
  );
};

export default UploadFiles;
