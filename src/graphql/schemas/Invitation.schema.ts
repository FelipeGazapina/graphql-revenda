import { gql } from "apollo-server";

export const InvitationSchema = gql`
  directive @validateEmail on ARGUMENT_DEFINITION

  type Invitation {
    id: ID!
    email: String!
    status: InvitationStatus!
  }

  enum InvitationStatus {
    SENT
    ACCEPTED
    DENIED
    RESENDED
    CREATED
  }

  type Query {
    listInvitations: [Invitation!]!
    invitation(id: ID!): Invitation
  }

  type Mutation {
    createInvitation(email: String!): Invitation!
    sendInvitation(email: String!): Invitation!
    updateInvitationStatus(id: ID!, status: InvitationStatus!): Invitation!
    deleteInvitation(id: ID!): Boolean!
  }
`;
