import React from 'react';
import styled from 'styled-components';
import { RenderAnimate } from '../../../Animate';
import { useCorona } from '../../../hooks/useCorona';
import LoadingBar from '../../atomic/loadings/LoadingBar';
import { Margin } from '../../atomic/Margin';
import Span from '../../atomic/Spans/Span';
import CoronaChart from '../../molecules/corona/CoronaChart';

const Container = styled.div`
  width: 80%;
  min-height: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #fff;
  border-radius: 9px;
  box-shadow: 1px 1px 1px rgb(220, 220, 220);
  padding: 1.5rem 1rem;

  animation: ${RenderAnimate} ease-in-out 2s;
`;

const Loading = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Wrap = styled.div``;

const Corona: React.FC = () => {
  const coronaInfo = useCorona();

  if (!coronaInfo) {
    return (
      <Loading>
        <LoadingBar />
      </Loading>
    );
  }

  return (
    <Container>
      <Wrap>
        <div>
          <Span>당일</Span> <Span color="red">사망자:</Span>
          <Span color="red" fWeight="bold">
            {coronaInfo[0] && coronaInfo[0].deathCnt}
          </Span>
        </div>

        <div>
          <Span>당일</Span> <Span color="#57aaee">확진자:</Span>
          <Span color="#57aaee" fWeight="bold">
            {coronaInfo[0] && coronaInfo[0].decideCnt}
          </Span>
        </div>
      </Wrap>
      <Margin h="0.5rem" />

      <Span color="rgb(120, 120, 120)" fSize="0.8rem">
        기준 시간은 각 일 00:00 시입니다.
      </Span>
      <CoronaChart info={coronaInfo} />
    </Container>
  );
};

export default Corona;
