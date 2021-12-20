import toast from 'react-hot-toast';

export const successMsg = (msg: string, duration?: number): void => {
  toast.success(msg, { duration: !duration ? 1500 : duration });
};
