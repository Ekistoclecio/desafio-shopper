import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class ApiService {
  private api: AxiosInstance;

  constructor(entity: string) {
    this.api = axios.create({
      baseURL: `${import.meta.env.VITE_API_URL}/${entity}`,
      timeout: 10000,
    });
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return (await this.api.get<T>(url, config)).data;
  }

  public async post<T>(url: string, data: object, config?: AxiosRequestConfig): Promise<T> {
    return (await this.api.post<T>(url, data, config)).data;
  }

  public async patch<T>(url: string, data: object, config?: AxiosRequestConfig): Promise<T> {
    return (await this.api.patch<T>(url, data, config)).data;
  }
}

export default ApiService;
