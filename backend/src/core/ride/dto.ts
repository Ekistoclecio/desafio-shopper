import { Driver } from '@/core/driver/entity';
import { GoogleMapsEstimateResponse } from '@/core/googleMaps/types';
import { RideEstimateResult } from '@/core/ride/types';

export class RideDTO {
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
