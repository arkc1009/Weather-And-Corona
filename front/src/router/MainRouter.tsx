import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </WeatherProvider>
      </LocationProvider>
    </ProfileProvider>
  );
};

export default MainRouter;
