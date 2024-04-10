import {useState, useRef, useEffect} from 'react';
import useFetch from '../hooks/useFetch';
import {useUser} from '../hooks/useUser';
import {useLocation} from 'react-router-dom';
//Component imports
import StripePayment from './StripePayment';
//MUI Imports
import {
  Grid,
  Typography,
  TextField,
  Box,
  Container,
  Avatar,
  Switch,
  FormControlLabel,
  Button,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

export default function AddressForm() {
  const {user} = useUser();
  const fetchData = useFetch();
  const projectID = useLocation().pathname.split('/')[2];
  const [checked, setChecked] = useState(false);
  const [stage, setStage] = useState(0);
  const [gift, setGift] = useState(false);
  const [inputFields, SetInputFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address1: '',
    address2: '',
    town: '',
    country: '',
    postcode: '',
    telephone: '',
  });

  const [inputProduct, setInputProduct] = useState({
    price: 0,
    quantity: 1,
    total: 0,
  });

  const [cart, setCart] = useState({
    name: '',
    price: 0,
    productOwner: '',
    description: 'SingStarter Payment',
    quantity: 1,
  });

  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    address1: false,
    address2: false,
    town: false,
    country: false,
    postcode: false,
  });

  const populateInputFields = async inputs => {
    SetInputFields({
      firstName: inputs?.firstName || '',
      lastName: inputs?.lastName || '',
      email: inputs?.email || '',
      address1: inputs?.address1 || '',
      address2: inputs?.address2 || '',
      town: inputs?.town || '',
      country: inputs?.country || '',
      postcode: inputs?.postcode || '',
      telephone: inputs?.telephone || '',
    });
  };

  const insertAddress = async () => {
    const result = await fetchData('/api/users', 'GET', undefined, user.accessToken);
    if (result.ok) {
      try {
        console.log('setting user deets');
        populateInputFields(result.data);
      } catch (err) {
        console.error('failed to get user details');
      }
    }
  };

  useEffect(() => {
    if (checked) {
      insertAddress();
    } else if (!checked) {
      populateInputFields();
    }
  }, [checked]);

  const handleChange = e => {
    if (!e.target.validity.valid) {
      setError({...error, [e.target.name]: true});
    } else {
      setError({...error, [e.target.name]: false});
    }
    SetInputFields({...inputFields, [e.target.name]: e.target.value});
  };

  const handleSwitch = e => {
    setChecked(prevState => e.target.checked);
  };

  const handleAddressSubmit = async e => {
    e.preventDefault();
    //put the variables into an object if they exist
    const shippingAddress = {
      firstName: inputFields.firstName,
      lastName: inputFields.lastName,
      email: inputFields.email,
      password: inputFields.password,
      address1: inputFields.address1,
      address1: inputFields?.address1,
      town: inputFields.town,
      country: inputFields.country,
      postcode: inputFields?.postcode,
    };
    //set to local session storage
    sessionStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
    console.log('saved shipping details top local storage and state moving to stage 2');
    setStage(1);
  };

  const handleGift = e => {
    setGift(prevState => e.target.checked);
  };

  const updateTotal = () => {
    var tmpTotal = cart.quantity * cart.price;
    if (gift) tmpTotal += 5;
    setInputProduct(prevState => ({...prevState, total: tmpTotal}));
  };

  const getProjectDetails = async () => {
    try {
      const result = await fetchData(
        '/api/projects?projectID=' + projectID,
        'GET',
        undefined,
        user.accessToken
      );
      console.log(result);
      setCart({
        ...cart,
        name: result.data[0].title,
        price: result.data[0].productCost,
        productOwner: result.data[0].owner,
      });
    } catch (err) {
      console.error('failed to get project details');
    }
    updateTotal();
  };

  useEffect(() => {
    if (stage === 1) {
      getProjectDetails();
    }
  }, [stage]);

  useEffect(() => {
    updateTotal();
  }, [cart, gift]);

  const handleQtyChange = e => {
    // setInputProduct(prevState => e.target.value);
    const tmpQuantity = Number(e.target.value);
    setCart({...cart, [e.target.name]: tmpQuantity});
    updateTotal();
  };

  const handleOrderSubmit = async e => {
    e.preventDefault();
    console.log();
    sessionStorage.setItem('cart', JSON.stringify(cart));
    setStage(2);
  };

  if (stage === 0) {
    return (
      <>
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
            {/* {user && <p>{user.accessToken}</p>} */}
            <Typography component="h1" variant="h5">
              Shipping Address
            </Typography>
            <Box component="form" onSubmit={handleAddressSubmit} sx={{mt: 1}}>
              <Grid container spacing={2}>
                <Grid item sm={12}>
                  <FormControlLabel
                    sx={{pl: 2, pt: 2}}
                    checked={checked}
                    onChange={handleSwitch}
                    control={<Switch />}
                    label="Use my default address"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    value={inputFields.firstName}
                    onChange={handleChange}
                    autoFocus
                    error={error.firstName}
                    inputProps={{pattern: '[A-Za-z]+'}}
                    helperText={error.firstName}
                    disabled={checked ? true : false}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={inputFields.lastName}
                    onChange={handleChange}
                    inputProps={{pattern: '[A-Za-z]+'}}
                    error={error.lastName}
                    helperText={error.lastName}
                    autoComplete="family-name"
                    disabled={checked ? true : false}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="street"
                    name="address1"
                    required
                    fullWidth
                    id="address1"
                    label="Unit #/Block and Street"
                    value={inputFields.address1}
                    onChange={handleChange}
                    autoFocus
                    inputProps={{pattern: '[A-Za-z0-9 ]+'}}
                    error={error.address1}
                    helperText={error.address1 ? 'Please enter Letters and Numbers Only' : ''}
                    disabled={checked ? true : false}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="address2"
                    label="Address Line 2 (Optional)"
                    name="address2"
                    value={inputFields.address2}
                    inputProps={{pattern: '[A-Za-z0-9 ]+'}}
                    error={error.address2}
                    helperText={error.address2 ? 'Please enter Letters and Numbers Only' : ''}
                    onChange={handleChange}
                    disabled={checked ? true : false}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="town"
                    name="town"
                    required
                    fullWidth
                    id="town"
                    label="Town or City"
                    value={inputFields.town}
                    onChange={handleChange}
                    inputProps={{pattern: '[A-Za-z]+'}}
                    error={error.town}
                    helperText={error.town ? 'Please enter Letters Only' : ''}
                    autoFocus
                    disabled={checked ? true : false}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="country"
                    name="country"
                    required
                    fullWidth
                    id="country"
                    label="Country"
                    value={inputFields.country}
                    inputProps={{pattern: '[A-Za-z]+'}}
                    error={error.country}
                    helperText={error.country ? 'Please enter Letters Only' : ''}
                    onChange={handleChange}
                    autoFocus
                    disabled={checked ? true : false}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="postcode"
                    label="Postcode/Zip Code"
                    name="postcode"
                    inputProps={{pattern: '[A-Za-z0-9]+'}}
                    error={error.postcode}
                    helperText={error.postcode ? 'Please enter Letters and Numbers Only' : ''}
                    value={inputFields.postcode}
                    onChange={handleChange}
                    disabled={checked ? true : false}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="telephone"
                    label="Telephone (Optional)"
                    name="telephone"
                    value={inputFields.telephone}
                    inputProps={{pattern: '[0-9+]+'}}
                    onChange={handleChange}
                    error={error.telephone}
                    helperText={error.telephone ? 'Please enter Numbers and + Only' : ''}
                  />
                </Grid>
                <Grid item sm={12}>
                  <Button type="submit" fullWidth variant="outlined" sx={{mt: 3, mb: 2}}>
                    Next: Order Details
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </>
    );
  }
  if (stage === 1) {
    return (
      <>
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
            <Box component="form" onSubmit={handleOrderSubmit} sx={{mt: 1}}>
              <Grid container spacing={2}>
                <Grid item sm={12}>
                  <FormControlLabel
                    sx={{pl: 2, pt: 2}}
                    checked={gift}
                    onChange={handleGift}
                    control={<Switch />}
                    label="This order is a gift"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="Project"
                    required
                    fullWidth
                    id="project"
                    label="Project"
                    value={cart.name}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="product"
                    label="Product"
                    name="product"
                    value="Default Pledge Product"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="number"
                    name="quantity"
                    required
                    fullWidth
                    id="quantity"
                    label="Quantity Required"
                    value={cart.quantity}
                    onChange={handleQtyChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="quantity"
                    required
                    fullWidth
                    id="price"
                    label="Unit Price"
                    value={cart.price}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="total"
                    required
                    fullWidth
                    id="total"
                    label="Total Order Value"
                    value={inputProduct.total}
                  />
                </Grid>

                <Grid item sm={12}>
                  <Button type="submit" fullWidth variant="outlined" sx={{mt: 3, mb: 2}}>
                    Next: Payment
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </>
    );
  }
  if (stage === 2) {
    return <StripePayment product={cart} address={inputFields} projectID={projectID} />;
  }
}
