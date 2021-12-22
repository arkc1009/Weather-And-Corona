import React, { useMemo } from 'react';
import { Droplet } from 'react-feather';
import styled, { css } from 'styled-components';
import { DailyWeatherState } from '../../../api/types';
import { days } from '../../../utils/makeDays';
import WeatherIcon from '../../atomic/icons/WeatherIcon';
import Span from '../../atomic/Spans/Span';
import { widthRadioType } from '../../organisms/weather/types/widthRadioType';

const Container = styled.div<{ isToday: boolean | 0 | undefined }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.isToday &&
    css`
      & span {
        font-weight: bold;
      }
    `}
`;

const Wrap = styled.div<{ mw: string }>`
  min-width: ${(props) => (props.mw ? props.mw : '')};

  display: flex;
  align-items: center;
  text-align: center;

  & svg {
    width: 1.2rem;
  }
`;

interface WeeklyItemProps {
  weather: DailyWeatherState;
  index: number;
  widthRadio: widthRadioType;
}

const WeeklyItem: React.FC<WeeklyItemProps> = ({ weather, index, widthRadio }) => {
  const { daysRadio, cloudsRadio, iconRadio, tempRadio } = widthRadio;
  const { clouds, temp, dt } = weather;
  const time = useMemo(() => dt && new Date(dt * 1000), [dt]);
  const isToday = useMemo(() => time && time.getDate() === new Date().getDate(), [time]);

  if (index === 7) {
    return null;
  }

  return (
    <Container isToday={isToday}>
      <Wrap mw={daysRadio}>
        <Span>{time && days(time.getDay())}</Span>
      </Wrap>

      <Wrap mw={cloudsRadio}>
        <Droplet />

        <Span mg="0 0 0 0.2rem" fSize="0.8rem" color={clouds && clouds >= 80 ? '#5c7aea' : 'inital'}>
          {clouds}%
        </Span>
      </Wrap>

      <Wrap mw={iconRadio}>
        <WeatherIcon weather={weather.weather[0]} />
      </Wrap>

      <Wrap mw={tempRadio}>
        <Span color="#dd4949">{(temp.max - 273).toFixed(0)}º</Span> /
        <Span color="#3649bd">{(temp.min - 273).toFixed(0)}º</Span>
      </Wrap>
    </Container>
  );
};

export default WeeklyItem;
