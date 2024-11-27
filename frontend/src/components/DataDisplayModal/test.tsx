import { screen } from '@testing-library/react';

import { DataDisplayModal } from '.';

import { renderWithTheme } from '@/utils/tests/helpers';

describe('<DataDisplayModal />', () => {
  it('should render the heading', () => {
    const { container } = renderWithTheme(
      <DataDisplayModal open={true} handleClose={() => {}} title="Modal de exemplo">
        <p>Conteúdo do modal</p>
      </DataDisplayModal>,
    );

    expect(screen.getByRole('heading', { name: /Modal de exemplo/i })).toBeInTheDocument();
    expect(screen.getByText(/Conteúdo do modal/i)).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call handleClose when close button is clicked', () => {
    const handleClose = jest.fn();

    renderWithTheme(
      <DataDisplayModal open={true} handleClose={handleClose} title="Modal de exemplo">
        <p>Conteúdo do modal</p>
      </DataDisplayModal>,
    );

    const closeButton = screen.getByRole('button', { name: /fechar/i });
    closeButton.click();

    expect(handleClose).toHaveBeenCalled();
  });
});
