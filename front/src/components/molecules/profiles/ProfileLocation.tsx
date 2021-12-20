import React, { useMemo } from 'react';
import { cityName } from '../../../utils/cityName';
import Span from '../../atomic/Spans/Span';

const ProfileLocation: React.FC<{ location: number }> = ({ location }) => {
  const city = useMemo(() => cityName(location), [location]);

  if (!city) {
    return <Span>지역정보를 추가해주세요!</Span>;
  }
  return <Span>지역: {city}</Span>;
};

export default ProfileLocation;
