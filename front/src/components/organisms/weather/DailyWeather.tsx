import React, { useMemo } from 'react';
import styled from 'styled-components';
import { RenderAnimate } from '../../../Animate';
import { useLocation } from '../../../hooks/useLocation';
import { useProfile } from '../../../hooks/useProfile';
import { useWeather } from '../../../hooks/useWeather';
import { cityName } from '../../../utils/cityName';
import RefreshButton from '../../atomic/buttons/RefreshButton';
import LoadingBar from '../../atomic/loadings/LoadingBar';
import { Margin } from '../../atomic/Margin';
import Location from '../../molecules/Location';
import HourlyWeather from '../../molecules/weathers/HourlyWeather';
import TodayWeather from '../../molecules/weathers/TodayWeather';
import NotLocation from './NotLocation';

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

interface DailyWeatherProps {
  openModal: (modal: string) => void;
}

const DailyWeather: React.FC<DailyWeatherProps> = ({ openModal }) => {
  const { profile } = useProfile();
  const { location, setLocation } = useLocation();
  const value = useWeather();

  const city = useMemo(() => cityName(location), [location]);
  const todayWeather = useMemo(() => value && value.weathers && value.weathers.daily[0], [value]);
  const hourlyWeather = useMemo(() => value && value.weathers && value.weathers.hourly, [value]);

  if (!location) {
    return <NotLocation />;
  }

  if (value && todayWeather && hourlyWeather && value.weathers?.lat !== 0 && value.weathers?.lon !== 0) {
    return (
      <Container>
        <Location city={city} openModal={openModal} />
        <Margin h="0.5rem" />

        <TodayWeather weather={todayWeather.weather} temp={todayWeather.temp} />

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
