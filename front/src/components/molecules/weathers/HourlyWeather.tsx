import ApexCharts from 'apexcharts';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { HourlyWeaterState } from '../../../api/types';

const Container = styled.div`
  width: 100%;
`;

interface HourlyWeatherProps {
  hourly: HourlyWeaterState[];
}

interface OptionState {
  temps: number[];
  cloudses: number[];
  humiditys: number[];
}

const HourlyWeather: React.FC<HourlyWeatherProps> = ({ hourly }) => {
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
    colors: ['#99C2A2', '#C5EDAC', '#FA8072'],
    series: [
      {
        name: '강수 확률',
        type: 'column',
        data: [0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: '습도',
        type: 'column',
        data: [0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: '온도',
        type: 'line',
        data: [0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
    stroke: {
      width: [4, 4, 4],
    },
    plotOptions: {
      bar: {
        columnWidth: '20%',
      },
    },
    xaxis: {
      categories: ['3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm', '12am'],
    },
    yaxis: [
      {
        seriesName: '강수 확률',
      },
      {
        seriesName: '습도',
      },
      {
        opposite: true,
        seriesName: '온도',
      },
    ],
    legend: {
      horizontalAlign: 'left',
      offsetX: 40,
    },
  });

  const [optionState, setOptionState] = useState<OptionState>({
    temps: [],
    cloudses: [],
    humiditys: [],
  });

  const fixed = useCallback((num: number) => {
    return parseInt((num - 273).toFixed(0), 10);
  }, []);

  const makeArray = useCallback(
    (h: HourlyWeaterState, i: number) => {
      if (i % 3 === 2) {
        const { temp, clouds, humidity } = h;
        setOptionState((prevState) => ({
          temps: prevState.temps.concat(fixed(temp)),
          cloudses: prevState.cloudses.concat(clouds),
          humiditys: prevState.humiditys.concat(humidity),
        }));
      }
    },
    [setOptionState],
  );

  useEffect(() => {
    hourly.map((h, i) => makeArray(h, i));

    return () => {
      setOptionState({
        temps: [],
        cloudses: [],
        humiditys: [],
      });
    };
  }, [hourly]);

  const Chart = useRef(null);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      series: [
        { ...prevState.series[0], data: optionState.cloudses },
        { ...prevState.series[1], data: optionState.humiditys },
        { ...prevState.series[2], data: optionState.temps },
      ],
      yaxis: [
        {
          ...prevState.yaxis[0],
          min: Math.min(...optionState.cloudses),
          max: Math.max(...optionState.cloudses),
          forceNiceScale: true,
        },
        {
          ...prevState.yaxis[1],
          min: Math.min(...optionState.humiditys),
          max: Math.max(...optionState.humiditys) + 5,
          forceNiceScale: true,
        },
        {
          ...prevState.yaxis[2],
          min: Math.min(...optionState.temps),
          max: Math.max(...optionState.temps) + 2,
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

export default HourlyWeather;
