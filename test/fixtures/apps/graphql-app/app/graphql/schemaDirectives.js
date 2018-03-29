'use strict';

const { SchemaDirectiveVisitor } = require('graphql-tools');
const { GraphQLString } = require('graphql');
const moment = require('moment');

exports.typeDef = `
directive @date(
  defaultFormat: String = "YYYY-MM-DD"
) on FIELD_DEFINITION

scalar Date
`;

exports.schemaDirective = {
  date: class FormatDateDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
      const { defaultFormat } = this.args;

      field.args.push({
        name: 'format',
        type: GraphQLString,
      });

      field.resolve = async function(
        source,
        args
      ) {
        const theDay = moment('2018-03-29', 'YYYY-MM-DD');
        return theDay.format(args.format || defaultFormat);
      };

      field.type = GraphQLString;
    }
  },
};
