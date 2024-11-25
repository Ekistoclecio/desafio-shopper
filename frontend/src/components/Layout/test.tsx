import { screen } from '@testing-library/react';
import { Layout } from '.';

import { renderWithTheme } from '@/utils/tests/helpers';

describe('<Layout />', () => {
  it('should render the Layout', () => {
    const { container } = renderWithTheme(<Layout />);

    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();

    const parentElement = mainElement.parentElement;
    if (parentElement) {
      const styles = getComputedStyle(parentElement);
      expect(styles.backgroundImage).toContain('url(');
    }

    expect(container.firstChild).toMatchSnapshot();
  });
});
