import { DriverService, driverServiceInstance } from '@/core/driver/service';
import { RideService, rideServiceInstance } from '@/core/ride/service';
import { RideEstimateRequestBody, RideEstimateResult } from '@/core/ride/types';
import { Request, Response, Router } from 'express';

export class DriveController {
  private constructor(private readonly driverService: DriverService) {}

  public driverList = async (req: Request, res: Response): Promise<void> => {
    const response = await this.driverService.getDriverList();
    res.status(200).json(response);
  };

  public static getRouter() {
    const controller = new DriveController(driverServiceInstance);
    const router = Router();

    const basePath = '/driver';

    router.get(basePath + '/', controller.driverList);

    return router;
  }
}

export const driverRoutes = DriveController.getRouter();
