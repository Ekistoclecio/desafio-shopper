import { Header } from '@/components/Header';
import useGoogleMaps from '@/hooks/useGoogleMaps';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import * as S from './styles';
import { RideItem } from '@/components/RideItem';
import { Driver } from '@/types/driver';
import { useSnackbar } from '@/providers/Snackbar';
import RideService from '@/services/ride';

export const DriverSelect = () => {
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || null;
  const [loading, setLoading] = useState(false);
  const rideApiService = new RideService();
  const options: Driver[] = useMemo(() => {
    if (state) {
      return state.options;
    } else return [];
  }, [state]);

  const locations = useMemo(() => {
    if (state) {
      return {
        origin: {
          lat: state.origin.latitude as number,
          lng: state.origin.longitude as number,
        },
        destination: {
          lat: state.destination.latitude as number,
          lng: state.destination.longitude as number,
        },
      };
    } else return null;
  }, [state]);

  const mapRef = useGoogleMaps(locations?.origin, locations?.destination);

  const handleConfirmRide = (driver_id: number, driver_name: string, value: number) => {
    if (!state || loading) return;
    try {
      const confirmData = {
        customer_id: state.customer_id,
        origin: state.addresses.origin,
        destination: state.addresses.destination,
        distance: state.distance,
        duration: state.duration,
        driver: {
          id: driver_id,
          name: driver_name,
        },
        value,
      };
      setLoading(true);
      rideApiService.createRide(confirmData);
      navigate('/history', {
        replace: true,
        state: {
          customer_id: state.customer_id,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        error?.response?.data?.error_description || 'Desculpe, não foi possível processar sua solicitação';
      enqueueSnackbar(message, { severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!state) {
      navigate('/', { replace: true });
    }
  }, []);

  console.log(state);
  return (
    <>
      <Header title="Selecione sua corrida" hiddenNav />
      <S.MapContainer ref={mapRef} />
      <S.Content>
        <S.SelectRideContainer>
          {options.map((option, index) => (
            <RideItem
              key={index}
              driver={option}
              onClickSolicitation={() => handleConfirmRide(option.id, option.name, option.value)}
              disableSolicitationButton={loading}
            />
          ))}
        </S.SelectRideContainer>
        <S.BackButton
          disabled={loading}
          variant="outlined"
          color="primary"
          onClick={() => navigate('/', { replace: true })}
        >
          Voltar
        </S.BackButton>
      </S.Content>
    </>
  );
};
