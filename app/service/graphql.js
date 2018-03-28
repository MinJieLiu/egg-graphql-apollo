'use strict';

const egg = require('egg');
const { execute, formatError } = require('graphql');
const gql = require('graphql-tag');

module.exports = class GraphqlService extends egg.Service {

  async query(requestString) {
    const ctx = this.ctx;

    try {
      const params = JSON.parse(requestString);
      const { query, variables, operationName } = params;
      // GraphQL source.
      // https://github.com/apollostack/graphql-tag#caching-parse-results
      const documentAST = gql`${query}`;

      // http://graphql.org/graphql-js/execution/#execute
      const result = await execute(
        ctx.app.schema,
        documentAST,
        null,
        ctx,
        variables,
        operationName
      );

      // Format any encountered errors.
      /* istanbul ignore if */
      if (result && result.errors) {
        result.errors = result.errors.map(formatError);
      }
      return result;
    } catch (e) {
      this.logger.error(e);

      return {
        data: {},
        errors: [ e ],
      };
    }
  }
};
