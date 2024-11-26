import { useMemo } from 'react';
import * as S from './styles';
import { v4 as uuidv4 } from 'uuid';

export type TextInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const TextInput = ({ label, value, onChange, placeholder }: TextInputProps) => {
  const id = useMemo(() => uuidv4(), []);
  return (
    <S.Container variant="standard" fullWidth>
      <S.Label shrink htmlFor={id}>
        {label}
      </S.Label>
      <S.CustomInput placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} id={id} />
    </S.Container>
  );
};
