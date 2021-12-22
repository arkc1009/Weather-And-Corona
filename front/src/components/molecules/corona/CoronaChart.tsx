import ApexCharts from 'apexcharts';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
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
        name: '신규 확진자',
        type: 'column',
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: '신규 사망자',
        type: 'line',
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
    (data: CoronaState, index: number) => {
      if (index === 0) {
        return;
      }
      const { deathCnt, decideCnt, stateDt } = data;
      const month = `${stateDt}`.slice(-4, -2);
      const days = `${stateDt}`.slice(-2);

      setOptionState((prevState) => ({
        deathCnts: prevState.deathCnts.concat(deathCnt - info[index - 1].deathCnt),
        decideCnts: prevState.decideCnts.concat(decideCnt - info[index - 1].decideCnt),
        stateDts: prevState.stateDts.concat(`${month}.${days}`),
      }));
    },
    [setOptionState, info],
  );

  useLayoutEffect(() => {
    info.map((data, i) => makeArray(data, i));

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
      yaxis: [
        {
          ...prevState.yaxis[0],
          min: Math.min(...optionState.decideCnts),
          max: Math.max(...optionState.decideCnts) + 500,
          forceNiceScale: true,
        },
        {
          ...prevState.yaxis[1],
          min: Math.min(...optionState.deathCnts),
          max: Math.max(...optionState.deathCnts) + 10,
          forceNiceScale: true,
        },
      ],
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
