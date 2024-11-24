import { BaseErrorPayload } from '@/core/errors/types';

export class BaseError extends Error {
  public errorCode: string;
  public responseCode: number;
  public errorDescription: string;

  constructor({ error_code, error_description, response_code }: BaseErrorPayload) {
    super(error_description);
    this.responseCode = response_code;
    this.errorCode = error_code;
    this.errorDescription = error_description;
  }

  public toJSON() {
    return {
      error_code: this.errorCode,
      error_description: this.errorDescription,
      response_code: this.responseCode,
    };
  }
}
