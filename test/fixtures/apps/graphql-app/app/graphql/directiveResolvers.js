'use strict';

exports.typeDef = `
directive @upper on FIELD_DEFINITION
`;

exports.directiveResolver = {
  upper(next) {
    return next().then(str => {
      if (typeof str === 'string') {
        return str.toUpperCase();
      }
      return str;
    });
  },
};
