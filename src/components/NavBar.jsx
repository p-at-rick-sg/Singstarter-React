import {Fragment} from 'react';
import {NavLink} from 'react-router-dom';

//MUI Imports
import {AppBar, Box, Button, Toolbar, Typography, IconButton, CssBaseline} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

//context imports
import {useUser} from '../hooks/useUser';

const NavBar = () => {
  const {pageTitle, logout, user} = useUser();
  const tempFunc = () => {
    console.log('temp func');
  };

  return (
    <Fragment>
      <CssBaseline>
        <Box sx={{flexgrow: 1}}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                color="inherit"
                aria-label="menu"
                sx={{mr: 2}}
                component={NavLink}
                to="/home">
                {/* <MenuIcon /> */} SingStarter
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{display: {xs: 'none', sm: 'inline'}, flexGrow: 1}}>
                {/* have error on this line but it works so?? */}
                {pageTitle && pageTitle}
              </Typography>
              {!user.role && (
                <Button color="inherit" component={NavLink} to="signin">
                  Login
                </Button>
              )}
              {user.role && (
                <Button color="inherit" component={NavLink} to="home" onClick={logout}>
                  Logout
                </Button>
              )}
              {user.role === 'contributor' && (
                <Button color="inherit" component={NavLink} to="user">
                  Pich Area
                </Button>
              )}
              {!user.role && (
                <Button color="inherit" component={NavLink} to="signup">
                  Sign Up
                </Button>
              )}
              {user.role && (
                <Button sx={{m: 1, bgcolor: 'primary.main'}}>
                  <AccountCircleIcon sx={{color: 'white', fontSize: 'large'}} />
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </Box>
      </CssBaseline>
    </Fragment>
  );
};

export default NavBar;
