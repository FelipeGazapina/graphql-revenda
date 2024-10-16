import { PrismaClient, InvitationStatus } from "@prisma/client";
import { InvitationRepository } from "../models/Invitation.model";
import { Invitation } from "../types/Invitation.types";

const prisma = new PrismaClient();

export class PrismaInvitationRepository extends InvitationRepository {
  async listInvitations(): Promise<Invitation[]> {
    return prisma.invitation.findMany();
  }

  async createInvitation(
    email: string,
    status?: InvitationStatus
  ): Promise<Invitation> {
    return prisma.invitation.create({
      data: { email, status: status || "CREATED" },
    });
  }

  async getInvitationById(id: string): Promise<Invitation | null> {
    return prisma.invitation.findUnique({
      where: { id },
    });
  }
  async getInvitationByEmail(
    email: string,
    filter?: any
  ): Promise<Invitation | null> {
    return prisma.invitation.findFirst({
      where: { email, ...filter },
    });
  }

  async updateInvitationStatus(
    email: string,
    status: InvitationStatus,
    filter?: any
  ): Promise<Invitation | null> {
    return prisma.invitation.update({
      where: { email, ...filter },
      data: { status },
    });
  }

  async deleteInvitation(id: string): Promise<void> {
    await prisma.invitation.delete({
      where: { id },
    });
  }
}
