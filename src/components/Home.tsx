import React from 'react';
import { useGetProductsQuery } from '../store/productApi';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Styled components for the Home component
const Container = styled.div`
  padding: 20px;
`;

const Banner = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
  padding: 20px;
  text-align: center;
  margin-bottom: 20px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const ProductCard = styled(motion.div)`
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  text-align: center;
`;

const Home: React.FC = () => {
  const { data, error, isLoading } = useGetProductsQuery({});

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching products</div>;

  return (
    <Container>
      <Banner>Big Horizontal Scrollable Banners</Banner>
      <ProductGrid>
        {data && data.map((product: any) => (
          <ProductCard
            key={product.product_id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>{product.product_title}</h3>
            <p>{product.product_price}</p>
          </ProductCard>
        ))}
      </ProductGrid>
    </Container>
  );
};

export default Home;
