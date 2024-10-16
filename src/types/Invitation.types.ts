import { InvitationStatus } from "@prisma/client";

export interface Invitation {
  id: string;
  email: string;
  status: InvitationStatus;
}
