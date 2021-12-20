import React from 'react';
import { Map, MapPin } from 'react-feather';
import styled from 'styled-components';
import { Margin } from '../atomic/Margin';
import Span from '../atomic/Spans/Span';

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 1rem;

  align-self: start;

  & svg {
    width: 1.3rem;
    stroke-width: 1.5px;

    cursor: pointer;
  }
`;

const UnderLineSpan = styled(Span)`
  text-decoration: underline;
`;

const MapIcon = styled(Map)`
  position: absolute;
  right: 1rem;
`;

interface LocationProps {
  city: string;
  openModal: (modal: string) => void;
}

const Location: React.FC<LocationProps> = ({ city, openModal }) => {
  return (
    <Container>
      <MapPin />
      <Margin w=".2rem" />

      <Span fWeight="300">{city}</Span>
      <Margin w="0.5rem" />

      <UnderLineSpan fSize="0.8rem" fWeight="300" onClick={() => openModal('selectLocation')}>
        다른 지역
      </UnderLineSpan>

      <MapIcon onClick={() => openModal('viewMap')} />
    </Container>
  );
};

export default Location;
