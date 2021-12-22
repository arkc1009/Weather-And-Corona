import React from 'react';
import styled from 'styled-components';
import { DailyWeatherState } from '../../../api/types';
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
    font-size: 0.8rem;
  }
`;

const TodayWeather: React.FC<DailyWeatherState> = ({ weather, temp }) => {
  const { min, max, eve } = temp;

  return (
    <Container>
      <MainWrap>
        <WeatherIcon w="4rem" h="4rem" weather={weather[0]} />
        <Span fSize="2rem">{(eve - 273).toFixed(0)}도</Span>
      </MainWrap>

      <SubWrap>
        <Span>{weather[0].description}</Span>
        <Span color="salmon">{(max - 273).toFixed(1)}º</Span>
        <Span color="#14279b">{(min - 273).toFixed(1)}º</Span>
      </SubWrap>
    </Container>
  );
};

export default TodayWeather;
