import {useLocation, useNavigate} from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import {useEffect, useState} from 'react';
import {useUser} from '../hooks/useUser';
//MUI Imports
import {Box, Button, Typography, Grid, Container, Avatar} from '@mui/material';
import SmsFailedOutlinedIcon from '@mui/icons-material/SmsFailedOutlined';

const Cancel = () => {
  const {user} = useUser();
  const fetchData = useFetch();
  const location = useLocation();
  const navigate = useNavigate();

  const getCancelDetails = async ID => {
    try {
      const body = {sessionID: ID};
      const sessionDetails = await fetchData(
        '/api/payment/cancel',
        'PATCH',
        body,
        user.accessToken
      );
      console.log(sessionDetails);
      if (sessionDetails) {
        sessionStorage.removeItem('cart');
        sessionStorage.removeItem('shippingAddress');
      }
    } catch (err) {
      console.error('failed to get order details: ', err.message);
    }
  };

  useEffect(() => {
    const path = location.search.split('=')[1];
    if (path) {
      getCancelDetails(location.search.split('=')[1]);
    }
  }, [location]);

  return (
    <>
      <Container
        component="main"
        maxWidth="md"
        sx={{
          height: '75vh',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Grid container spacing={2} justify="center" alignItems="center">
            <Grid item sm={12} justify="center" alignItems="center">
              <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
                <SmsFailedOutlinedIcon />
              </Avatar>
            </Grid>
            <Grid item sm={12}>
              <Typography component="h1" variant="h2">
                Order Cancelled
              </Typography>
            </Grid>
            <Grid item sm={12}>
              <Typography component="h1" variant="h5">
                Please go back to the project to try again
              </Typography>
            </Grid>
            <Grid item sm={12}>
              <Button onClick={() => navigate('/')}>Return Home</Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Cancel;
