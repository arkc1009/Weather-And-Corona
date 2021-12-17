import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Margin } from '../components/atomic/Margin';
import Title from '../components/atomic/Title';
import InitialModal from '../components/modal/InitialModal';
import ProfileButton from '../components/molecules/buttons/ProfileButton';
import FormLocation from '../components/molecules/form/FormLocation';
import CurrentMap from '../components/organisms/map';
import DailyWeather from '../components/organisms/weather/DailyWeather';
import WeeklyWeather from '../components/organisms/weather/WeeklyWeather';
import { useLocation } from '../hooks/useLocation';

const Container = styled.div`
  width: 100vw;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 1rem;
`;

const MainPage: React.FC = () => {
  const { setLocation } = useLocation();
  const [modalState, setModalState] = useState({
    selectLocation: false,
    viewMap: false,
  });

  const closeModal = useCallback(
    (modal: string) => {
      setModalState((prevState) => ({ ...prevState, [modal]: false }));
    },
    [setModalState],
  );

  const openModal = useCallback(
    (modal: string) => {
      setModalState((prevState) => ({ ...prevState, [modal]: true }));
    },
    [setModalState],
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setLocation(parseInt(e.target.value, 10));
      closeModal('selectLocation');
    },
    [setLocation],
  );

  return (
    <Container>
      <Title>날씨(기상정보)</Title>
      <Margin h="1rem" />

      <DailyWeather openModal={openModal} />
      <Margin h="1.5rem" />

      <WeeklyWeather />
      <Margin h="2rem" />

      <Title>코로나 현황(기상정보)</Title>
      <Margin h="1rem" />

      <ProfileButton />

      <InitialModal isOpen={modalState.selectLocation} closeModal={() => closeModal('selectLocation')}>
        <FormLocation onChange={onChange} />
      </InitialModal>

      <InitialModal isOpen={modalState.viewMap} closeModal={() => closeModal('viewMap')}>
        <CurrentMap />
      </InitialModal>
    </Container>
  );
};

export default MainPage;
