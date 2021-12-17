import React from 'react';
import styled from 'styled-components';
import Input from '../../atomic/Input';
import Label from '../../atomic/Label';
import { FormInputProps } from './types/FormInputProps';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormInput: React.FC<FormInputProps> = ({ isAbs, label, type, placeholder, value, onChange }) => {
  return (
    <Container>
      <Label isAbs={isAbs}>{label}</Label>
      <Input type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </Container>
  );
};

export default FormInput;
