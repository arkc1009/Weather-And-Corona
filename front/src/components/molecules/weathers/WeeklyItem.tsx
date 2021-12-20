import React, { useMemo } from 'react';
import { Droplet } from 'react-feather';
import styled from 'styled-components';
import { DailyWeatherState } from '../../../api/types';
import { days } from '../../../utils/makeDays';
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
  index: number;
}

const WeeklyItem: React.FC<WeeklyItemProps> = ({ weather, index }) => {
  const { clouds, temp, dt } = weather;
  const time = useMemo(() => dt && new Date(dt * 1000), [dt]);
  const isToday = useMemo(() => time && time.getDay() === new Date().getDay(), [time]);

  if (index === 0) {
    return null;
  }

  return (
    <Container>
      <Span fWeight={isToday ? 'bold' : 'intial'}>{time && days(time.getDay())}</Span>
      <FlexSpan>
        <Droplet />
        <Margin w="0.2rem" />
        <Span color={clouds && clouds >= 70 ? '#5c7aea' : 'inital'}>{clouds}%</Span>
      </FlexSpan>
      <WeatherIcon weather={weather.weather[0]} /> {(temp.max - 273).toFixed(0)}º / {(temp.min - 273).toFixed(0)}º
    </Container>
  );
};

export default WeeklyItem;
