import { DriverOption } from '@/core/driver/types';
import { GoogleMapsEstimateResponse } from '@/core/googleMaps/types';

export type RideEstimateRequestBody = {
  customer_id: string;
  origin: string;
  destination: string;
};

export type RideConfirmRequestBody = {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
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
