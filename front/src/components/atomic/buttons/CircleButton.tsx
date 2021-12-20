import styled from 'styled-components';
import { AtomicProps } from '../types/AtomicTypes';

const CircleButton = styled.button<AtomicProps>`
  width: ${(props) => (props.w ? props.w : '4rem')};
  height: ${(props) => (props.h ? props.h : '4rem')};

  border: none;
  border-radius: 50px;
  background: linear-gradient(145deg, #333, #383838);
  box-shadow: 5px 5px 8px #9b9b9b, -5px -5px 8px #ffffff;

  cursor: pointer;
`;

export default CircleButton;
