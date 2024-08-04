import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import styled from 'styled-components';

// Load Stripe public key
const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY');

// Styled components for the Checkout component
const Container = styled.div`
  padding: 20px;
`;

const Checkout: React.FC = () => {
  return (
    <Container>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </Container>
  );
};

export default Checkout;
