import React from 'react';
import styled from 'styled-components';
import Label from '../../atomic/Label';
import { Margin } from '../../atomic/Margin';
import Select from '../../atomic/Select';
import { FormSelectProps } from './types/FormSelectProps';

const Container = styled.div`
  display: flex;
`;

const Option = [
  { value: 0, name: '지역' },
  { value: 1835847, name: '서울' },
  { value: 1838519, name: '부산' },
  { value: 1835327, name: '대구' },
  { value: 1843561, name: '인천' },
  { value: 1841808, name: '광주' },
  { value: 1835224, name: '대전' },
  { value: 1833742, name: '울산' },
  { value: 1842616, name: '세종' },
  { value: 1841610, name: '경기' },
  { value: 1843125, name: '강원' },
  { value: 1845105, name: '충남' },
  { value: 1845106, name: '충북' },
  { value: 1845788, name: '전남' },
  { value: 1845789, name: '전북' },
  { value: 1902028, name: '경남' },
  { value: 1841597, name: '경북' },
  { value: 1846265, name: '제주' },
];

const FormLocation: React.FC<FormSelectProps> = ({ onChange }) => {
  return (
    <Container>
      <Label>지역</Label>
      <Margin w="1rem" />
      <Select onChange={onChange}>
        {Option.map((o) => (
          <option value={o.value} key={o.value}>
            {o.name}
          </option>
        ))}
      </Select>
    </Container>
  );
};

export default FormLocation;
