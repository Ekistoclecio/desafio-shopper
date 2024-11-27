import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from '.';
import { theme } from '@/theme';

import { renderWithTheme } from '@/utils/tests/helpers';

describe('<TextInput />', () => {
  it('should render the TextInput with label and input field', async () => {
    const mockOnChange = jest.fn();

    renderWithTheme(<TextInput label="Test Label" value="Initial Value" onChange={mockOnChange} />);

    expect(screen.getByLabelText(/test label/i)).toBeInTheDocument();

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Initial Value');

    const newValue = 'New Value';
    await userEvent.type(input, newValue);
    expect(mockOnChange).toHaveBeenCalledTimes(newValue.length);
  });

  it('should render the TextInput with placeholder', () => {
    renderWithTheme(<TextInput label="Test Label" value="" onChange={jest.fn()} placeholder="Test Placeholder" />);

    expect(screen.getByPlaceholderText(/test placeholder/i)).toBeInTheDocument();
  });

  it('should render the TextInput with error message', () => {
    renderWithTheme(<TextInput label="Test Label" value="" onChange={jest.fn()} errorMessage="Error Message" />);

    expect(screen.getByText(/error message/i)).toBeInTheDocument();
  });

  it('should render the TextInput with error style', () => {
    renderWithTheme(<TextInput label="Test Label" value="" onChange={jest.fn()} errorMessage="Error Message" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveStyle({ borderColor: theme.palette.error.main });
  });
});
