export interface FormInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
}
