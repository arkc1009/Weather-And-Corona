import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useProfile } from './useProfile';

interface LocationContextType {
  location: number;
  setLocation: (e: React.SetStateAction<number>) => void;
}

const context = createContext<LocationContextType>({ location: 0, setLocation: () => null });

export const LocationProvider: React.FC = ({ children }) => {
  const { profile } = useProfile();
  const [location, setLocation] = useState(profile.location);

  useEffect(() => {
    setLocation(profile.location);
  }, [profile]);

  const value = useMemo(() => ({ location, setLocation }), [location, setLocation]);

  return <context.Provider value={value}>{children}/</context.Provider>;
};

export const useLocation = (): LocationContextType => useContext(context);
