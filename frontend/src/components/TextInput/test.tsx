import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from '.';

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
});
