export class InvitationNotFoundException extends Error {
  constructor(message?: string) {
    super(message || "Invitation not found");
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
