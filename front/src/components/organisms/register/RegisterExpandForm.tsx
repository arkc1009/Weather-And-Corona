import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { RegisterProps } from '../../../api/types';
import { errorMsg } from '../../../utils/errorMsg';
import SubmitButton from '../../atomic/buttons/SubmitButton';
import { Margin } from '../../atomic/Margin';
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

  transition: all 1s;

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
`;

interface RegisterFormProps {
  isNext: boolean;
  input: RegisterProps;
  onChange: {
    onChangeInput: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
    onChangeSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  };

  postRegister: () => void;
}

const RegisterExpandForm: React.FC<RegisterFormProps> = ({ onChange, postRegister, isNext, input }) => {
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { name, location } = input;
      if (!name.trim() || !location || location === 0) {
        errorMsg('공백이 있습니다.');
        return;
      }

      postRegister();
    },
    [postRegister, input],
  );

  const { name } = input;
  const { onChangeInput, onChangeSelect } = onChange;

  return (
    <Form onSubmit={onSubmit} isNext={isNext}>
      <FormInput
        label="이름"
        type="text"
        placeholder="이름을 입력해주세요."
        value={name}
        onChange={(e) => onChangeInput(e, 'name')}
      />
      <Margin h="1rem" />

      <FormLocation onChange={onChangeSelect} />
      <Margin h="1rem" />

      <SubmitButton>회원가입</SubmitButton>
      <Margin h="0.5rem" />

      <UnderLineSpan fSize=".9rem">이름과 지역은 나중에 변경할 수 있어요!</UnderLineSpan>
    </Form>
  );
};

export default RegisterExpandForm;
