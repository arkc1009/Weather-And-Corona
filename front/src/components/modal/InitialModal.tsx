import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import Span from '../atomic/Spans/Span';
import { Margin } from '../atomic/Margin';
import { RenderAnimate } from '../../Animate';

const Container = styled(Modal)`
  width: 90vw;
  height: 70vh;
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
  text-decoration: underline;
  cursor: pointer;
`;

interface InitialModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const InitialModal: React.FC<InitialModalProps> = ({ isOpen, closeModal, children }) => {
  return (
    <Container isOpen={isOpen} onRequestClose={closeModal} ariaHideApp={false}>
      {children}
      <Margin h="1rem" />
      <UnderLineSpan onClick={closeModal}>뒤로가기</UnderLineSpan>
    </Container>
  );
};

export default InitialModal;
