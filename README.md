# egg-graphql-apollo

[![npm](https://img.shields.io/npm/v/egg-graphql-apollo.svg?style=flat-square)](https://www.npmjs.com/package/egg-graphql-apollo)
[![travis-ci](https://travis-ci.org/MinJieLiu/egg-graphql-apollo.svg?branch=master)](https://travis-ci.org/MinJieLiu/egg-graphql-apollo)
[![Coverage Status](https://img.shields.io/codecov/c/github/MinJieLiu/egg-graphql-apollo.svg?style=flat-square)](https://codecov.io/gh/MinJieLiu/egg-graphql-apollo)
[![npm](https://img.shields.io/npm/dt/egg-graphql-apollo.svg?style=flat-square)](https://github.com/MinJieLiu/egg-graphql-apollo)

插件参考了 `egg-graphql`，并与 `egg-graphql` 配置保持一致。不同的地方是文件结构定义和编写方式。

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

每个 js 文件输出可选 `typeDef`、`resolver`、`directiveResolver`、`schemaDirective`，具体见测试用例，API： [graphql-tools](https://github.com/apollographql/graphql-tools)。这样做的好处是业务归类清晰、`graphql schema` 可组合。

你也可以编写 `.graphql` 文件，插件会加载并组合它们。

## 安装

```bash
$ npm i egg-graphql-apollo
```

在 `config/plugin.js` 开启插件：

```js
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
