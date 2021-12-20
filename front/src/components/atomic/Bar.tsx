import React from 'react';
import styled from 'styled-components';
import { AtomicProps } from './types/AtomicTypes';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BarContent = styled.div<AtomicProps>`
  width: ${(props) => (props.w ? props.w : '90%')};
  height: ${(props) => (props.h ? props.h : '1px')};

  background-color: rgb(120, 120, 120);
  opacity: 0.2;
`;

const Bar: React.FC<AtomicProps> = ({ w, h }) => {
  return (
    <Container>
      <BarContent w={w} h={h} />
    </Container>
  );
};

export default Bar;
