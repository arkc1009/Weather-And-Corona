import React, { forwardRef } from 'react';
import styled from 'styled-components';
import Input from '../../atomic/Input';
import Label from '../../atomic/Label';
import { FormInputProps } from './types/FormInputProps';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 1rem;
`;

export const FormInput = (
  { isAbs, label, type, placeholder, value, onChange }: FormInputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
): React.ReactElement => {
  return (
    <Container>
      <Label isAbs={isAbs}>{label}</Label>
      <Input type={type} placeholder={placeholder} value={value} ref={ref} onChange={onChange} />
    </Container>
  );
};

export default forwardRef(FormInput);
