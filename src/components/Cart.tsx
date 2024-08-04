import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { removeItem } from '../store/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

// Styled components for the Cart component
const Container = styled.div`
  padding: 20px;
`;

const CartItem = styled(motion.div)`
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  margin-bottom: 10px;
`;

const Cart: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id: string) => {
    dispatch(removeItem(id));
  };

  return (
    <Container>
      <h2>Shopping Cart</h2>
      <AnimatePresence>
        {items.map(item => (
          <CartItem
            key={item.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <h3>{item.title}</h3>
            <p>{item.price}</p>
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </CartItem>
        ))}
      </AnimatePresence>
    </Container>
  );
};

export default Cart;
