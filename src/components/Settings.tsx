import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Settings: React.FC = () => {
  return (
    <Container>
      <h1>Settings Page</h1>
      <p>Here you can update your settings.</p>
      {/* Add more settings fields and functionality as needed */}
    </Container>
  );
};

export default Settings;
