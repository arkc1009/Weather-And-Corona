import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { RenderAnimate } from '../../../Animate';
import { useDepth } from '../../../hooks/useDepth';
import { useLocation } from '../../../hooks/useLocation';
import { useProfile } from '../../../hooks/useProfile';
import { useWeather } from '../../../hooks/useWeather';
import { cityName } from '../../../utils/cityName';
import Span from '../../atomic/Spans/Span';
import RefreshButton from '../../atomic/buttons/RefreshButton';
import LoadingBar from '../../atomic/loadings/LoadingBar';
import Location from '../../molecules/Location';
import HourlyWeather from '../../molecules/weathers/HourlyWeather';
import TodayWeather from '../../molecules/weathers/TodayWeather';
import NotLocation from './NotLocation';
import { MainModalTypes } from '../../modal/types/MainModalTypes';

const Container = styled.div`
  position: relative;
  width: 80%;
  min-height: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #fff;
  border-radius: 9px;
  box-shadow: 1px 1px 1px rgb(220, 220, 220);

  margin: 1rem 0 1.5rem 0;
  padding: 2rem 1rem 1rem 1rem;

  animation: ${RenderAnimate} ease-in-out 1s;
`;

const Loading = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  animation: none;
`;

const Axis = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;

  transform: translateY(1rem);

  & span {
    padding: 0 1.5rem 0 0.5rem;
    font-size: 0.8rem;
  }
`;

interface DailyWeatherProps {
  openModal: (modal: MainModalTypes) => void;
}

const DailyWeather: React.FC<DailyWeatherProps> = ({ openModal }) => {
  const { addDepth } = useDepth();
  const { profile } = useProfile();
  const { location, setLocation } = useLocation();
  const value = useWeather();

  const city = useMemo(() => cityName(location), [location]);
  const todayWeather = useMemo(() => value && value.weathers && value.weathers.daily[0], [value]);
  const hourlyWeather = useMemo(() => value && value.weathers && value.weathers.hourly, [value]);

  useEffect(() => {
    addDepth();
  }, []);

  if (!location) {
    return <NotLocation />;
  }

  if (value && todayWeather && hourlyWeather && value.weathers?.lat !== 0 && value.weathers?.lon !== 0) {
    return (
      <Container>
        <Location city={city} openModal={openModal} />

        <TodayWeather weather={todayWeather.weather} temp={todayWeather.temp} />

        <Axis>
          <Span>습도/강수확률</Span>
          <Span>온도</Span>
        </Axis>
        <HourlyWeather hourly={hourlyWeather.slice(0, 24)} />

        <RefreshButton right="1.2rem" onClick={() => setLocation(profile.location)} />
      </Container>
    );
  }

  return (
    <Loading>
      <LoadingBar />
    </Loading>
  );
};

export default DailyWeather;
