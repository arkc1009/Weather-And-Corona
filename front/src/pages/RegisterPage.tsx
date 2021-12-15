import React from 'react';
import styled from 'styled-components';
import RegisterForm from '../components/organisms/RegisterForm';

const Container = styled.div`
  width: 100%;

  padding-top: 4rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RegisterPage: React.FC = () => {
  return (
    <Container>
      <RegisterForm />
    </Container>
  );
};

export default RegisterPage;
