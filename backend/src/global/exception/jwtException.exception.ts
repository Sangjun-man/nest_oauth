export class JWTException extends Error {
  status: string;
  constructor(message: string, status?: string) {
    super();
    this.message = message;
    this.name = 'JWTEception';
    this.status = status;
  }
}
