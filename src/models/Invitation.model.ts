import { InvitationStatus } from "@prisma/client";
import { Invitation } from "../types/Invitation.types";

export abstract class InvitationRepository {
  abstract listInvitations(): Promise<Invitation[]>;
  abstract createInvitation(email: string): Promise<Invitation>;
  abstract getInvitationById(id: string): Promise<Invitation | null>;
  abstract getInvitationByEmail(email: string): Promise<Invitation | null>;
  abstract updateInvitationStatus(
    id: string,
    status: InvitationStatus
  ): Promise<Invitation | null>;
  abstract deleteInvitation(id: string): Promise<void>;
}
