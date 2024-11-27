import { screen } from '@testing-library/react';

import { Header } from '.';

import { renderWithTheme } from '@/utils/tests/helpers';

describe('<Header />', () => {
  it('should render the Header', () => {
    const { container } = renderWithTheme(<Header title="home" />);

    expect(screen.getByRole('heading', { name: /home/i })).toBeInTheDocument();

    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(2);

    expect(links[0]).toHaveAttribute('href', '/');
    expect(links[1]).toHaveAttribute('href', '/history');

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the Header without links', () => {
    renderWithTheme(<Header title="home" hiddenNav />);

    expect(screen.queryAllByRole('link')).toHaveLength(0);
  });
});
