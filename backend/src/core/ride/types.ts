import { DriverOption } from '@/core/driver/types';
import { GoogleMapsEstimateResponse } from '@/core/googleMaps/types';

export type RideEstimateRequestBody = {
  customer_id: string;
  origin: string;
  destination: string;
};

export type RideEstimateResult = {
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  distance: number;
  duration: string;
  routeResponse: GoogleMapsEstimateResponse;
  options: DriverOption[];
};
