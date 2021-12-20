import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useWeather } from '../../../hooks/useWeather';

const Container = styled.div`
  width: 100%;
  height: 80%;
`;

const CurrentMap: React.FC = () => {
  const [coord, setCoord] = useState({ lat: 0, lon: 0 });
  const value = useWeather();

  const weather = useMemo(() => value && value.weathers, [value]);

  useEffect(() => {
    if (weather) {
      const { lat, lon } = weather;
      setCoord({ lat, lon });
    }
  }, [weather]);

  return (
    <Container>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_KEY || ''}>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={{ lat: coord.lat, lng: coord.lon }}
          zoom={9}
        />
      </LoadScript>
    </Container>
  );
};

export default React.memo(CurrentMap);
