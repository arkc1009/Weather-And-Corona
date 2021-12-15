import styled from 'styled-components';

export const Margin = styled.div<{ w?: string; h?: string }>`
  width: ${(props) => props.w};
  height: ${(props) => props.h};
`;
