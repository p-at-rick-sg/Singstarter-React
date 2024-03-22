import {Fragment} from 'react';
import {NavLink} from 'react-router-dom';

//MUI Imports
import {AppBar, Box, Button, Toolbar, Typography, IconButton, CssBaseline} from '@mui/material';
import {MenuIcon, AccountCircle} from '@mui/icons-material/Menu';

const NavBar = () => {
  const user = {name: 'testName'};
  const pageTitle = 'Temp Page Title';
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
              <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                {pageTitle && pageTitle}
              </Typography>
              {!user.email && (
                <Button color="inherit" component={NavLink} to="signin">
                  Login
                </Button>
              )}
              {user.email && (
                <Button color="inherit" component={NavLink} to="home" onClick={logout}>
                  Logout
                </Button>
              )}
              {user.email && (
                <Button color="inherit" component={NavLink} to="user">
                  Pich Area
                </Button>
              )}
              {!user.email && (
                <Button color="inherit" component={NavLink} to="signup">
                  Sign Up
                </Button>
              )}
              {user.email && (
                <AccountCircle onClick={handleClick} sx={{fontSize: 40, marginLeft: 5}} />
              )}
            </Toolbar>
          </AppBar>
        </Box>
      </CssBaseline>
    </Fragment>
  );
};

export default NavBar;
