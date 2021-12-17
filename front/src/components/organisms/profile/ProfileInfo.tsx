import React from 'react';
import { Edit2 } from 'react-feather';
import styled from 'styled-components';
import { useProfile } from '../../../hooks/useProfile';
import Bar from '../../atomic/Bar';
import SubmitButton from '../../atomic/buttons/SubmitButton';
import ProfileEmail from '../../molecules/profiles/ProfileEmail';
import ProfileLocation from '../../molecules/profiles/ProfileLocation';
import ProfileName from '../../molecules/profiles/ProfileName';

const Container = styled.div`
  padding: 0 1rem;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem 0.5rem;
`;

interface ProfileInfoProps {
  openModal: () => void;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ openModal }) => {
  const { profile } = useProfile();
  const { name, email, location } = profile;

  return (
    <Container>
      <Wrap>
        <ProfileName name={name} />
        <SubmitButton w="3rem" h="1rem" onClick={openModal}>
          <Edit2 />
        </SubmitButton>
      </Wrap>
      <Bar w="95%" />

      <Wrap>
        <ProfileEmail email={email} />
        <ProfileLocation location={location} />
      </Wrap>
      <Bar w="95%" />
    </Container>
  );
};

export default ProfileInfo;
