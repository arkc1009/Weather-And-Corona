import React, { useEffect } from 'react';
import styled from 'styled-components';
import { DailyWeatherState } from '../../../api/types';
import { useDepth } from '../../../hooks/useDepth';
import WeatherIcon from '../../atomic/icons/WeatherIcon';
import Span from '../../atomic/Spans/Span';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainWrap = styled.div`
  display: flex;
  align-items: center;
`;

const SubWrap = styled.div`
  display: flex;
  flex-direction: column;
  text-align: end;

  & span {
    color: rgb(120, 120, 120);
    font-size: 0.8rem;
  }
`;

const TodayWeather: React.FC<DailyWeatherState> = ({ weather, temp }) => {
  const { addDepth } = useDepth();
  const { min, max, eve } = temp;

  useEffect(() => {
    addDepth();
  }, []);

  return (
    <Container>
      <MainWrap>
        <WeatherIcon w="4rem" h="4rem" weather={weather[0]} />
        <Span fSize="2rem">{(eve - 273).toFixed(0)}도</Span>
      </MainWrap>

      <SubWrap>
        <Span>{weather[0].description}</Span>
        <Span>{(max - 273).toFixed(1)}</Span>
        <Span>{(min - 273).toFixed(1)}</Span>
      </SubWrap>
    </Container>
  );
};

export default TodayWeather;
