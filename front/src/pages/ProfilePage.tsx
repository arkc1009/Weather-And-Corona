import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Margin } from '../components/atomic/Margin';
import InitialModal from '../components/modal/InitialModal';
import ProfileInfo from '../components/organisms/profile/ProfileInfo';
import ProfileIntro from '../components/organisms/profile/ProfileIntro';
import ProfileInfoUpdate from '../components/organisms/profile/ProfileInfoUpdate';
import ProfileIntroUpdate from '../components/organisms/profile/ProfileIntroUpdate';

const Container = styled.div`
  width: 100vw;
`;

const ProfilePage: React.FC = () => {
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
