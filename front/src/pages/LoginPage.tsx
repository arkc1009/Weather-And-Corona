import React from 'react';
import styled from 'styled-components';
import LoginForm from '../components/organisms/login/LoginForm';

const Container = styled.div`
  width: 100%;

  padding-top: 4rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginPage: React.FC = () => {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
