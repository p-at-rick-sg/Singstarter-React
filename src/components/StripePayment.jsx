import {loadStripe} from '@stripe/stripe-js';
import useFetch from '../hooks/useFetch';
import {useEffect, useState} from 'react';
import {useUser} from '../hooks/useUser';

//MUI imports
import {Container, Button, Typography, Box, Grid, Avatar} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const StripePayment = ({product, address, projectID}) => {
  const fetchData = useFetch();
  const {user} = useUser();
  const [orderID, setOrderID] = useState(null);

  const uploadOrder = async () => {
    const newOrder = {...product, ...address};
    const totalValue = newOrder.quantity * newOrder.price;
    newOrder.totalValue = totalValue;
    newOrder.userID = sessionStorage.getItem('id');
    newOrder.paymentID = 'pending';
    delete newOrder['description'];
    delete newOrder['email'];
    delete newOrder['name'];
    delete newOrder['price'];
    delete newOrder['firstName'];
    delete newOrder['lastName'];
    delete newOrder['quantity'];
    delete newOrder['productOwner'];
    newOrder.projectID = projectID;
    const result = await fetchData('/api/projects/orders', 'PUT', newOrder, user.accessToken);
    console.log('response from the new order call: ', result.data._id);
    setOrderID(result.data._id);
  };
  useEffect(() => {
    uploadOrder();
  }, [product]);

  //do the stripe stuff
  const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY;
  const BACKEND = import.meta.env.VITE_SERVER;

  const makePayment = async () => {
    const stripe = await loadStripe(STRIPE_PUB_KEY);
    product.orderID = orderID;
    console.log('here is the product object:', product);
    const body = {product};
    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await fetch(BACKEND + '/api/payment/create-checkout-session', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });
    const session = await response.json();
    const result = stripe.redirectToCheckout({sessionId: session.id});
    console.log(result);
    if (result.error) {
      console.error(result.error);
    }
  };

  return (
    <>
      <h1>Stripe Payment Component</h1>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
            <HomeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Your Order Details
          </Typography>
          <Box sx={{mt: 1}}>
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <Button onClick={makePayment} size="medium">
                  Pay S${product.price * product.quantity} Now
                </Button>
              </Grid>
              <Grid item sm={12}>
                <Button size="small" sx={{color: 'grey'}}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default StripePayment;
