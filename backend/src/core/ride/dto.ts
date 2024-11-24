import { ValidateFieldsError } from '@/core/errors/validateFieldsError';
import { GoogleMapsEstimateResponse } from '@/core/googleMaps/types';
import { RideEstimateRequestBody, RideEstimateResult } from '@/core/ride/types';

export class RideDTO {
  public validateEstimateRequestBody(requestBody: RideEstimateRequestBody): void {
    const validations = [
      { field: 'customer_id', message: 'O email é obrigatório.' },
      { field: 'origin', message: 'O endereço de origem é obrigatório.' },
      { field: 'destination', message: 'O endereço de destino é obrigatório.' },
    ];

    validations.forEach(({ field, message }) => {
      if (!requestBody[field as keyof RideEstimateRequestBody]) {
        throw new ValidateFieldsError(message);
      }
    });
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
