import React from 'react';
import { Droplet } from 'react-feather';
import styled from 'styled-components';
import { DailyWeatherState } from '../../../api/types';
import WeatherIcon from '../../atomic/icons/WeatherIcon';
import { Margin } from '../../atomic/Margin';
import Span from '../../atomic/Spans/Span';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FlexSpan = styled(Span)`
  display: flex;
  align-items: center;
`;

interface WeeklyItemProps {
  weather: DailyWeatherState;
}

const WeeklyItem: React.FC<WeeklyItemProps> = ({ weather }) => {
  const { clouds, temp } = weather;
  return (
    <Container>
      <FlexSpan>
        <Droplet />
        <Margin w="0.2rem" />
        {clouds}%
      </FlexSpan>
      <WeatherIcon weather={weather.weather[0]} /> {(temp.max - 273).toFixed(0)}º / {(temp.min - 273).toFixed(0)}º
    </Container>
  );
};

export default WeeklyItem;
