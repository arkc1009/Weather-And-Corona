import styled from 'styled-components';
import { AtomicProps } from '../types/AtomicTypes';

const SubmitButton = styled.button<AtomicProps>`
  width: ${(props) => (props.w ? props.w : '9rem')};
  height: ${(props) => (props.h ? props.h : '3rem')};

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1rem;

  font-size: ${(props) => (props.fSize ? props.fSize : '1rem')};

  color: #e6e6e6;
  background-color: #5c7aea;

  border: none;
  border-radius: 5px;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
  &:active {
    background-color: #3d56b2;
  }
`;

export default SubmitButton;
