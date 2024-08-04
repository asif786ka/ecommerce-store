import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Contact: React.FC = () => {
  return (
    <Container>
      <h1>Contact Page</h1>
      <p>Get in touch with us for any queries or support.</p>
      {/* Add a contact form or contact details as needed */}
    </Container>
  );
};

export default Contact;
