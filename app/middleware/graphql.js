'use strict';

const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa');

module.exports = ({
  router: graphQLRouter,
  graphiql = true,
  onPreGraphiQL,
  onPreGraphQL,
}, app) => async (ctx, next) => {
  if (ctx.path === graphQLRouter) {
    if (ctx.request.accepts([ 'json', 'html' ]) === 'html' && graphiql) {
      if (onPreGraphiQL) {
        await onPreGraphiQL(ctx);
      }
      return graphiqlKoa({
        endpointURL: graphQLRouter,
      })(ctx);
    }
    if (onPreGraphQL) {
      await onPreGraphQL(ctx);
    }
    return graphqlKoa({
      schema: app.schema,
      context: ctx,
    })(ctx);
  }
  await next();
};
