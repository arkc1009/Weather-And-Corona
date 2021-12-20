import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Margin } from '../components/atomic/Margin';
import Title from '../components/atomic/Title';
import InitialModal from '../components/modal/InitialModal';
import ProfileInfo from '../components/organisms/profile/ProfileInfo';
import ProfileIntro from '../components/organisms/profile/ProfileIntro';
import ProfileInfoUpdate from '../components/organisms/profile/ProfileInfoUpdate';
import ProfileIntroUpdate from '../components/organisms/profile/ProfileIntroUpdate';
import Span from '../components/atomic/Spans/Span';

const Container = styled.div`
  width: 100vw;
`;

const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
`;

const UnderLineSpan = styled(Span)`
  text-decoration: underline;
  cursor: pointer;
`;

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [modalState, setModalState] = useState({
    profileInfo: false,
    profileIntro: false,
  });

  const closeModal = useCallback(
    (modal: string) => {
      setModalState((prevState) => ({ ...prevState, [modal]: false }));
    },
    [setModalState],
  );

  const openModal = useCallback(
    (modal: string) => {
      setModalState((prevState) => ({ ...prevState, [modal]: true }));
    },
    [setModalState],
  );

  return (
    <Container>
      <Margin h="1rem" />
      <TitleWrap>
        <Title>프로필</Title>
        <UnderLineSpan fWeight="500" onClick={() => navigate('/main')}>
          뒤로가기
        </UnderLineSpan>
      </TitleWrap>

      <ProfileInfo openModal={() => openModal('profileInfo')} />
      <Margin h="1rem" />
      
      <ProfileIntro openModal={() => openModal('profileIntro')} />

      <InitialModal isOpen={modalState.profileInfo} closeModal={() => closeModal('profileInfo')}>
        <ProfileInfoUpdate closeModal={() => closeModal('profileInfo')} />
      </InitialModal>

      <InitialModal isOpen={modalState.profileIntro} closeModal={() => closeModal('profileIntro')}>
        <ProfileIntroUpdate closeModal={() => closeModal('profileIntro')} />
      </InitialModal>
    </Container>
  );
};

export default ProfilePage;
