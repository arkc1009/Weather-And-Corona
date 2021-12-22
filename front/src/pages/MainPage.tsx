import React from 'react';
import styled from 'styled-components';
import { RenderAnimate } from '../Animate';
import Title from '../components/atomic/Title';
import ProfileButton from '../components/molecules/buttons/ProfileButton';
import Corona from '../components/organisms/corona/Corona';
import DailyWeather from '../components/organisms/weather/DailyWeather';
import WeeklyWeather from '../components/organisms/weather/WeeklyWeather';
import { useDepth } from '../hooks/useDepth';
import { useModal } from '../hooks/useModal';

const Container = styled.div`
  width: 100vw;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 1rem 0;

  & h2 {
    animation: ${RenderAnimate} ease-in-out 2s;
  }
`;

const MainPage: React.FC = () => {
  const { depth } = useDepth();
  const { openModal } = useModal();

  return (
    <Container>
      {depth >= 0 && (
        <>
          <Title>날씨(기상정보)</Title>

          <DailyWeather openModal={openModal} />

          <WeeklyWeather />
        </>
      )}

      {depth >= 1 && (
        <>
          <Title>코로나 현황</Title>

          <Corona />
        </>
      )}

      <ProfileButton />
    </Container>
  );
};

export default MainPage;
