import React, { useMemo } from 'react';
import styled from 'styled-components';
import { RenderAnimate } from '../../../Animate';
import { useLocation } from '../../../hooks/useLocation';
import { useWeather } from '../../../hooks/useWeather';
import LoadingBar from '../../atomic/loadings/LoadingBar';
import WeeklyItem from '../../molecules/weathers/WeeklyItem';
import NotLocation from './NotLocation';

const Container = styled.div`
  width: 80%;
  min-height: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;

  color: #333333;
  background-color: #fff;
  border-radius: 9px;
  box-shadow: 1px 1px 1px rgb(220, 220, 220);
  padding: 1rem;

  animation: ${RenderAnimate} ease-in-out 1s;
`;

const Loading = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  animation: none;
`;

const WeeklyWeather: React.FC = () => {
  const { location } = useLocation();
  const value = useWeather();
  const dailyWeather = useMemo(() => value && value.weathers && value.weathers.daily, [value]);

  const weatherList = useMemo(
    () => dailyWeather && dailyWeather.map((d, i) => <WeeklyItem weather={d} key={d.dt} index={i} />),
    [dailyWeather],
  );

  if (!location) {
    return <NotLocation />;
  }

  if (weatherList) {
    return <Container>{weatherList}</Container>;
  }

  return (
    <Loading>
      <LoadingBar />
    </Loading>
  );
};

export default WeeklyWeather;
