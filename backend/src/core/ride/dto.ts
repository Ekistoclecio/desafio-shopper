import { ValidateFieldsError } from '@/core/errors/validateFieldsError';
import { GoogleMapsEstimateResponse } from '@/core/googleMaps/types';
import { RideConfirmRequestBody, RideEstimateRequestBody, RideEstimateResult } from '@/core/ride/types';

export class RideDTO {
  public validateEstimateRequestBody(requestBody: RideEstimateRequestBody): void {
    const validations = [
      { field: 'customer_id', message: 'O ID do usuário é obrigatório.' },
      { field: 'origin', message: 'O endereço de origem é obrigatório.' },
      { field: 'destination', message: 'O endereço de destino é obrigatório.' },
    ];

    validations.forEach(({ field, message }) => {
      if (!requestBody[field as keyof RideEstimateRequestBody]) {
        throw new ValidateFieldsError(message);
      }
    });
  }

  public validateConfirmRequestBody(requestBody: RideConfirmRequestBody): void {
    const validations = [
      { field: 'customer_id', message: 'O ID do usuário é obrigatório.' },
      { field: 'origin', message: 'O endereço de origem é obrigatório.' },
      { field: 'destination', message: 'O endereço de destino é obrigatório.' },
    ];

    validations.forEach(({ field, message }) => {
      if (!requestBody[field as keyof RideEstimateRequestBody]) {
        throw new ValidateFieldsError(message);
      }
    });

    if (!requestBody.driver || !requestBody.driver.id || !requestBody.driver.name) {
      throw new ValidateFieldsError('Os dados do motorista são inválidos ou estão incompletos.');
    }
  }

  public transformToRideEstimate(
    googleMapsEstimateResponse: GoogleMapsEstimateResponse,
  ): Omit<RideEstimateResult, 'options'> {
    const { legs, distanceMeters, duration } = googleMapsEstimateResponse.routes[0];
    const { startLocation, endLocation } = legs[0];

    return {
      origin: {
        latitude: startLocation.latLng.latitude,
        longitude: startLocation.latLng.longitude,
      },
      destination: {
        latitude: endLocation.latLng.latitude,
        longitude: endLocation.latLng.longitude,
      },
      distance: distanceMeters,
      duration,
      routeResponse: googleMapsEstimateResponse,
    };
  }
}

export const rideDTOInstance = new RideDTO();
