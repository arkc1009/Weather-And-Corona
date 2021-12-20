export interface FormInputProps {
  label?: string;
  isAbs?: boolean;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
