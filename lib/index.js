'use strict';

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const {
  makeExecutableSchema,
} = require('graphql-tools');
const merge = require('lodash.merge');
const { loadFile, loadScript } = require('./utils');

const SYMBOL_SCHEMA = Symbol('Applicaton#schema');
const readDirAsync = promisify(fs.readdir);

module.exports = async app => {
  const basePath = path.join(app.baseDir, 'app/graphql');
  const filenameArr = await readDirAsync(basePath);

  // typeDefs
  const schemaArr = await Promise.all(
    filenameArr
      .filter(name => name.endsWith('.graphql'))
      .map(name => loadFile(basePath, name))
  );

  // resolvers and directives
  const {
    typeDefs,
    resolvers,
    directiveResolvers,
    schemaDirectives,
  } = await Promise.all(
    filenameArr
      .filter(name => name.endsWith('.js'))
      .map(name => loadScript(basePath, name)))
    .then(arr => arr.reduce((prev, curr) => ({
      typeDefs: curr.typeDef ? prev.typeDefs.concat(curr.typeDef) : prev.typeDefs,
      resolvers: merge(prev.resolvers, curr.resolver),
      directiveResolvers: merge(prev.directiveResolvers, curr.directiveResolver),
      schemaDirectives: merge(prev.schemaDirectives, curr.schemaDirective),
    }), {
      typeDefs: [],
      resolvers: {},
      directiveResolvers: {},
      schemaDirectives: {},
    }));

  Object.defineProperty(app, 'schema', {
    get() {
      if (!this[SYMBOL_SCHEMA]) {
        this[SYMBOL_SCHEMA] = makeExecutableSchema({
          typeDefs: schemaArr.concat(typeDefs),
          resolvers,
          directiveResolvers,
          schemaDirectives,
        });
      }
      return this[SYMBOL_SCHEMA];
    },
  });
};
