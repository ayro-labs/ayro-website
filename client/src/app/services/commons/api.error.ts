import {Response} from '@angular/http';

export class ApiError extends Error {

  public static withResponse(err: Response): ApiError {
    const errData = err.json();
    return new ApiError(err.status, errData.key, errData.message);
  }

  public status: number;
  public key: string;
  public message: string;

  constructor(status: number, key: string, message: string) {
    super();
    this.status = status;
    this.key = key;
    this.message = message;
  }
}
