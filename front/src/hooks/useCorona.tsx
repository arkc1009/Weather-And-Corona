import axios from 'axios';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CoronaState } from '../api/types';
import { errorMsg } from '../utils/errorMsg';
import { getCoronaDate } from '../utils/getCoronaDate';

const context = createContext<CoronaState[]>([]);
const BASE_URL = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=';

export const CoronaProvider: React.FC = ({ children }) => {
  const [coronaInfo, setCoronaInfo] = useState([]);

  const { startDate, endDate } = getCoronaDate();

  const URL = useMemo(
    () =>
      `${BASE_URL}${process.env.REACT_APP_CORONA_KEY}&pageNo=1&numOfRows=10&startCreateDt=${startDate}&endCreateDt=${endDate}`,
    [startDate, endDate],
  );

  const fetchCorona = useCallback(async () => {
    try {
      const res = await axios.get(URL);
      setCoronaInfo(res.data.response.body.items.item);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorMsg('코로나 정보를 가져오지 못했습니다.');
      }
    }
  }, [URL]);

  useEffect(() => {
    fetchCorona();
  }, [fetchCorona]);

  return <context.Provider value={coronaInfo}>{children}</context.Provider>;
};

export const useCorona = (): CoronaState[] => useContext(context);
