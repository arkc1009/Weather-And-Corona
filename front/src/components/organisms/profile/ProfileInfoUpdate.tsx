import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { Api } from '../../../api';
import { ProfileUpdateProps } from './types';
import { useProfile } from '../../../hooks/useProfile';
import { errorMsg } from '../../../utils/errorMsg';
import { successMsg } from '../../../utils/successMsg';
import { Margin } from '../../atomic/Margin';
import SubmitButton from '../../atomic/buttons/SubmitButton';
import FormLocation from '../../molecules/form/FormLocation';
import FormInput from '../../molecules/form/FormInput';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileUpdate: React.FC<ProfileUpdateProps> = ({ closeModal }) => {
  const navigate = useNavigate();
  const { profile, fetchProfile } = useProfile();
  const [input, setInput] = useState(profile);

  const { name } = input;

  const onChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
      setInput((prevState) => ({ ...prevState, [id]: e.target.value }));
    },
    [setInput],
  );

  const onChangeSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setInput((prevState) => ({ ...prevState, location: parseInt(e.target.value, 10) }));
    },
    [setInput],
  );

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        const res = await Api.post('/user/profile', input);
        successMsg(res.data.msg);
        if (closeModal) {
          closeModal();
          fetchProfile();
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          errorMsg(error.response?.data.msg);
          navigate('/login');
        }
      }
    },
    [input, closeModal, fetchProfile],
  );

  return (
    <Form onSubmit={onSubmit}>
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

      <SubmitButton>수정</SubmitButton>
    </Form>
  );
};

export default ProfileUpdate;
