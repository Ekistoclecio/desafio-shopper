import { CreateRideRequestBody, RideEstimateRequestBody, RideEstimateResult, RideHistoryResult } from '@/types/ride';
import ApiService from '..';

class RideService extends ApiService {
  constructor() {
    super('ride');
  }

  public rideEstimate(data: RideEstimateRequestBody): Promise<RideEstimateResult> {
    return this.post<RideEstimateResult>('/estimate', data);
  }

  public createRide(data: CreateRideRequestBody): Promise<void> {
    return this.patch<void>(`/confirm`, data);
  }

  public getRideHistory(customer_id: string, driver_id?: number): Promise<RideHistoryResult> {
    return this.get<RideHistoryResult>(`/${customer_id}${driver_id ? `?driver_id=${driver_id}` : ''}`);
  }
}

export default RideService;
