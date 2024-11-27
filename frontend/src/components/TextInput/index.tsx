import { useMemo } from 'react';
import * as S from './styles';
import { v4 as uuidv4 } from 'uuid';

export type TextInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  errorMessage?: string;
};

export const TextInput = ({ label, value, onChange, placeholder, errorMessage }: TextInputProps) => {
  const id = useMemo(() => uuidv4(), []);
  return (
    <S.Container variant="standard" fullWidth>
      <S.Label shrink htmlFor={id}>
        {label}
      </S.Label>
      <S.CustomInput
        error={!!errorMessage}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        id={id}
      />
      <S.ErrorMessage variant="h6">{errorMessage}</S.ErrorMessage>
    </S.Container>
  );
};
