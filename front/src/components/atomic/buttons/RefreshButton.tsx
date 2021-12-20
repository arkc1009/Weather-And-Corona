import React from 'react';
import { RefreshCw } from 'react-feather';
import styled from 'styled-components';

const Container = styled.button<{ right?: string; bottom?: string }>`
  position: absolute;
  right: ${(props) => (props.right ? props.right : '2rem')};
  bottom: ${(props) => (props.bottom ? props.bottom : '1rem')};

  width: 2rem;
  height: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #333333;
  border-radius: 50px;
  border: none;

  cursor: pointer;
`;

const Refresh = styled(RefreshCw)`
  width: 1rem;
  height: 1rem;

  color: #e6e6e6;
  background-color: #333333;
`;

interface RefreshButtonProps {
  right?: string;
  bottom?: string;
  onClick?: () => void;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({ right, bottom, onClick }) => {
  return (
    <Container right={right} bottom={bottom} onClick={onClick && onClick}>
      <Refresh />
    </Container>
  );
};

RefreshButton.defaultProps = {
  right: undefined,
  bottom: undefined,
  onClick: undefined,
};

export default RefreshButton;
