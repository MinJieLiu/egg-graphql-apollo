'use strict';

exports.typeDef = `
type Query {
  user(id: Int): User
  projects: [Project!]
}

type User {
  id: String!
  password: String!
  name: String!
  upperName: String @upper
  projects: [Project!]
}
`;

exports.resolver = {
  Query: {
    user(root, { id }, ctx) {
      return ctx.service.user.fetchById(id);
    },
  },
};
