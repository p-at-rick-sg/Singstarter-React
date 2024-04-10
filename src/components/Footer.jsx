//MUI Imports
import {Container, Box, Typography, Link} from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/p-at-rick-sg">
        General Assembly SEI-49 Group 10
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Footer = () => {
  return (
    <>
      <Box
        component="footer"
        sx={{
          py: 2,
          mt: 5,
          color: theme =>
            theme.palette.mode === 'light' ? theme.palette.footer.text : theme.palette.footer.text,
          backgroundColor: theme =>
            theme.palette.mode === 'light' ? theme.palette.footer.main : theme.palette.footer.main,
        }}>
        <Container>
          <Typography variant="h6">A SingStarter Group Company</Typography>
          <Copyright />
        </Container>
      </Box>
    </>
  );
};

export default Footer;
