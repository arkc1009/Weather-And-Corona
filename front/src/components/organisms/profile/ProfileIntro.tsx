import React from 'react';
import styled from 'styled-components';
import ProfileIntroContent from '../../molecules/profiles/ProfileIntroContent';
import ProfileIntroHeader from '../../molecules/profiles/ProfileIntroHeader';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0 1.5rem;
  margin-bottom: 1rem;
`;

const ProfileIntro: React.FC<{ openModal: () => void }> = ({ openModal }) => {
  return (
    <Container>
      <ProfileIntroHeader openModal={openModal} />

      <ProfileIntroContent />
    </Container>
  );
};

export default ProfileIntro;
