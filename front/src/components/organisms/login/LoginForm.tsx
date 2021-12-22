import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Api } from '../../../api';
import { errorMsg } from '../../../utils/errorMsg';
import { successMsg } from '../../../utils/successMsg';
import SubmitButton from '../../atomic/buttons/SubmitButton';
import Span from '../../atomic/Spans/Span';
import FormInput from '../../molecules/form/FormInput';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 2rem;
`;

const initalState = {
  email: '',
  password: '',
};

const UnderLineSpan = styled(Span)`
  text-decoration: underline;
`;

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

  const onClickRegister = useCallback(() => navigate('/register'), [navigate]);

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

      <FormInput
        isAbs
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        value={password}
        onChange={(e) => onChange(e, 'password')}
      />

      <SubmitButton mg="1.5rem 0 0.5rem 0">로그인</SubmitButton>

      <UnderLineSpan fSize="0.9rem" fWeight="bold" color="#333333" onClick={onClickRegister}>
        회원가입 하러 가기
      </UnderLineSpan>
    </Container>
  );
};

export default LoginForm;
