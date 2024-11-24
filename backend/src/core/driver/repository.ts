import { MainDataSource } from '@/config/database/data-source';
import { Driver } from './entity';
import { LessThan, Repository } from 'typeorm';

export class DriverRepository {
  private static instance: DriverRepository | null = null;
  private repository: Repository<Driver>;

  private constructor() {
    this.repository = MainDataSource.getRepository(Driver);
  }

  public static getInstance(): DriverRepository {
    if (!DriverRepository.instance) {
      DriverRepository.instance = new DriverRepository();
    }
    return DriverRepository.instance;
  }

  public async getDriversByMinimumKm(rideDistanceInKm: number): Promise<any> {
    return this.repository.find({ where: { minimumRequiredKm: LessThan(rideDistanceInKm) } });
  }
}

export const driverRepositoryInstance = DriverRepository.getInstance();
