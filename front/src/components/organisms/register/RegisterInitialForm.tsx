import React, { useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import styled, { css } from 'styled-components';
import { RegisterProps } from '../../../api/types';
import { checkEmail } from '../../../utils/checkEmail';
import { checkIsBlank } from '../../../utils/checkIsBlank';
import { errorMsg } from '../../../utils/errorMsg';
import SubmitButton from '../../atomic/buttons/SubmitButton';
import Span from '../../atomic/Spans/Span';
import FormInput from '../../molecules/form/FormInput';

const Form = styled.form<{ isNext: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  transition: all 500ms;

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
  const { email, password, passwordC } = input;

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordCRef = useRef<HTMLInputElement>(null);

  const isCorrectEmail = useMemo(() => checkEmail(email), [email]);
  const isSamePassword = useMemo(() => password === passwordC, [password, passwordC]);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (checkIsBlank(email)) {
        emailRef.current?.focus();
        return;
      }
      if (checkIsBlank(password)) {
        passwordRef.current?.focus();
        return;
      }
      if (checkIsBlank(passwordC)) {
        passwordCRef.current?.focus();
        return;
      }

      if (!isCorrectEmail) {
        errorMsg('올바른 형식이 아닙니다!');
        emailRef.current?.focus();
        return;
      }
      if (!isSamePassword) {
        errorMsg('비밀번호를 확인하세요.');
        passwordCRef.current?.focus();
        return;
      }

      onNext();
    },
    [email, password, passwordC],
  );

  useLayoutEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <Form onSubmit={onSubmit} isNext={isNext}>
      <FormInput
        isAbs
        label="이메일"
        type="email"
        placeholder="youremail@example.com"
        value={email}
        onChange={(e) => onChangeInput(e, 'email')}
        ref={emailRef}
      />
      {email && (
        <Span fSize="0.8rem" color={isCorrectEmail ? 'green' : 'salmon'}>
          {isCorrectEmail ? '사용가능한 이메일 입니다.' : '형식이 올바르지 않습니다.'}
        </Span>
      )}

      <FormInput
        isAbs
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        value={password}
        onChange={(e) => onChangeInput(e, 'password')}
        ref={passwordRef}
      />

      <FormInput
        isAbs
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 다시 입력해주세요."
        value={passwordC}
        onChange={(e) => onChangeInput(e, 'passwordC')}
        ref={passwordCRef}
      />
      {password && passwordC && (
        <Span fSize="0.8rem" color={isSamePassword ? 'green' : 'salmon'}>
          {isSamePassword ? '비밀번호가 확인되었습니다.' : '비밀번호가 일치하지 않습니다.'}
        </Span>
      )}

      <SubmitButton mg="2rem 0 0 0">다음</SubmitButton>
    </Form>
  );
};

export default RegisterInitalForm;
