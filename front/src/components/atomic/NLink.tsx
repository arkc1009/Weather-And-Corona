import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  margin-bottom: 2rem;
  text-decoration: none;
`;

interface LinkProps {
  children?: ReactNode;
  to: string;
}

const NLink: React.FC<LinkProps> = ({ children, to }) => {
  return <StyledLink to={to}>{children}</StyledLink>;
};

NLink.defaultProps = {
  children: null,
};

export default NLink;
