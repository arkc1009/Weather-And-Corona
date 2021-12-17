import React from 'react';
import { Edit2 } from 'react-feather';
import styled from 'styled-components';
import SubmitButton from '../../atomic/buttons/SubmitButton';
import Span from '../../atomic/Spans/Span';

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 0.5rem;
`;

const ProfileIntroHeader: React.FC = () => {
  return (
    <Container>
      <Span fSize="1.2rem">내정보</Span>
      <SubmitButton w="3rem" h="1rem">
        <Edit2 />
      </SubmitButton>
    </Container>
  );
};

export default ProfileIntroHeader;
