import { Driver } from '@/types/driver';

export type Ride = {
  id: number;
  date: string;
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
  options: Driver[];
  routeResponse: object;
};

export type CreateRideRequestBody = {
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

export type RideHistoryResult = {
  customer_id: string;
  rides: Ride[];
};
