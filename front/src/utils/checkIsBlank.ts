import { errorMsg } from './errorMsg';

export const checkIsBlank = (value: string): boolean => {
  if (!value.trim()) {
    errorMsg('공백이 있습니다!');
    return true;
  }
  return false;
};
