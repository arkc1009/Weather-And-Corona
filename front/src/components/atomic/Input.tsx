import styled from 'styled-components';
import { AtomicProps } from './types/AtomicTypes';

const Input = styled.input<AtomicProps>`
  width: ${(props) => (props.w ? props.w : '14rem')};
  height: ${(props) => (props.h ? props.h : '2rem')};

  padding: 0 0.5rem;

  border: 2px solid #333;
  border-radius: 5px;

  outline: none;

  &:focus {
    border: 2px solid #f58840;
  }
`;

export default Input;
