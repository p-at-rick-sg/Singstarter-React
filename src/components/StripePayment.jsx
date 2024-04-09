import {loadStripe} from '@stripe/stripe-js';
import useFetch from '../hooks/useFetch';
import {useEffect, useState} from 'react';
import {useUser} from '../hooks/useUser';

//MUI imports
import {Card, CardContent, CardActions, CardMedia, Button, Typography} from '@mui/material';

const StripePayment = ({product, address}) => {
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
    newOrder.projectID = newOrder.productOwner;
    delete newOrder['productOwner'];
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
      <h1>Stripe Payment Component{user && user.id}</h1>
      <Card sx={{maxWidth: 345}}>
        <CardMedia
          sx={{height: 140}}
          image="https://storage.googleapis.com/ga-project-3-assets/payment-image.jpg"
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={makePayment} size="medium">
            Pay S${product.price * product.quantity} Now
          </Button>
          <Button size="small" sx={{color: 'grey'}}>
            Cancel
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default StripePayment;
