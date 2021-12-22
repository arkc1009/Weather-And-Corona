import React from 'react';

export interface FormInputProps {
  label?: string;
  isAbs?: boolean;
  type: string;
  placeholder?: string;
  value: string;
  ref?: React.RefObject<HTMLInputElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
