import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SubmitButton from '../../atomic/buttons/SubmitButton';
import { Margin } from '../../atomic/Margin';

const Container = styled.div`
  width: 80%;
  min-height: 50px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  background-color: #fff;
  border-radius: 9px;
  box-shadow: 1px 1px 1px rgb(220, 220, 220);
  padding: 2rem 1rem 1rem 1rem;
`;

const NotLocation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      위치 정보를 등록해주세요! <Margin h="1rem" />
      <SubmitButton onClick={() => navigate('/main/profile')}>등록하러 가기</SubmitButton>
    </Container>
  );
};

export default NotLocation;
