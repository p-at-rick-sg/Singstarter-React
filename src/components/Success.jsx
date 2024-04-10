import {useLocation, useNavigate} from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import {useEffect, useState} from 'react';
import {useUser} from '../hooks/useUser';
//MUI Imports
import {Box, Button, Typography, Grid, Container, Avatar} from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';

const Success = () => {
  const {user} = useUser();
  const fetchData = useFetch();
  const location = useLocation();
  const navigate = useNavigate();
  const [orderID, setOrderID] = useState();

  const getSuccessDetails = async ID => {
    try {
      const body = {sessionID: ID};
      const sessionDetails = await fetchData(
        '/api/payment/success',
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
    location.search.split('=')[1];
    if (location.search.split('=')[1]) {
      getSuccessDetails(location.search.split('=')[1]);
    }
  }, [location]);

  return (
    <>
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            height: '75vh',
            width: '100vw',
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Grid container spacing={2} justify="center">
            <Grid item sm={12}>
              <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
                <PaidIcon />
              </Avatar>
            </Grid>
            <Grid item sm={12}>
              <Typography component="h1" variant="h2">
                Order Successfully Placed
              </Typography>
            </Grid>
            <Grid item sm={12}>
              <Typography component="h1" variant="h5">
                This small business really appreciates your support
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

export default Success;
