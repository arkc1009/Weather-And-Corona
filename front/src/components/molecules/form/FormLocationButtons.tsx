import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useLocation } from '../../../hooks/useLocation';
import { useModal } from '../../../hooks/useModal';
import OptionButton from '../../atomic/buttons/OptionButton';
import { LocationOptions } from './LocationOptions.ts';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  width: 100%;
`;

const LocationButton: React.FC<{ data: { value: number; name: string } }> = ({ data }) => {
  const { setLocation } = useLocation();
  const { closeModal } = useModal();

  const onClickButton = useCallback(() => {
    setLocation(data.value);
    closeModal();
  }, [data, setLocation]);

  return data.value === 0 ? null : <OptionButton onClick={onClickButton}>{data.name}</OptionButton>;
};

const FormLocationButtons: React.FC = () => {
  const Option = LocationOptions;

  return (
    <Container>
      {Option.map((o) => (
        <LocationButton data={o} key={o.value} />
      ))}
    </Container>
  );
};

export default FormLocationButtons;
