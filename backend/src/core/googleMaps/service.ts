import { BaseError } from '@/core/errors/baseError';
import { GoogleMapsEstimateResponse } from '@/core/googleMaps/types';
import axios, { AxiosInstance } from 'axios';

const API_KEY = process.env.GOOGLE_API_KEY;

export class GoogleMapsService {
  private static instance: GoogleMapsService | null = null;
  private client: AxiosInstance;

  private constructor() {
    this.client = axios.create({
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': `${API_KEY}`,
      },
    });
  }

  public static getInstance(): GoogleMapsService {
    if (!GoogleMapsService.instance) {
      GoogleMapsService.instance = new GoogleMapsService();
    }
    return GoogleMapsService.instance;
  }

  public async calculateEstimate(
    origin_address: string,
    destination_address: string,
  ): Promise<GoogleMapsEstimateResponse> {
    const response = await this.client.post(
      'https://routes.googleapis.com/directions/v2:computeRoutes',
      {
        origin: { address: origin_address },
        destination: { address: destination_address },
      },
      {
        headers: {
          'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.legs.startLocation,routes.legs.endLocation',
        },
      },
    );

    if (response.data.error) {
      throw new BaseError({
        error_code: 'INTERNAL_ERROR',
        error_description: 'Desculpe, não foi possível calcular a rota. Por favor, tente novamente mais tarde.',
        response_code: 500,
      });
    }

    return response.data;
  }
}

export const googleMapsServiceInstance = GoogleMapsService.getInstance();
