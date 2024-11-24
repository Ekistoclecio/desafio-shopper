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

  public async findDriversByMinimumKm(rideDistanceInKm: number): Promise<Driver[]> {
    return this.repository.find({ where: { minimumRequiredKm: LessThan(rideDistanceInKm) } });
  }

  public async findById(id: number): Promise<Driver | null> {
    return this.repository.findOneBy({ id });
  }
}

export const driverRepositoryInstance = DriverRepository.getInstance();
