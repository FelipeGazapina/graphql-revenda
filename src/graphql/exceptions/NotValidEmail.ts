export class NotValidEmailException extends Error {
  constructor(message: string) {
    super(message); // Call the parent class constructor
    this.name = this.constructor.name; // Set the error name
    Error.captureStackTrace(this, this.constructor); // Capture the stack trace
  }
}
