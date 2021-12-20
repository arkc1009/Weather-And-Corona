import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Api } from '../../../api';
import { errorMsg } from '../../../utils/errorMsg';
import { successMsg } from '../../../utils/successMsg';
import SubmitButton from '../../atomic/buttons/SubmitButton';
import { Margin } from '../../atomic/Margin';
import FormInput from '../../molecules/form/FormInput';

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
  const navigate = useNavigate();
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
        navigate('/main');
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
      <FormInput
        isAbs
        label="이메일"
        type="email"
        placeholder="youremail@example.com"
        value={email}
        onChange={(e) => onChange(e, 'email')}
      />
      <Margin h="1rem" />

      <FormInput
        isAbs
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        value={password}
        onChange={(e) => onChange(e, 'password')}
      />
      <Margin h="1rem" />

      <SubmitButton>로그인</SubmitButton>
    </Container>
  );
};

export default LoginForm;
