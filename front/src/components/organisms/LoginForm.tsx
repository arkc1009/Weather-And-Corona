import axios from 'axios';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Api } from '../../api';
import { errorMsg } from '../../utils/errorMsg';
import { successMsg } from '../../utils/successMsg';
import SubmitButton from '../atomic/buttons/SubmitButton';
import { Margin } from '../atomic/Margin';
import FormEmail from '../molecules/form/FormEmail';
import FormPassword from '../molecules/form/FormPassword';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const initalState = {
  email: '',
  password: '',
};

const LoginForm: React.FC = () => {
  const [input, setInput] = useState(initalState);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    setInput((prevState) => ({ ...prevState, [id]: e.target.value }));
  }, []);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { email, password } = input;
      try {
        const res = await Api.post('/auth/login', { email, password }, { withCredentials: true });
        successMsg(res.data.msg);
        setInput(initalState);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          errorMsg(error.response?.data.msg);
        }
      }
    },
    [input],
  );

  const { email, password } = input;

  return (
    <Container onSubmit={onSubmit}>
      <FormEmail value={email} onChange={onChange} />
      <Margin h="1rem" />

      <FormPassword value={password} onChange={onChange} />
      <Margin h="1rem" />

      <SubmitButton>로그인</SubmitButton>
    </Container>
  );
};

export default LoginForm;
