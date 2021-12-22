import React from 'react';
import styled from 'styled-components';
import Label from '../../atomic/Label';
import Select from '../../atomic/Select';
import { LocationOptions } from './LocationOptions.ts';
import { FormSelectProps } from './types/FormSelectProps';

const Container = styled.div`
  min-width: 110px;

  display: flex;
  justify-content: space-between;

  margin-top: 1rem;
`;

const FormLocation: React.FC<FormSelectProps> = ({ onChange }) => {
  const Option = LocationOptions;

  return (
    <Container>
      <Label>지역</Label>

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
