import React from 'react';
import styled from 'styled-components';
import { Margin } from '../components/atomic/Margin';
import Title from '../components/atomic/Title';
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
      <Title>로그인</Title>
      <Margin h='2rem'/>
      
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
