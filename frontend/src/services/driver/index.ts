import ApiService from '..';
import { DriverSummary } from '@/types/driver';

class DriverService extends ApiService {
  constructor() {
    super('driver');
  }

  public findAll(): Promise<DriverSummary[]> {
    return this.get<DriverSummary[]>('/');
  }
}

export default DriverService;
