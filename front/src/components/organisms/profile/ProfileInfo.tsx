import React from 'react';
import { Edit2 } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useProfile } from '../../../hooks/useProfile';
import Bar from '../../atomic/Bar';
import SubmitButton from '../../atomic/buttons/SubmitButton';
import Span from '../../atomic/Spans/Span';
import Title from '../../atomic/Title';
import ProfileEmail from '../../molecules/profiles/ProfileEmail';
import ProfileLocation from '../../molecules/profiles/ProfileLocation';
import ProfileName from '../../molecules/profiles/ProfileName';

const Container = styled.div`
  padding: 0 1rem;
  margin-bottom: 1.5rem;
`;

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  padding: 1rem 0.5rem;
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
`;

const UnderLineSpan = styled(Span)`
  text-decoration: underline;
  cursor: pointer;
`;

interface ProfileInfoProps {
  openModal: () => void;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ openModal }) => {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const { name, email, location } = profile;

  return (
    <Container>
      <Wrap>
        <TitleWrap>
          <Title>프로필</Title>

          <SubmitButton w="3rem" h="1rem" mg="0 0 0 1rem" onClick={openModal}>
            <Edit2 />
          </SubmitButton>
        </TitleWrap>

        <UnderLineSpan fWeight="500" onClick={() => navigate('/main')}>
          뒤로가기
        </UnderLineSpan>
      </Wrap>

      <Wrap>
        <ProfileName name={name} />
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
