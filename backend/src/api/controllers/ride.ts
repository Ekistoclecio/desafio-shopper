import { RideService, rideServiceInstance } from '@/core/ride/service';
import { RideEstimateRequestBody, RideEstimateResult } from '@/core/ride/types';
import { Request, Response, Router } from 'express';

export class RideController {
  private constructor(private readonly rideService: RideService) {}

  public rideEstimate = async (req: Request<{}, {}, RideEstimateRequestBody>, res: Response): Promise<void> => {
    const response: RideEstimateResult = await this.rideService.getEstimate(req.body);
    res.status(200).json(response);
  };

  public createRide = async (req: Request, res: Response): Promise<any> => {
    await this.rideService.confirmRide(req.body);
    return res.status(200).json({ success: true });
  };

  public getRideHistory = async (req: Request, res: Response): Promise<any> => {
    const { customer_id } = req.params;
    const { driver_id } = req.query;
    const response = await this.rideService.getRideHistory(customer_id, driver_id as string);
    return res.status(200).json(response);
  };

  public static getRouter() {
    const controller = new RideController(rideServiceInstance);
    const router = Router();

    const basePath = '/ride';

    router.post(basePath + '/estimate', controller.rideEstimate);
    router.patch(basePath + '/confirm', controller.createRide);
    router.get(basePath + '/:customer_id', controller.getRideHistory);

    return router;
  }
}

export const rideRoutes = RideController.getRouter();
