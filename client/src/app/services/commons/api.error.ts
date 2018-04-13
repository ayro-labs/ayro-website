import {Response} from '@angular/http';

export class ApiError extends Error {

  public static INTEGRATION_DOES_NOT_EXIST = 'integration.doesNotExist';

  public status: number;
  public code: string;
  public message: string;
  public cause: string;

  public static withResponse(err: Response): ApiError {
    const data = err.json();
    return new ApiError(err.status, data.code, data.message, data.cause);
  }

  constructor(status: number, code: string, message: string, cause: any) {
    super();
    this.status = status;
    this.code = code;
    this.message = message;
    this.cause = cause;
  }
}
