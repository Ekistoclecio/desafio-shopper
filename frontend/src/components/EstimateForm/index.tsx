import * as S from './styles';
import { TextInput } from '@/components/TextInput';
import { useForm, Controller } from 'react-hook-form';
import { EstimateFormData, EstimateFormSchema } from '@/components/EstimateForm/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import RideService from '@/services/ride';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CircularProgress } from '@mui/material';
import { useSnackbar } from '@/providers/Snackbar';

export const EstimateForm = () => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EstimateFormData>({
    resolver: zodResolver(EstimateFormSchema),
  });
  const rideApiService = new RideService();

  const onSubmit = async (data: EstimateFormData) => {
    try {
      setLoading(true);
      const response = await rideApiService.rideEstimate(data);
      navigate('/driver-select', { state: response });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        error?.response?.data?.error_description || 'Desculpe, não foi possível processar sua solicitação';
      enqueueSnackbar(message, { severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container as="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="customer_id"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            onChange={onChange}
            value={value}
            label="ID de usuário"
            placeholder="Identificador único do usuário"
            errorMessage={errors.customer_id?.message}
          />
        )}
      />
      <Controller
        name="origin"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            onChange={onChange}
            value={value}
            label="Endereço de origem"
            placeholder="Ex: 1800 Amphitheatre Parkway, Mountain View, CA 94043"
            errorMessage={errors.origin?.message}
          />
        )}
      />
      <Controller
        name="destination"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            onChange={onChange}
            value={value}
            label="Endereço de destino"
            placeholder="Ex: Sloat Blvd &, Upper Great Hwy, San Francisco, CA 94132"
            errorMessage={errors.destination?.message}
          />
        )}
      />
      <S.SubmitButton type="submit" variant="contained" disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Calcular Rota'}
      </S.SubmitButton>
    </S.Container>
  );
};
