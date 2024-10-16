import { PrismaInvitationRepository } from "../../repositories/Invitation.repository";
import sendEmail from "../../services/mailpit/mail.service";
import { isValidEmail } from "../../utils/validators";
import { InvitationNotFoundException } from "../exceptions/InvitationNotFound";
import { NotValidEmailException } from "../exceptions/NotValidEmail";
import { SendEmailException } from "../exceptions/SendEmail";
import { UpdateInvitationException } from "../exceptions/UpdateInvitation";

const invitationRepository = new PrismaInvitationRepository();

export const InvitationResolvers = {
  Query: {
    listInvitations: async () => {
      return await invitationRepository.listInvitations();
    },
    invitation: async (_: any, { id }: { id: string }) => {
      return await invitationRepository.getInvitationById(id);
    },
  },
  Mutation: {
    createInvitation: async (_: any, { email }: { email: string }) => {
      if (isValidEmail(email)) {
        const info = await sendEmail(
          email,
          "You was invited to be part of our private store",
          "click in this link to enter in our store LINK"
        );

        if (info) {
          return await invitationRepository.createInvitation(email, "SENT");
        }
        return await invitationRepository.createInvitation(email);
      }

      return new NotValidEmailException("Email inválido");
    },
    sendInvitation: async (_: any, { email }: { email: string }) => {
      const invitation = await invitationRepository.getInvitationByEmail(
        email,
        { status: "CREATED" }
      );
      if (!invitation) return new InvitationNotFoundException();

      if (!isValidEmail(email))
        return new NotValidEmailException("Email inválido");

      const info = await sendEmail(
        email,
        "You was invited to be part of our private store",
        "click in this link to enter in our store LINK"
      );

      if (!info)
        return new SendEmailException(
          "Erro ao enviar email, tente novamente mais tarde."
        );

      try {
        return await invitationRepository.updateInvitationStatus(email, "SENT");
      } catch (error) {
        return new UpdateInvitationException(
          "Erro ao atualizar status do email, tente novamente mais tarde."
        );
      }
    },
  },
};
