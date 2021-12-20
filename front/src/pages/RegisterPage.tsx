import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Api } from '../api';
import RegisterExpandForm from '../components/organisms/register/RegisterExpandForm';
import RegisterInitialForm from '../components/organisms/register/RegisterInitialForm';
import { errorMsg } from '../utils/errorMsg';
import { successMsg } from '../utils/successMsg';

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 80vh;

  display: flex;
  overflow: hidden;
  padding-top: 4rem;
`;

const initalState = {
  email: '',
  password: '',
  passwordC: '',
  name: '',
  location: 0,
};

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [isNext, setIsNext] = useState(false);
  const [register, setRegister] = useState(initalState);

  const onNext = useCallback(() => {
    setIsNext(true);
  }, [setIsNext]);

  const onChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
      setRegister((prevState) => ({ ...prevState, [id]: e.target.value }));
    },
    [setRegister],
  );

  const onChangeSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRegister((prevState) => ({ ...prevState, location: parseInt(e.target.value, 10) }));
    },
    [setRegister],
  );

  const postRegister = useCallback(async () => {
    try {
      const res = await Api.post('/auth/register', register);
      successMsg(res.data.msg);
      setRegister(initalState);
      navigate('/login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorMsg(error.response?.data.msg);
      }
    }
  }, [register]);

  return (
    <Container>
      <RegisterInitialForm onChangeInput={onChangeInput} onNext={onNext} isNext={isNext} input={register} />
      <RegisterExpandForm
        onChange={{ onChangeInput, onChangeSelect }}
        postRegister={postRegister}
        isNext={isNext}
        input={register}
      />
    </Container>
  );
};

export default RegisterPage;
