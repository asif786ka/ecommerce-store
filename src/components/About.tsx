import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const About: React.FC = () => {
  return (
    <Container>
      <h1>About Page</h1>
      <p>Learn more about our eCommerce store and its mission.</p>
      {/* Add more about content as needed */}
    </Container>
  );
};

export default About;
