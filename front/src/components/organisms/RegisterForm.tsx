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
import FormPasswordC from '../molecules/form/FormPasswordC';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const initalState = {
  email: '',
  password: '',
  passwordC: '',
};

const RegisterForm: React.FC = () => {
  const [input, setInput] = useState(initalState);

  const onChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    setInput((prevState) => ({ ...prevState, [id]: e.target.value }));
  }, []);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { email, password, passwordC } = input;

      if (!email.trim() || !password.trim() || !passwordC.trim()) {
        errorMsg('공백이 있습니다.');
        return;
      }

      if (password !== passwordC) {
        errorMsg('비밀번호를 확인하세요.');
        return;
      }

      try {
        const res = await Api.post('/auth/register', { email, password });
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

  const { email, password, passwordC } = input;

  return (
    <Container onSubmit={onSubmit}>
      <FormEmail value={email} onChange={onChangeInput} />
      <Margin h="1rem" />

      <FormPassword value={password} onChange={onChangeInput} />
      <Margin h="1rem" />

      <FormPasswordC value={passwordC} onChange={onChangeInput} />
      <Margin h="2rem" />

      <SubmitButton>회원가입</SubmitButton>
    </Container>
  );
};

export default RegisterForm;
