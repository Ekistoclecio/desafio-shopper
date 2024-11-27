import { screen } from '@testing-library/react';

import { HistoryItem } from '.';

import { renderWithTheme } from '@/utils/tests/helpers';

describe('<HistoryItem />', () => {
  it('should render the HistoryItem', () => {
    const { container } = renderWithTheme(
      <HistoryItem
        ride={{
          id: 1,
          date: '2021-10-10 - 14:30',
          duration: '1h',
          origin: ' 1800 Amphitheatre Parkway, Mountain View, CA 94043',
          destination: 'Endereço final',
          distance: 100,
          value: 100,
          driver: { name: 'Motorista 1', id: 1 },
        }}
      />,
    );

    expect(screen.getByText('2021-10-10 - 14:30')).toBeInTheDocument();

    expect(screen.getByText('R$ 100')).toBeInTheDocument();

    expect(screen.getByText('1800 Amphitheatre Parkway, Mountain View, CA 94043')).toBeInTheDocument();

    expect(screen.getByText('Endereço final')).toBeInTheDocument();

    expect(screen.getByText('Motorista 1')).toBeInTheDocument();

    expect(screen.getByText('100 km')).toBeInTheDocument();

    expect(screen.getByText('1h')).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });
});
