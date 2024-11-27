import { screen, waitFor } from '@testing-library/react';

import { DriverSelectFilter } from '.';

import { renderWithTheme } from '@/utils/tests/helpers';
import userEvent from '@testing-library/user-event';

describe('<DriverSelectFilter />', () => {
  it('should render the DriverSelectFilter', () => {
    const { container } = renderWithTheme(
      <DriverSelectFilter
        label="Motorista"
        options={[
          { value: 1, label: 'Motorista 1' },
          { value: 2, label: 'Motorista 2' },
          { value: 3, label: 'Motorista 3' },
          { value: -1, label: 'Todos' },
        ]}
        selectedOption={{ value: 1, label: 'Motorista 1' }}
        onChange={() => {}}
      />,
    );

    expect(screen.getByLabelText('Motorista')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Motorista 1')).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the DriverSelectFilter with all options', () => {
    renderWithTheme(
      <DriverSelectFilter
        label="Motorista"
        options={[
          { value: 1, label: 'Motorista 1' },
          { value: 2, label: 'Motorista 2' },
          { value: 3, label: 'Motorista 3' },
          { value: -1, label: 'Todos' },
        ]}
        selectedOption={{ value: -1, label: 'Todos' }}
        onChange={() => {}}
      />,
    );

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Todos')).toBeInTheDocument();
  });

  it('should call onChange function when a new option is selected', async () => {
    const onChange = jest.fn();

    renderWithTheme(
      <DriverSelectFilter
        label="Motorista"
        options={[
          { value: 1, label: 'Motorista 1' },
          { value: 2, label: 'Motorista 2' },
          { value: 3, label: 'Motorista 3' },
          { value: -1, label: 'Todos' },
        ]}
        selectedOption={{ value: 1, label: 'Motorista 1' }}
        onChange={onChange}
      />,
    );

    expect(screen.getByLabelText('Motorista')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Motorista 1')).toBeInTheDocument();

    const combobox = screen.getByRole('combobox');
    await userEvent.click(combobox);
    const newOption = screen.getByText('Motorista 2');
    await userEvent.click(newOption);

    waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith({ value: 2, label: 'Motorista 2' });
    });
  });
});
