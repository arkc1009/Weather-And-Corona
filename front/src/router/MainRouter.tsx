import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { DepthProvider } from '../hooks/useDepth';
import { LocationProvider } from '../hooks/useLocation';
import { ProfileProvider } from '../hooks/useProfile';
import { WeatherProvider } from '../hooks/useWeather';
import MainPage from '../pages/MainPage';
import ProfilePage from '../pages/ProfilePage';

const MainRouter: React.FC = () => {
  return (
    <ProfileProvider>
      <LocationProvider>
        <WeatherProvider>
          <DepthProvider>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </DepthProvider>
        </WeatherProvider>
      </LocationProvider>
    </ProfileProvider>
  );
};

export default MainRouter;
