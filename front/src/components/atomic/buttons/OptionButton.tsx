import styled from 'styled-components';

const OptionButton = styled.button`
  background-color: #fff;
  padding: 0.2rem 0.5rem;
  margin: 0 0.5rem 0.5rem 0.5rem;

  border: none;
  border-radius: 7px;
  box-shadow: 1px 1px 3px #d5d5d5;

  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }
`;

export default OptionButton;
