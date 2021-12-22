import React, { useMemo } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import Span from '../atomic/Spans/Span';
import { RenderAnimate } from '../../Animate';
import { ModalContentTypes } from './types/ModalContentTypes';
import CurrentMap from '../organisms/map';
import ProfileIntroUpdate from '../organisms/profile/ProfileIntroUpdate';
import ProfileInfoUpdate from '../organisms/profile/ProfileInfoUpdate';
import FormLocationButtons from '../molecules/form/FormLocationButtons';
import { useModal } from '../../hooks/useModal';

const Container = styled(Modal)<{ isSmall: boolean }>`
  width: 90vw;
  height: ${(props) => (props.isSmall ? '40vh' : '70vh')};
  padding-top: 4rem;
  z-index: 99;

  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${RenderAnimate} 150ms;

  border-radius: 5px;
  background-color: #eee;

  outline: none;
`;

const UnderLineSpan = styled(Span)`
  margin-top: 1rem;
  text-decoration: underline;
  cursor: pointer;
`;

const InitialModal: React.FC = () => {
  const { modalState, isOpen, closeModal } = useModal();

  const contents: ModalContentTypes = useMemo(
    () => ({
      selectLocation: <FormLocationButtons />,
      viewMap: <CurrentMap />,
      profileInfo: <ProfileInfoUpdate />,
      profileIntro: <ProfileIntroUpdate />,
    }),
    [],
  );

  return (
    <Container
      isSmall={modalState === 'selectLocation'}
      isOpen={isOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
    >
      {modalState && contents[modalState]}

      <UnderLineSpan onClick={closeModal}>뒤로가기</UnderLineSpan>
    </Container>
  );
};

export default InitialModal;
