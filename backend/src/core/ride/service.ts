import { DriverRepository, driverRepositoryInstance } from '@/core/driver/repository';
import { DriverService, driverServiceInstance } from '@/core/driver/service';
import { BaseError } from '@/core/errors/baseError';
import { GoogleMapsService, googleMapsServiceInstance } from '@/core/googleMaps/service';
import { rideDTOInstance } from '@/core/ride/dto';
import { Ride } from '@/core/ride/entity';
import { RideRepository, rideRepositoryInstance } from '@/core/ride/repository';
import {
  RideConfirmRequestBody,
  RideEstimateRequestBody,
  RideEstimateResult,
  RideHistoryResponse,
} from '@/core/ride/types';

export class RideService {
  private static instance: RideService | null = null;

  private constructor(
    private readonly rideRepository: RideRepository,
    private readonly driveRepository: DriverRepository,
    private readonly driverService: DriverService,
    private readonly googleMapsService: GoogleMapsService,
  ) {}

  public static getInstance(): RideService {
    if (!RideService.instance) {
      RideService.instance = new RideService(
        rideRepositoryInstance,
        driverRepositoryInstance,
        driverServiceInstance,
        googleMapsServiceInstance,
      );
    }
    return RideService.instance;
  }

  public async getEstimate(data: RideEstimateRequestBody): Promise<RideEstimateResult> {
    rideDTOInstance.validateEstimateRequestBody(data);
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

  public async confirmRide(data: RideConfirmRequestBody): Promise<void> {
    rideDTOInstance.validateConfirmRequestBody(data);

    if (data.origin === data.destination || !data.distance) {
      throw new BaseError({
        error_code: 'INVALID_DATA',
        error_description: 'O endereço de origem e destino não podem ser iguais.',
        response_code: 400,
      });
    }

    const driver = await this.driveRepository.findById(data.driver.id);

    if (!driver) {
      throw new BaseError({
        error_code: 'DRIVER_NOT_FOUND',
        error_description: 'Desculpe, não foi possível encontrar o motorista selecionado.',
        response_code: 404,
      });
    }

    if (driver.minimumRequiredKm > Math.ceil(data.distance / 1000)) {
      throw new BaseError({
        error_code: 'INVALID_DISTANCE',
        error_description: 'Desculpe, o motorista selecionado não está disponível para a distância dessa viagem.',
        response_code: 406,
      });
    }

    const newRide = new Ride(
      data.customer_id,
      new Date(),
      data.origin,
      data.destination,
      data.distance,
      data.duration,
      data.value,
      driver,
    );

    await this.rideRepository.create(newRide);
  }

  public async getRideHistory(customer_id: string, driver_id?: string): Promise<RideHistoryResponse> {
    rideDTOInstance.validateRideHistoryRequestParams({ customer_id, driver_id });
    const rides = await this.rideRepository.findByCustomerId(customer_id, Number(driver_id));
    if (!rides || rides.length === 0) {
      throw new BaseError({
        error_code: 'NO_RIDES_FOUND',
        error_description: 'Não foi possível encontrar nenhuma viagem para o cliente informado.',
        response_code: 404,
      });
    }
    return {
      customer_id,
      rides: rideDTOInstance.transformToRideHistory(rides),
    };
  }
}

export const rideServiceInstance = RideService.getInstance();
