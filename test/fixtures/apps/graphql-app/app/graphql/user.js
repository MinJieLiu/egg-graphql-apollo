'use strict';

exports.typeDef = `
type Query {
  user(id: Int): User
  projects: [Project!]
  today: Date @date
}

type User {
  id: String!
  password: String!
  name: String! @deprecated(reason: "Use 'upperName'.")
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
