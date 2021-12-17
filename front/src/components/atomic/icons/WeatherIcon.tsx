import React from 'react';
import styled from 'styled-components';
import { AtomicProps } from '../types/AtomicTypes';
import { WeatherType } from '../../../api/types';

const Img = styled.img<AtomicProps>`
  width: ${(props) => (props.w ? props.w : '3rem')};
  height: ${(props) => (props.h ? props.h : '3rem')};
`;

interface WeatherIconProps {
  weather: WeatherType;
  w?: string;
  h?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ weather, w, h }) => {
  const { icon, description } = weather;

  return <Img w={w} h={h} title={description} alt={description} src={`http://openweathermap.org/img/wn/${icon}.png`} />;
};

WeatherIcon.defaultProps = {
  w: '',
  h: '',
};

export default WeatherIcon;
