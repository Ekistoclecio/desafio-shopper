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

  public async findByCustomerId(customerId: string, driver_id?: number): Promise<Ride[]> {
    const where: { customerId: string; driver?: { id: number } } = { customerId };

    if (driver_id) {
      where.driver = { id: driver_id };
    }

    return await this.repository.find({
      where,
      order: {
        date: 'DESC',
      },
    });
  }
}

export const rideRepositoryInstance = RideRepository.getInstance();
