import styled, { css } from 'styled-components';
import { AtomicProps } from './types/AtomicTypes';

interface LabelProps extends AtomicProps {
  isAbs?: boolean;
}

const Label = styled.label<LabelProps>`
  font-size: ${(props) => (props.fSize ? props.fSize : '1.2rem')};
  font-weight: bold;

  color: #14279b;

  ${(props) =>
    props.isAbs &&
    css`
      &::after {
        content: '*';
        color: rgb(220, 0, 0);
      }
    `}
`;

export default Label;
