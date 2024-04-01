import {useState} from 'react';
import {useLocation} from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';

//MUI imports
import {Card, CardContent, CardActions, CardMedia, Button, Typography} from '@mui/material';

const StripePayment = () => {
  console.log('making payment function running');
  const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY;
  const BACKEND = import.meta.env.VITE_SERVER;
  const [product, setProduct] = useState({
    name: 'Test Product',
    price: 100,
    productOwner: 'test owner',
    description: 'payment testing - new prodcut description',
    quantity: 1,
  });

  const makePayment = async () => {
    const stripe = await loadStripe(STRIPE_PUB_KEY);
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

    if (result.error) {
      console.error(result.error);
    }
  };

  return (
    <>
      <h1>Stripe Payment Component</h1>
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
            Pay S${product.price} Now
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
