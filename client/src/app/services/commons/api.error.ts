import {Response} from '@angular/http';

export class ApiError extends Error {

  public status: number;
  public key: string;
  public message: string;

  constructor(err: Response) {
    super();
    const errData = err.json();
    this.status = err.status;
    this.key = errData.key;
    this.message = errData.message;
  }
}
