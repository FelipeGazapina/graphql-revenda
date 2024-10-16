import express from "express";
import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";
import { InvitationSchema } from "./graphql/schemas/Invitation.schema";
import { InvitationResolvers } from "./graphql/resolvers/Invitation.resolver";

dotenv.config();

const typeDefs = [InvitationSchema];

const resolvers = [InvitationResolvers];

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const PORT = process.env.PORT || 4000;
server.listen(PORT).finally(() => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
});
