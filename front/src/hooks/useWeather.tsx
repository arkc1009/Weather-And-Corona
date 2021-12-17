import axios from 'axios';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { WeatherState } from '../api/types';
import { errorMsg } from '../utils/errorMsg';
import { useLocation } from './useLocation';

interface WeatherContextType {
  weathers: WeatherState | null;
}

const context = createContext<WeatherContextType | null>(null);

export const WeatherProvider: React.FC = ({ children }) => {
  const { location } = useLocation();
  const [weathers, setWeathers] = useState<WeatherState | null>(null);
  const [currentCoord, setCurrentCoord] = useState({
    lat: 0,
    lon: 0,
  });

  const currentURL = useMemo(
    () => `https://api.openweathermap.org/data/2.5/weather?id=${location}&appid=${process.env.REACT_APP_WEATHER_KEY}`,
    [location],
  );

  const oneCallURL = useMemo(
    () =>
      `https://api.openweathermap.org/data/2.5/onecall?lat=${currentCoord.lat}&lon=${currentCoord.lon}&exclude=current,minutely,alerts&appid=${process.env.REACT_APP_WEATHER_KEY}&lang=kr`,
    [currentCoord],
  );

  const fetchWeather = useCallback(() => {
    axios.get(currentURL).then((res) => {
      const { lat, lon } = res.data.coord;
      setCurrentCoord({ lat, lon });
    });
  }, [currentURL]);

  const realFetchWeather = useCallback(async () => {
    try {
      const res = await axios.get(oneCallURL);
      setWeathers(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorMsg('날씨 정보를 가져오지 못했습니다.');
      }
    }
  }, [oneCallURL]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  useEffect(() => {
    realFetchWeather();
  }, [realFetchWeather]);

  const value = useMemo(() => ({ weathers }), [weathers, fetchWeather]);

  return <context.Provider value={value}>{children}</context.Provider>;
};

export const useWeather = (): WeatherContextType | null => {
  return useContext(context);
};
