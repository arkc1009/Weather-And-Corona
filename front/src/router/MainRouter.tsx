import React from 'react';
import { Route, Routes } from 'react-router-dom';
import InitialModal from '../components/modal/InitialModal';
import { DepthProvider } from '../hooks/useDepth';
import { LocationProvider } from '../hooks/useLocation';
import { ModalProvider } from '../hooks/useModal';
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
            <ModalProvider>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>

              <InitialModal />
            </ModalProvider>
          </DepthProvider>
        </WeatherProvider>
      </LocationProvider>
    </ProfileProvider>
  );
};

export default MainRouter;
