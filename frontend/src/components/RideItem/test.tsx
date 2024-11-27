import { fireEvent, screen, waitFor } from '@testing-library/react';

import { RideItem } from '.';

import { renderWithTheme } from '@/utils/tests/helpers';

describe('<RideItem />', () => {
  it('should render the RideItem', () => {
    const { container } = renderWithTheme(
      <RideItem
        driver={{
          id: 1,
          name: 'Teste Motorista',
          description: 'Teste Descrição',
          value: 10,
          vehicle: 'Teste Veículo',
          review: {
            rating: 4,
            comment: 'Teste Comentário',
          },
        }}
        onClickSolicitation={() => {}}
      />,
    );

    expect(screen.getByText('Teste Motorista')).toBeInTheDocument();
    expect(screen.getByText('Teste Descrição')).toBeInTheDocument();
    expect(screen.getByText('Teste Veículo')).toBeInTheDocument();
    expect(screen.getByText('R$ 10')).toBeInTheDocument();

    waitFor(() => {
      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  //tooltip test
  it('should render the tooltip', () => {
    renderWithTheme(
      <RideItem
        driver={{
          id: 1,
          name: 'Teste Motorista',
          description: 'Teste Descrição',
          value: 10,
          vehicle: 'Teste Veículo',
          review: {
            rating: 4,
            comment: 'Teste Comentário',
          },
        }}
        onClickSolicitation={() => {}}
      />,
    );

    const ratingElement = screen.getByText('Teste Motorista');

    fireEvent.mouseOver(ratingElement);

    waitFor(() => {
      expect(screen.getByText('Teste Comentário')).toBeInTheDocument();
    });
  });

  it('should call onClickSolicitation when clicked', () => {
    const onClick = jest.fn();

    renderWithTheme(
      <RideItem
        driver={{
          id: 1,
          name: 'Teste Motorista',
          description: 'Teste Descrição',
          value: 10,
          vehicle: 'Teste Veículo',
          review: {
            rating: 4,
            comment: 'Teste Comentário',
          },
        }}
        onClickSolicitation={onClick}
      />,
    );

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
