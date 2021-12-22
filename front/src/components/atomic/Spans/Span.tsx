import styled from 'styled-components';
import { AtomicProps } from '../types/AtomicTypes';

const Span = styled.span<AtomicProps>`
  margin: ${(props) => props.mg && props.mg};

  font-size: ${(props) => (props.fSize ? props.fSize : '1rem')};
  font-weight: ${(props) => (props.fWeight ? props.fWeight : 'normal')};

  color: ${(props) => (props.color ? props.color : 'intial')};
`;

export default Span;
