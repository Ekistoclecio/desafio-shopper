import { driverDTOInstance } from '@/core/driver/dto';
import { DriverRepository, driverRepositoryInstance } from '@/core/driver/repository';
import { DriverOption } from '@/core/driver/types';
import { BaseError } from '@/core/errors/baseError';

export class DriverService {
  private static instance: DriverService | null = null;

  private constructor(private readonly driverRepository: DriverRepository) {}

  public static getInstance(): DriverService {
    if (!DriverService.instance) {
      DriverService.instance = new DriverService(driverRepositoryInstance);
    }
    return DriverService.instance;
  }

  public async findAvailableDriverOptions(rideDistanceInMeters: number): Promise<DriverOption[]> {
    const distanceInKm = rideDistanceInMeters / 1000;
    const drivers = await this.driverRepository.getDriversByMinimumKm(Math.ceil(distanceInKm));

    if (!drivers || drivers.length === 0) {
      throw new BaseError({
        error_code: 'NO_DRIVERS_FOUND',
        error_description: 'Desculpe, atualmente a distancia minima para uma corrida é de 1 km.',
        response_code: 404,
      });
    }

    return driverDTOInstance.transformDriversToRideOptions(drivers, distanceInKm);
  }
}

export const driverServiceInstance = DriverService.getInstance();
