import React from 'react';
import styled from 'styled-components';
import { RenderAnimate } from '../../../Animate';
import { useCorona } from '../../../hooks/useCorona';
import LoadingBar from '../../atomic/loadings/LoadingBar';
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

  margin-top: 1rem;
  padding: 1.5rem 1rem;

  animation: ${RenderAnimate} ease-in-out 2s;
`;

const Loading = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Wrap = styled.div`
  margin-bottom: 0.5rem;
`;

const Axis = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(1rem);

  & span {
    padding: 0 1rem;
    font-size: 0.8rem;
  }
`;

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
          <Span>당일 누적</Span> <Span color="red">사망자: </Span>
          <Span color="red" fWeight="bold">
            {coronaInfo[0] && coronaInfo[0].deathCnt.toLocaleString()}
          </Span>
        </div>

        <div>
          <Span>당일 누적</Span> <Span color="#57aaee">확진자: </Span>
          <Span color="#57aaee" fWeight="bold">
            {coronaInfo[0] && coronaInfo[0].decideCnt.toLocaleString()}
          </Span>
        </div>
      </Wrap>

      <Span color="rgb(120, 120, 120)" fSize="0.8rem">
        기준 시간은 각 일 00:00 시입니다.
      </Span>

      <Axis>
        <Span>확진자</Span>
        <Span>사망자</Span>
      </Axis>
      <CoronaChart info={coronaInfo} />
    </Container>
  );
};

export default Corona;
