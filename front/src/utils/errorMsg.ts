import toast from 'react-hot-toast';

export const errorMsg = (msg: string, duration?: number): void => {
  toast.error(msg, { duration: !duration ? 1500 : duration });
};
