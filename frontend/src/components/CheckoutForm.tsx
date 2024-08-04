import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import axios from 'axios';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Styled components for the CheckoutForm component
const Form = styled(motion.form)`
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)!,
    });

    if (!error && paymentMethod) {
      const { id } = paymentMethod;
      try {
        const response = await axios.post('/api/charge', {
          amount: calculateTotal(cartItems),
          id,
        });

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const calculateTotal = (items: any[]) => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <Form
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
    >
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </Form>
  );
};

export default CheckoutForm;
