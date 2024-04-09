import {useLocation} from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import {useEffect, useState} from 'react';
import {useUser} from '../hooks/useUser';
//MUI Imports
import {Box, Button, Typography, Grid} from '@mui/material';

const Success = () => {
  const {user} = useUser();
  const fetchData = useFetch();
  const location = useLocation();
  console.log(location);

  const getSuccessDetails = async ID => {
    const body = {sessionID: ID};
    const sessionDetails = await fetchData('/api/payment/success', 'PATCH', body, user.accessToken);
    console.log(sessionDetails);
  };

  useEffect(() => {
    location.search.split('=')[1];
    if (location.search.split('=')[1]) {
      getSuccessDetails(location.search.split('=')[1]);
    }
  }, [location]);

  return (
    <>
      <Box>
        <Grid container>
          <Typography variant="h2">Thanks for your support!</Typography>
          <Typography variant="h4">Your Payment was Successful</Typography>
          <p>This small business really appreciates your support :-)</p>
          <Button>Return Home</Button>
        </Grid>
      </Box>
    </>
  );
};

export default Success;
