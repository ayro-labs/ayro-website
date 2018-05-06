import {Response} from '@angular/http';

export class ApiError extends Error {

  public static INTEGRATION_DOES_NOT_EXIST = 'integration.doesNotExist';

  public status?: number;
  public code: string;
  public message: string;
  public cause?: string;

  public static withResponse(err: Response): ApiError {
    const data = err.json();
    return new ApiError(data.code, data.message, err.status, data.cause);
  }

  constructor(code: string, message?: string, status?: number, cause?: any) {
    super();
    this.status = status;
    this.code = code;
    this.message = message;
    this.cause = cause;
  }
}
