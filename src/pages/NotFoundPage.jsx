import {useNavigate} from 'react-router-dom';

//MUI Imports
import {Box, Button, Typography} from '@mui/material';
import {purple} from '@mui/material/colors';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/home');
  };

  const primary = purple[100]; // #f44336
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: primary,
      }}>
      <Typography variant="h1" style={{color: 'white'}}>
        404
      </Typography>
      <Typography variant="h6" style={{color: 'white'}}>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button onClick={handleClick} variant="contained">
        Back Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
