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
  //add projectID prop after testing
  const {user} = useUser();
  const [imageList, setImageList] = useState([]);
  const [secondary, setSecondary] = useState(false);

  const handleFile = e => {
    const fileArr = e.target.files[0].name.split('.').pop();
    // const fileSuffix = fileArr.pop();
    console.log(fileArr);
    // if (e.targetfiles[0] )
    const tmpImageObj = {file: e.target.files[0], name: e.target.files[0].name};
    setImageList(prevState => [...prevState, tmpImageObj]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (imageList.length !== 0) {
      for (const imageObj of imageList) {
        uploadImage(imageObj);
      }
    }
  };

  //Using a standard fetch for now - may upodate the hook tomorrow to accomodate the application type required
  const uploadImage = async imageObj => {
    //temp project id var:
    const projectID = '6700ddf51fd1162aae22ea26';
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
