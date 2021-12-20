import styled from 'styled-components';
import { AtomicProps } from './types/AtomicTypes';

const Title = styled.h2<AtomicProps>`
  font-size: ${(props) => (props.fSize ? props.fSize : 'inital')};
  font-weight: ${(props) => (props.fWeight ? props.fWeight : 'inital')};
  color: ${(props) => (props.color ? props.color : '#14279b')};

  margin: 0;
`;

export default Title;
