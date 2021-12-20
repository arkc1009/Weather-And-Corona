import ApexCharts from 'apexcharts';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CoronaState } from '../../../api/types';

const Container = styled.div`
  width: 100%;
`;

interface CoronaChartOptions {
  deathCnts: number[];
  decideCnts: number[];
  stateDts: string[];
}

interface CoronaChartProps {
  info: CoronaState[];
}

const CoronaChart: React.FC<CoronaChartProps> = ({ info }) => {
  const [options, setOptions] = useState({
    chart: {
      height: 250,
      type: 'line',
      stacked: false,
      fontFamily: 'Noto Sans KR, sans-serif',
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#57aaee', '#FF3333'],
    series: [
      {
        name: '확진자',
        type: 'column',
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: '사망자',
        type: 'column',
        data: [0, 0, 0, 0, 0, 0, 0],
      },
    ],
    stroke: {
      width: [4, 4],
    },
    plotOptions: {
      bar: {
        columnWidth: '20%',
      },
    },
    xaxis: {
      categories: ['', '', '', '', '', '', ''],
    },
    yaxis: [
      {
        seriesName: '확진자',
      },
      {
        opposite: true,
        seriesName: '사망자',
      },
    ],
    legend: {
      horizontalAlign: 'left',
      offsetX: 10,
    },
  });

  const [optionState, setOptionState] = useState<CoronaChartOptions>({
    deathCnts: [],
    decideCnts: [],
    stateDts: [],
  });

  const makeArray = useCallback(
    (data: CoronaState) => {
      const { deathCnt, decideCnt, stateDt } = data;

      setOptionState((prevState) => ({
        deathCnts: prevState.deathCnts.concat(deathCnt),
        decideCnts: prevState.decideCnts.concat(decideCnt),
        stateDts: prevState.stateDts.concat(`${stateDt}`.slice(-4)),
      }));
    },
    [setOptionState],
  );

  useEffect(() => {
    info.reverse().map((data) => makeArray(data));

    return () => {
      setOptionState({
        deathCnts: [],
        decideCnts: [],
        stateDts: [],
      });
    };
  }, [info]);

  const Chart = useRef(null);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      series: [
        { ...prevState.series[0], data: optionState.decideCnts },
        { ...prevState.series[1], data: optionState.deathCnts },
      ],
      xaxis: {
        categories: optionState.stateDts,
      },
    }));
  }, [optionState]);

  useEffect(() => {
    const chart = new ApexCharts(Chart.current, options);

    chart.render();

    return () => {
      chart.destroy();
    };
  }, [options]);

  return <Container ref={Chart} />;
};

export default CoronaChart;
