'use strict';

exports.typeDef = `
type Project {
  name: String!
}

type Roles {
 name: String!
}
`;

exports.resolver = {
  Query: {
    projects() {
      return [];
    },
  },
};
