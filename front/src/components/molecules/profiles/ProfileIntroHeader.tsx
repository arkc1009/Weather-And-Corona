import React from 'react';
import { Edit2 } from 'react-feather';
import styled from 'styled-components';
import SubmitButton from '../../atomic/buttons/SubmitButton';
import Title from '../../atomic/Title';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProfileIntroHeader: React.FC<{ openModal: () => void }> = ({ openModal }) => {
  return (
    <Container>
      <Title>내정보</Title>
      <SubmitButton w="3rem" h="1rem" onClick={openModal}>
        <Edit2 />
      </SubmitButton>
    </Container>
  );
};

export default ProfileIntroHeader;
