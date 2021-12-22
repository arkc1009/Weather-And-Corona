import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { Api } from '../../../api';
import { useProfile } from '../../../hooks/useProfile';
import { errorMsg } from '../../../utils/errorMsg';
import { successMsg } from '../../../utils/successMsg';
import SubmitButton from '../../atomic/buttons/SubmitButton';
import FormLocation from '../../molecules/form/FormLocation';
import FormInput from '../../molecules/form/FormInput';
import { useModal } from '../../../hooks/useModal';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileUpdate: React.FC = () => {
  const navigate = useNavigate();
  const { closeModal } = useModal();
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
        fetchProfile();
        if (closeModal) {
          closeModal();
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

      <FormLocation onChange={onChangeSelect} />

      <SubmitButton mg="1rem 0 0 0">수정</SubmitButton>
    </Form>
  );
};

export default ProfileUpdate;
