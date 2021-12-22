import React, { useMemo } from 'react';
import styled from 'styled-components';
import { RenderAnimate } from '../../../Animate';
import { useLocation } from '../../../hooks/useLocation';
import { useWeather } from '../../../hooks/useWeather';
import LoadingBar from '../../atomic/loadings/LoadingBar';
import WeeklyItem from '../../molecules/weathers/WeeklyItem';
import NotLocation from './NotLocation';
import { widthRadioType } from './types/widthRadioType';
import Bar from '../../atomic/Bar';

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

  margin-bottom: 2rem;
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

const HeaderWrap = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;

  margin: 0.5rem 0;
`;

const Header = styled.div<{ mw: string }>`
  min-width: ${(props) => (props.mw ? props.mw : '')};

  display: flex;
  font-size: 0.8rem;

  opacity: 0.8;
`;

const WeeklyWeather: React.FC = () => {
  const { location } = useLocation();
  const value = useWeather();

  const widthRadio: widthRadioType = {
    daysRadio: '25%',
    cloudsRadio: '25%',
    iconRadio: '20%',
    tempRadio: '20%',
  };

  const dailyWeather = useMemo(() => value && value.weathers && value.weathers.daily, [value]);

  const weatherList = useMemo(
    () =>
      dailyWeather &&
      dailyWeather.map((d, i) => <WeeklyItem widthRadio={widthRadio} weather={d} key={d.dt} index={i} />),
    [dailyWeather],
  );

  const { daysRadio, cloudsRadio, iconRadio, tempRadio } = widthRadio;

  if (!location) {
    return <NotLocation />;
  }

  if (weatherList) {
    return (
      <Container>
        <HeaderWrap>
          <Header mw={daysRadio}>요일</Header>
          <Header mw={cloudsRadio}>강수확률</Header>
          <Header mw={iconRadio}>날씨</Header>
          <Header mw={tempRadio}>온도(고/저)</Header>
        </HeaderWrap>

        <Bar />

        {weatherList}
      </Container>
    );
  }

  return (
    <Loading>
      <LoadingBar />
    </Loading>
  );
};

export default WeeklyWeather;
