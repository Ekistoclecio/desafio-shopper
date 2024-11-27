import { screen } from '@testing-library/react';

import { NoDataHistory } from '.';

import { renderWithTheme } from '@/utils/tests/helpers';

describe('<NoDataHistory />', () => {
  it('should render the NoDataHistory', () => {
    const { container } = renderWithTheme(<NoDataHistory message="teste message" />);

    expect(screen.getByText('teste message')).toBeInTheDocument();

    expect(screen.getByTestId('no-data-image')).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });
});
