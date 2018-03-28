'use strict';

const moment = require('moment');

exports.typeDef = `
type Token {
  id: Int # 主键
  gmtCreate: String # 创建时间
  gmtModified: String # 修改时间
  token: String # 插件token
  userId: Int # 用户id
}

input GetTokenByIdReq {
  id: String
}
type GetTokenByIdRes {
  success: Boolean
  message: String
  data: Token
}

input GetTokenListReq {
  pageSize: Int # (选填)每页条数
  currentPage: Int # (选填)当前页数
  id: Int # 主键
  gmtCreate: String # 创建时间
  gmtModified: String # 修改时间
  token: String # 插件token
  userId: Int # 用户id
}
type GetTokenListRes {
  success: Boolean
  message: String
  data: [Token]
}

input CreateTokenReq {
  id: Int # 主键
  gmtCreate: String # 创建时间
  gmtModified: String # 修改时间
  token: String # 插件token
  userId: Int # 用户id
}

input UpdateTokenReq {
  id: Int # 主键
  gmtCreate: String # 创建时间
  gmtModified: String # 修改时间
  token: String # 插件token
  userId: Int # 用户id
}

input DeleteTokenReq {
  id: String!
}
`;

exports.resolver = {
  Token: {
    gmtCreate: obj => {
      return moment(obj.gmtCreate).format('YYYY-MM-DD HH:mm:ss');
    },
    gmtModified: obj => {
      return moment(obj.gmtModified).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  Query: {
    getTokenById: (root, args, ctx) => {
      const params = args.input;
      return ctx.service.token.getTokenById(params);
    },
    getTokenList: (root, args, ctx) => {
      const params = args.input;
      return ctx.service.token.getTokenList(params);
    },
  },
  Mutation: {
    createToken: (root, args, ctx) => {
      const params = args.input;
      return ctx.service.token.createToken(params);
    },
    updateToken: (root, args, ctx) => {
      const params = args.input;
      return ctx.service.token.updateToken(params);
    },
    deleteToken: (root, args, ctx) => {
      const params = args.input;
      return ctx.service.token.deleteToken(params);
    },
  },
};
