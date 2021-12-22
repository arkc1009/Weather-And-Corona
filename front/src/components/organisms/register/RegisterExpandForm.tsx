import React, { useCallback, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { RegisterProps } from '../../../api/types';
import SubmitButton from '../../atomic/buttons/SubmitButton';
import Span from '../../atomic/Spans/Span';
import FormLocation from '../../molecules/form/FormLocation';
import FormInput from '../../molecules/form/FormInput';

const Form = styled.form<{ isNext: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  transition: all 500ms;

  transform: translateX(100%);
  ${(props) =>
    props.isNext &&
    css`
      transform: translateX(0);
    `}
`;

const UnderLineSpan = styled(Span)`
  opacity: 0.7;
  text-decoration: underline;

  margin-top: 0.5rem;
`;

interface RegisterFormProps {
  isNext: boolean;
  input: RegisterProps;
  onChange: {
    onChangeInput: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
    onChangeSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  };
  onPrevious: () => void;
  postRegister: () => void;
}

const RegisterExpandForm: React.FC<RegisterFormProps> = ({ onChange, onPrevious, postRegister, isNext, input }) => {
  const nameRef = useRef<HTMLInputElement>(null);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      postRegister();
    },
    [postRegister],
  );

  const { name } = input;
  const { onChangeInput, onChangeSelect } = onChange;

  useEffect(() => {
    if (isNext) {
      setTimeout(() => {
        nameRef.current?.focus();
      }, 800);
    }
  }, [isNext]);

  return (
    <Form onSubmit={onSubmit} isNext={isNext}>
      <FormInput
        label="이름"
        type="text"
        placeholder="이름을 입력해주세요."
        value={name}
        onChange={(e) => onChangeInput(e, 'name')}
        ref={nameRef}
      />

      <FormLocation onChange={onChangeSelect} />

      <SubmitButton w="15rem" mg="2rem 0 1rem 0">
        회원가입
      </SubmitButton>
      <SubmitButton onClick={onPrevious} type="button">
        뒤로가기
      </SubmitButton>

      <UnderLineSpan fSize=".9rem">이름과 지역은 나중에 변경할 수 있어요!</UnderLineSpan>
    </Form>
  );
};

export default RegisterExpandForm;
