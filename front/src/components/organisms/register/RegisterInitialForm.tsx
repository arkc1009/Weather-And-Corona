import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { RegisterProps } from '../../../api/types';
import { errorMsg } from '../../../utils/errorMsg';
import SubmitButton from '../../atomic/buttons/SubmitButton';
import { Margin } from '../../atomic/Margin';
import FormInput from '../../molecules/form/FormInput';

const Form = styled.form<{ isNext: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  transition: all 1s;

  ${(props) =>
    props.isNext &&
    css`
      transform: translateX(-100%);
    `}
`;

interface RegisterFormProps {
  isNext: boolean;
  input: RegisterProps;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  onNext: () => void;
}

const RegisterInitalForm: React.FC<RegisterFormProps> = ({ onNext, onChangeInput, isNext, input }) => {
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

      onNext();
    },
    [input],
  );

  const { email, password, passwordC } = input;

  return (
    <Form onSubmit={onSubmit} isNext={isNext}>
      <FormInput
        isAbs
        label="이메일"
        type="email"
        placeholder="youremail@example.com"
        value={email}
        onChange={(e) => onChangeInput(e, 'email')}
      />
      <Margin h="1rem" />

      <FormInput
        isAbs
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        value={password}
        onChange={(e) => onChangeInput(e, 'password')}
      />
      <Margin h="1rem" />

      <FormInput
        isAbs
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 다시 입력해주세요."
        value={passwordC}
        onChange={(e) => onChangeInput(e, 'passwordC')}
      />
      <Margin h="2rem" />

      <SubmitButton>다음</SubmitButton>
    </Form>
  );
};

export default RegisterInitalForm;
