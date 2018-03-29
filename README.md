# egg-graphql-apollo

[![npm](https://img.shields.io/npm/v/egg-graphql-apollo.svg?style=flat-square)](https://www.npmjs.com/package/egg-graphql-apollo)
[![travis-ci](https://travis-ci.org/MinJieLiu/egg-graphql-apollo.svg?branch=master)](https://travis-ci.org/MinJieLiu/egg-graphql-apollo)
[![Coverage Status](https://coveralls.io/repos/github/MinJieLiu/egg-graphql-apollo/badge.svg?branch=master)](https://coveralls.io/github/MinJieLiu/egg-graphql-apollo?branch=master)
[![npm](https://img.shields.io/npm/dt/egg-graphql-apollo.svg?style=flat-square)](https://github.com/MinJieLiu/egg-graphql-apollo)

插件参考了 `egg-graphql`，并与 `egg-graphql` 配置保持一致。不同的是，推荐业务实现的方式有差别。

`egg-graphql-apollo` 推荐 `graphql` 模型定义及 `resolvers` 等相关逻辑在 `app/graphql` 目录中实现。

例如：

```js
// app/graphql/user_info.js

exports.typeDef = `
type UserInfo {
  id: Int!
  name: String!
  createdAt: Date! @date(format: "YYYY-MM-DD")
}
`;

exports.resolver = {
  Query: {
    user(root, { id }, ctx) {
      return ctx.service.userInfo.fetchById(id);
    },
  },
};

exports.directiveResolver = {};

exports.schemaDirective = {};

```

除了目录，每个文件输出可选 `typeDef`、`resolver`、`directiveResolver`、`schemaDirective`，具体见测试用例。另外 `*.graphql` 也会默认被加载。

## 安装

```bash
$ npm i egg-graphql-apollo
```

在 `config/plugin.js` 开启插件：

```js
//
exports.graphql = {
  package: 'egg-graphql-apollo',
};
```

在 `config/config.${env}.js` 配置 `graphql` 的路由。

```js
// config/config.${env}.js
exports.graphql = {
  router: '/graphql',
  graphiql: true,
  onPreGraphQL: async (ctx) => {},
  onPreGraphiQL: async (ctx) => {},
};
```

## 使用方式

请参考测试用例的目录结构, 以及 `dataloader` 的使用。

## 参考项目

- [egg-graphql](https://github.com/eggjs/egg-graphql)

- [项目例子](https://github.com/MinJieLiu/liumingyi-blog-api)

## 协议

MIT
