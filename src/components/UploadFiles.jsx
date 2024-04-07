import {useState} from 'react';
import {useUser} from '../hooks/useUser';

//MUI Imports
import {
  List,
  ListItem,
  ListItemText,
  Box,
  TextField,
  LinearProgress,
  Button,
  IconButton,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';

const UploadFiles = ({}) => {
  const {user} = useUser();
  const [imageList, setImageList] = useState([]);
  const [secondary, setSecondary] = useState(false);

  const handleFile = e => {
    const tmpImageObj = {file: e.target.files[0], name: e.target.files[0].name};
    setImageList(prevState => [...prevState, tmpImageObj]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append(newProject.title, image);
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

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
      <List dense={true}>
        {imageList.map((image, index) => (
          <ListItem key={index}>
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
      <Button variant="contained" color="primary" component="span" onClick={handleSubmit}>
        Add File
      </Button>
      {imageList && <p>{imageList.length}</p>}
    </Box>
  );
};

export default UploadFiles;
