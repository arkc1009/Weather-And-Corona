import React from 'react';
import { MainModalTypes } from './MainModalTypes';
import { ProfileModalTypes } from './ProfileModalTypes';

export type ModalContentTypes = {
  [k in MainModalTypes | ProfileModalTypes]: React.ReactElement;
};

export type ModalContextContentType = {
  [k in MainModalTypes | ProfileModalTypes]: boolean;
};
