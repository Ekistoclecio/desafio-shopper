import { DriverService, driverServiceInstance } from '@/core/driver/service';
import { BaseError } from '@/core/errors/baseError';
import { GoogleMapsService, googleMapsServiceInstance } from '@/core/googleMaps/service';
import { rideDTOInstance } from '@/core/ride/dto';
import { RideRepository, rideRepositoryInstance } from '@/core/ride/repository';
import { RideEstimateRequestBody, RideEstimateResult } from '@/core/ride/types';

export class RideService {
  private static instance: RideService | null = null;

  private constructor(
    private readonly rideRepository: RideRepository,
    private readonly driverService: DriverService,
    private readonly googleMapsService: GoogleMapsService,
  ) {}

  public static getInstance(): RideService {
    if (!RideService.instance) {
      RideService.instance = new RideService(rideRepositoryInstance, driverServiceInstance, googleMapsServiceInstance);
    }
    return RideService.instance;
  }

  public validateEstimateRequest(requestBody: RideEstimateRequestBody): void {
    if (!requestBody.customer_id) {
      throw new BaseError({
        error_code: 'INVALID_DATA',
        error_description: 'O email é obrigatório',
        response_code: 400,
      });
    }
    if (!requestBody.origin) {
      throw new BaseError({
        error_code: 'INVALID_DATA',
        error_description: 'O endereço de origem é obrigatório',
        response_code: 400,
      });
    }
    if (!requestBody.destination) {
      throw new BaseError({
        error_code: 'INVALID_DATA',
        error_description: 'O endereço de destino é obrigatório',
        response_code: 400,
      });
    }
  }

  public async getEstimate(data: RideEstimateRequestBody): Promise<RideEstimateResult> {
    this.validateEstimateRequest(data);
    const googleMapsEstimateResponse = await this.googleMapsService.calculateEstimate(data.origin, data.destination);

    if (!googleMapsEstimateResponse.routes || googleMapsEstimateResponse.routes.length === 0) {
      throw new BaseError({
        error_code: 'NO_ROUTE_FOUND',
        error_description: 'Não foi possível encontrar uma rota para o trajeto informado.',
        response_code: 404,
      });
    }

    const driversAvailable = await this.driverService.findAvailableDriverOptions(
      googleMapsEstimateResponse.routes[0].distanceMeters,
    );
    return { ...rideDTOInstance.transformToRideEstimate(googleMapsEstimateResponse), options: driversAvailable };
  }
}

export const rideServiceInstance = RideService.getInstance();
