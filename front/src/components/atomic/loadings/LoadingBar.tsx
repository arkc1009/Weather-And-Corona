import React from 'react';
import styled, { keyframes } from 'styled-components';
import { AtomicProps } from '../types/AtomicTypes';

const Animate = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const Container = styled.div<AtomicProps>`
  width: ${(props) => (props.w ? props.w : '90%')};
  height: ${(props) => (props.h ? props.h : '5px')};

  background-color: rgb(220, 220, 220);
  border-radius: 9px;

  overflow: hidden;
`;

const Content = styled.div<AtomicProps>`
  width: 100%;
  height: 100%;

  background-color: rgb(120, 120, 120);
  border-radius: 9px;

  animation: ${Animate} 1s ease-in-out infinite;
`;

const LoadingBar: React.FC<AtomicProps> = ({ w, h }) => {
  return (
    <Container w={w} h={h}>
      <Content />
    </Container>
  );
};

export default LoadingBar;
