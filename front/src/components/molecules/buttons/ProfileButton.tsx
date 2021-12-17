import React, { useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { User } from 'react-feather';
import CircleButton from '../../atomic/buttons/CircleButton';

const Animate = keyframes`
  0% {
    transform: translateY(0px);
  }
  30%, 100% {
    transform: translateY(10px);
  }
`;

const Container = styled.div`
  position: fixed;
  bottom: 1.5rem;
  right: 1rem;

  animation: ${Animate} 1500ms ease-in-out infinite alternate;
  & svg {
    color: white;
  }
`;

const ProfileButton: React.FC = () => {
  const navigate = useNavigate();
  const onClickButton = useCallback(() => {
    navigate('./profile');
  }, [navigate]);

  return (
    <Container>
      <CircleButton onClick={onClickButton}>
        <User />
      </CircleButton>
    </Container>
  );
};

export default ProfileButton;
