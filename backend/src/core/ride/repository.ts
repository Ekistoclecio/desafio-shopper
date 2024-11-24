import { MainDataSource } from '@/config/database/data-source';
import { Ride } from './entity';
import { Repository } from 'typeorm';

export class RideRepository {
  private static instance: RideRepository | null = null;
  private repository: Repository<Ride>;

  private constructor() {
    this.repository = MainDataSource.getRepository(Ride);
  }

  public static getInstance(): RideRepository {
    if (!RideRepository.instance) {
      RideRepository.instance = new RideRepository();
    }
    return RideRepository.instance;
  }

  public async create(ride: Ride): Promise<Ride> {
    return this.repository.save(ride);
  }
}

export const rideRepositoryInstance = RideRepository.getInstance();
