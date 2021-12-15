import React from 'react';
import styled from 'styled-components';
import Input from '../../atomic/Input';
import Label from '../../atomic/Label';
import { FormInputProps } from './types/FormInputProps';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormPasswordC: React.FC<FormInputProps> = ({ value, onChange }) => {
  return (
    <Container>
      <Label isAbs>비밀번호 확인</Label>
      <Input type="password" placeholder="password" value={value} onChange={(e) => onChange(e, 'passwordC')} />
    </Container>
  );
};

export default FormPasswordC;
