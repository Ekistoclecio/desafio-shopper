import { Driver } from '@/core/driver/entity';
import { DriverOption } from '@/core/driver/types';

export class DriverDTO {
  public transformDriversToRideOptions(drivers: Driver[], distanceInKm: number): DriverOption[] {
    return drivers.map((driver) => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      review: {
        rating: driver.reviewRating,
        comment: driver.reviewComment,
      },
      value: Number((driver.pricePerKm * distanceInKm).toFixed(2)),
    }));
  }
}

export const driverDTOInstance = new DriverDTO();
