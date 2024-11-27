import { fireEvent, screen, waitFor } from '@testing-library/react';

import { EstimateForm } from '.';

import { renderWithTheme } from '@/utils/tests/helpers';
import userEvent from '@testing-library/user-event';
import RideService from '@/services/ride';

const enqueueSnackbarMock = jest.fn();
jest.mock('@/providers/Snackbar', () => ({
  useSnackbar: jest.fn(() => ({
    enqueueSnackbar: enqueueSnackbarMock,
  })),
}));

jest.mock('@/config/env', () => ({
  env: {
    API_URL: 'http://localhost:mock',
  },
}));

describe('<EstimateForm />', () => {
  it('should render the EstimateForm', () => {
    renderWithTheme(<EstimateForm />);

    expect(screen.getByRole('textbox', { name: /id de usuário/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /endereço de origem/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /endereço de destino/i })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /calcular rota/i })).toBeInTheDocument();
  });

  it('should call rideEstimate API with correct values when form is submitted', async () => {
    const rideEstimateMock = jest.fn().mockResolvedValue({ driver: 'Test Driver' });
    RideService.prototype.rideEstimate = rideEstimateMock;

    const navigateMock = jest.fn();
    jest.mock('react-router', () => ({
      useNavigate: () => navigateMock,
    }));

    renderWithTheme(<EstimateForm />);

    await userEvent.type(screen.getByRole('textbox', { name: /id de usuário/i }), '123456');
    await userEvent.type(screen.getByRole('textbox', { name: /endereço de origem/i }), 'Rua A');
    await userEvent.type(screen.getByRole('textbox', { name: /endereço de destino/i }), 'Rua B');

    const button = screen.getByRole('button', { name: /calcular rota/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(rideEstimateMock).toHaveBeenCalledTimes(1);
      expect(rideEstimateMock).toHaveBeenCalledWith({
        customer_id: '123456',
        origin: 'Rua A',
        destination: 'Rua B',
      });
    });

    waitFor(() => {
      expect(navigateMock).toHaveBeenCalledTimes(1);
      expect(navigateMock).toHaveBeenCalledWith('/driver-select', { state: { driver: 'Test Driver' } });
    });
  });

  it('should not call rideEstimate API when form is invalid', async () => {
    const rideEstimateMock = jest.fn();
    RideService.prototype.rideEstimate = rideEstimateMock;

    renderWithTheme(<EstimateForm />);

    const button = screen.getByRole('button', { name: /calcular rota/i });
    fireEvent.click(button);

    expect(rideEstimateMock).not.toHaveBeenCalled();
  });

  it('should handle errors when the API request fails with error_description', async () => {
    const rideEstimateMock = jest.fn().mockRejectedValue({
      response: { data: { error_description: 'API Error' } },
    });
    RideService.prototype.rideEstimate = rideEstimateMock;

    renderWithTheme(<EstimateForm />);

    await userEvent.type(screen.getByRole('textbox', { name: /id de usuário/i }), '123456');
    await userEvent.type(screen.getByRole('textbox', { name: /endereço de origem/i }), 'Rua A');
    await userEvent.type(screen.getByRole('textbox', { name: /endereço de destino/i }), 'Rua B');

    const button = screen.getByRole('button', { name: /calcular rota/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(rideEstimateMock).toHaveBeenCalledTimes(1);
      expect(rideEstimateMock).toHaveBeenCalledWith({
        customer_id: '123456',
        origin: 'Rua A',
        destination: 'Rua B',
      });

      expect(enqueueSnackbarMock).toHaveBeenCalledTimes(1);
      expect(enqueueSnackbarMock).toHaveBeenCalledWith('API Error', { severity: 'error' });
    });
  });

  it('should handle errors when the API request fails', async () => {
    const rideEstimateMock = jest.fn().mockRejectedValue({
      response: {},
    });
    RideService.prototype.rideEstimate = rideEstimateMock;

    renderWithTheme(<EstimateForm />);

    await userEvent.type(screen.getByRole('textbox', { name: /id de usuário/i }), '123456');
    await userEvent.type(screen.getByRole('textbox', { name: /endereço de origem/i }), 'Rua A');
    await userEvent.type(screen.getByRole('textbox', { name: /endereço de destino/i }), 'Rua B');

    const button = screen.getByRole('button', { name: /calcular rota/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(rideEstimateMock).toHaveBeenCalledTimes(1);
      expect(rideEstimateMock).toHaveBeenCalledWith({
        customer_id: '123456',
        origin: 'Rua A',
        destination: 'Rua B',
      });

      expect(enqueueSnackbarMock).toHaveBeenCalledTimes(2);
      expect(enqueueSnackbarMock).toHaveBeenCalledWith('Desculpe, não foi possível processar sua solicitação', {
        severity: 'error',
      });
    });
  });

  it('should display loading state when form is submitted', async () => {
    const rideEstimateMock = jest.fn().mockResolvedValueOnce({ driver: 'Test Driver' });
    RideService.prototype.rideEstimate = rideEstimateMock;

    renderWithTheme(<EstimateForm />);

    await userEvent.type(screen.getByRole('textbox', { name: /id de usuário/i }), '123456');
    await userEvent.type(screen.getByRole('textbox', { name: /endereço de origem/i }), 'Rua A');
    await userEvent.type(screen.getByRole('textbox', { name: /endereço de destino/i }), 'Rua B');

    const button = screen.getByRole('button', { name: /calcular rota/i });

    expect(button).not.toBeDisabled();
    expect(button).toHaveTextContent('Calcular Rota');

    fireEvent.click(button);

    waitFor(() => {
      expect(button).toBeDisabled();
      expect(screen.getByTestId('progressbar')).toBeInTheDocument();
      expect(button).not.toHaveTextContent('Calcular Rota');
      expect(rideEstimateMock).toHaveBeenCalledTimes(1);
    });

    expect(button).not.toBeDisabled();
    expect(screen.queryByTestId('progressbar')).not.toBeInTheDocument();
    expect(button).toHaveTextContent('Calcular Rota');
  });
});
