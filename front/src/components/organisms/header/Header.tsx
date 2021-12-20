import React from 'react';
import styled from 'styled-components';
import Title from '../../atomic/Title';

const Container = styled.div`
  width: 100vw;
  height: 60px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #333;
`;

const Header: React.FC = () => {
  return (
    <Container>
      <Title color="#f4f5f6">Weather And Corona</Title>
    </Container>
  );
};

export default Header;
