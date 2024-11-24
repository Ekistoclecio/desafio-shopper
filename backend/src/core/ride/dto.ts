import { ValidateFieldsError } from '@/core/errors/validateFieldsError';
import { GoogleMapsEstimateResponse } from '@/core/googleMaps/types';
import { Ride } from '@/core/ride/entity';
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

  public validateRideHistoryRequestParams(params: { customer_id: string; driver_id?: string }): void {
    if (!params.customer_id || typeof params.customer_id !== 'string') {
      throw new ValidateFieldsError('Por favor digite um ID de usuário valido.');
    }

    if (params.driver_id && typeof Number(params.driver_id) !== 'number') {
      throw new ValidateFieldsError('Desculpe, mas o ID do motorista fornecido é invalido.');
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

  public transformToRideHistory(rides: Ride[]): any {
    return rides.map((ride) => ({
      id: ride.id,
      driver: {
        id: ride.driver?.id,
        name: ride.driver?.name,
      },
      origin: ride.origin,
      destination: ride.destination,
      distance: ride.distance,
      duration: ride.duration,
      value: ride.value,
      date: ride.date,
    }));
  }
}

export const rideDTOInstance = new RideDTO();
