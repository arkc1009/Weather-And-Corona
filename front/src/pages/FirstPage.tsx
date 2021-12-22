import React from 'react';
import styled from 'styled-components';
import SubmitButton from '../components/atomic/buttons/SubmitButton';
import NLink from '../components/atomic/NLink';

const Container = styled.div`
  width: 100vw;
  height: 80vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding-top: 4rem;
`;

const FirstPage: React.FC = () => {
  return (
    <Container>
      <NLink to="/login">
        <SubmitButton>로그인</SubmitButton>
      </NLink>

      <NLink to="/register">
        <SubmitButton>회원가입</SubmitButton>
      </NLink>
    </Container>
  );
};

export default FirstPage;
