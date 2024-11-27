import { z } from 'zod';

export const EstimateFormSchema = z.object({
  customer_id: z.string().min(6, 'O ID de usuário é obrigatório'),
  origin: z.string().min(1, 'O endereço de origem é obrigatório'),
  destination: z.string().min(1, 'O endereço de destino é obrigatório'),
});

export type EstimateFormData = z.infer<typeof EstimateFormSchema>;
