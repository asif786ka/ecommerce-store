import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import { useGetProductByIdQuery } from '../store/productApi';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Styled components for the ProductDetails component
const Container = styled.div`
  padding: 20px;
`;

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { data: product, error, isLoading } = useGetProductByIdQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching product details</div>;

  const handleAddToCart = () => {
    dispatch(addItem({ id: product.product_id, title: product.product_title, price: product.product_price, quantity: 1 }));
  };

  return (
    <Container>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h1>{product.product_title}</h1>
        <p>{product.product_price}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </motion.div>
    </Container>
  );
};

export default ProductDetails;
