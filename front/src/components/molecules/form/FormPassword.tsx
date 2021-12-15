import React from 'react';
import styled from 'styled-components';
import Input from '../../atomic/Input';
import Label from '../../atomic/Label';
import { FormInputProps } from './types/FormInputProps';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormPassword: React.FC<FormInputProps> = ({ value, onChange }) => {
  return (
    <Container>
      <Label isAbs>비밀번호</Label>
      <Input type="password" placeholder="password" value={value} onChange={(e) => onChange(e, 'password')} />
    </Container>
  );
};

export default FormPassword;
