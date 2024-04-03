//MUI Imports
import {FormControl, Box, TextField, LinearProgress, Button} from '@mui/material';
const UploadForm = ({}) => {
  return (
    <form>
      <TextField type="file" />
      <Button variant="contained" color="primary" component="span">
        Start My Project
      </Button>
    </form>
  );
};

export default UploadForm;
