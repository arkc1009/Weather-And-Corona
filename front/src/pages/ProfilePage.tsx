import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/LoginManage';
import ProfileInfo from '../components/organisms/profile/ProfileInfo';
import ProfileIntro from '../components/organisms/profile/ProfileIntro';
import SubmitButton from '../components/atomic/buttons/SubmitButton';
import { useModal } from '../hooks/useModal';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100vw;
  height: 90vh;
  padding: 1rem 0;
`;

const LogoutButton = styled(SubmitButton)`
  align-self: center;
  margin: 1rem 0;
`;

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();

  const onClickLogOut = useCallback(() => {
    logoutUser();
    navigate('/');
  }, []);

  return (
    <Container>
      <ProfileInfo openModal={() => openModal('profileInfo')} />

      <ProfileIntro openModal={() => openModal('profileIntro')} />

      <LogoutButton onClick={onClickLogOut}>로그아웃</LogoutButton>
    </Container>
  );
};

export default ProfilePage;
