import { DriverSelectFilter, DriverSelectOption } from '@/components/DriverSelectFilter';
import { Header } from '@/components/Header';
import { TextInput } from '@/components/TextInput';
import { CircularProgress, debounce } from '@mui/material';
import { useEffect, useState } from 'react';

import * as S from './styles';
import { HistoryItem } from '@/components/HistoryItem';
import { NoDataHistory } from '@/components/NoDataHistory';
import { useLocation } from 'react-router';
import { Ride } from '@/types/ride';
import { useSnackbar } from '@/providers/Snackbar';
import RideService from '@/services/ride';
import { formatRideData } from '@/utils/formatRideData';
import DriverService from '@/services/driver';

export const History = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [customerID, setCustomerID] = useState('');
  const [driver, setDriver] = useState<DriverSelectOption>({ label: 'Todos', value: -1 });
  const [driverOptions, setDriverOptions] = useState<DriverSelectOption[]>([]);
  const [history, setHistory] = useState<Ride[] | null>(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const customerIDParam = location.state?.customer_id || null;
  const rideApiService = new RideService();
  const driverApiService = new DriverService();

  const fetchDrivers = async () => {
    try {
      const response = await driverApiService.findAll();
      const drivers = response.map((driver) => ({
        label: driver.name,
        value: driver.id,
      }));
      drivers.push({ label: 'Todos', value: -1 });
      setDriverOptions(drivers);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        error?.response?.data?.error_description || 'Desculpe, não foi possível processar sua solicitação';
      enqueueSnackbar(message, { severity: 'error' });
    }
  };

  const fetchHistory = async () => {
    if (loading || !customerID) return;
    setLoading(true);
    try {
      const driverID = driver.value === -1 ? undefined : Number(driver.value);
      const response = await rideApiService.getRideHistory(customerID, driverID);
      const rides = response.rides.map((ride) => formatRideData(ride));
      setHistory(rides);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setHistory([]);
      const message =
        error?.response?.data?.error_description || 'Desculpe, não foi possível processar sua solicitação';
      enqueueSnackbar(message, { severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const debounceFetchHistory = debounce(fetchHistory, 500);

  useEffect(() => {
    fetchDrivers();
    if (customerIDParam) {
      setCustomerID(customerIDParam);
    }
  }, []);

  useEffect(() => {
    if (customerID) {
      debounceFetchHistory();
    }
    return () => debounceFetchHistory.clear();
  }, [customerID]);

  useEffect(() => {
    fetchHistory();
  }, [driver]);

  return (
    <>
      <Header title="Histórico de viagens" />
      <S.Content>
        <TextInput
          label="ID do usuário"
          placeholder="Identificador único do usuário"
          onChange={(value) => {
            setCustomerID(value);
          }}
          value={customerID}
        />
        <DriverSelectFilter
          label="Motorista"
          options={driverOptions}
          selectedOption={driver}
          onChange={(newValue) => {
            setDriver(newValue);
          }}
        />
      </S.Content>
      <S.HistoryContainer>
        {!loading && <>{history && history.map((ride) => <HistoryItem key={ride.id} ride={ride} />)}</>}
        {loading && (
          <S.LoadingContainer>
            <CircularProgress />
          </S.LoadingContainer>
        )}
        {!loading && history && history.length === 0 && (
          <NoDataHistory
            message={
              !customerID
                ? 'Pos favor digite seu identificador de usuário para acessar seu histórico'
                : 'Ops, parece que voce ainda não realizou nenhuma viagem.'
            }
          />
        )}
      </S.HistoryContainer>
    </>
  );
};
