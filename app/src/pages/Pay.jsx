import StripeCheckOut from 'react-stripe-checkout';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const KEY =
  'pk_test_51KeL9nEI9dY11rlBpHAk8mYKpMVvf7NfzDIZKbEwlE7jPUsJYU3rLo3bC3pa33iywySy2OExgbMdgo6LIQjFrUTj00DWyXnlO4';
// const BASE_URL = "http://localhost:5000/api/";
const BASE_URL = "https://ecommerce-api-server-1.herokuapp.com/api/"

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

export const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await axios.post(
          BASE_URL,
          {
            tokenId: stripeToken.id,
            amount: 2000,
          }
        );
        history('/success');
      } catch (err) {}
    };
    stripeToken && makeRequest();
  }, [stripeToken]);

  const onToken = (token) => {
    setStripeToken(token);
  };
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {stripeToken ? (
        <span>Processing. Please wait...</span>
      ) : (
        <StripeCheckOut
          name='Lama Shop'
          image='https://avatars.githubusercontent.com/u/1486366?v=4'
          billingAddress
          shippingAddress
          description={`Your total is $${2000}`}
          amount={2000}
          token={onToken}
          stripeKey={KEY}
        >
          <Button>CHECKOUT NOW</Button>
        </StripeCheckOut>
      )}
    </div>
  );
};
