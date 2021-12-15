import React from 'react';
import styled from 'styled-components';
import Input from '../../atomic/Input';
import Label from '../../atomic/Label';
import { FormInputProps } from './types/FormInputProps';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormEmail: React.FC<FormInputProps> = ({ value, onChange }) => {
  return (
    <Container>
      <Label isAbs>이메일</Label>
      <Input type="email" placeholder="youremail@example.com" value={value} onChange={(e) => onChange(e, 'email')} />
    </Container>
  );
};

export default FormEmail;
