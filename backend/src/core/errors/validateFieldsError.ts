import { BaseError } from '@/core/errors/baseError';

export class ValidateFieldsError extends BaseError {
  constructor(message: string) {
    super({
      error_code: 'INVALID_DATA',
      response_code: 400,
      error_description: message,
    });
  }
}
