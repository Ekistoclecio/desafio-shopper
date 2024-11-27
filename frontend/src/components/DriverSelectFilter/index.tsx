import { useState } from 'react';
import * as S from './styles';

export type DriverSelectOption = {
  value: string | number;
  label: string;
};

export type DriverSelectFilterProps = {
  label: string;
  options: DriverSelectOption[];
  selectedOption: DriverSelectOption;
  onChange: (value: DriverSelectOption) => void;
};

export const DriverSelectFilter = ({ label, options, selectedOption, onChange }: DriverSelectFilterProps) => {
  const [open, setOpen] = useState(false);

  const handleChange = (newValue: string | number) => {
    const selectedOption = options.find((option) => option.value === newValue);
    if (selectedOption) {
      onChange(selectedOption);
    }
  };

  return (
    <S.Container>
      <S.Label id="driver-select-filter" shrink selectOpen={open}>
        {label}
      </S.Label>
      <S.CustomSelect
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        labelId="driver-select-filter"
        value={selectedOption.value}
        onChange={(event) => handleChange(event.target.value as string | number)}
      >
        {options.map((option) => (
          <S.CustomMenuItem key={option.value} value={option.value}>
            {option.label}
          </S.CustomMenuItem>
        ))}
      </S.CustomSelect>
    </S.Container>
  );
};
