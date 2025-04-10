export class InvalidCredentialsError extends Error {
    constructor(message: string = 'Invalid credentials provided.') {
      super(message);
      this.name = 'InvalidCredentialsError';
    }
  }
  