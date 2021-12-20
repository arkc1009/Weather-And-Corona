import axios from 'axios';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Api } from '../api';
import { ProfileState } from '../api/types';
import { errorMsg } from '../utils/errorMsg';

const initalState = {
  profile: {
    name: '',
    email: '',
    location: 0,
  },
  fetchProfile: () => null,
};

interface ProfileContextType {
  profile: ProfileState;
  fetchProfile: () => void;
}

const context = createContext<ProfileContextType>(initalState);

export const ProfileProvider: React.FC = ({ children }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    location: 0,
    intro: '',
  });

  const fetchProfile = useCallback(async () => {
    try {
      const res = await Api.get('/user/profile/me');
      setProfile(res.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorMsg(error.response?.data.msg);
        navigate('/login');
      }
    }
  }, [setProfile]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const value = useMemo(
    () => ({
      profile,
      fetchProfile,
    }),
    [profile, fetchProfile],
  );

  return <context.Provider value={value}>{children}</context.Provider>;
};

export const useProfile = (): ProfileContextType => useContext(context);
