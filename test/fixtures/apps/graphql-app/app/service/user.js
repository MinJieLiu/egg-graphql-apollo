'use strict';

const egg = require('egg');
const DataLoader = require('dataloader');

module.exports = class UserService extends egg.Service {

  constructor(ctx) {
    super(ctx);
    this.ctx = ctx;
    this.loader = new DataLoader(this.fetch.bind(this));
  }

  async getUserList() {
    return [
      { id: '1', name: 'user1' },
      { id: '2', name: 'user2' },
    ];
  }

  fetch(ids) {
    // this.ctx.model.user.find(ids);
    return Promise.resolve(ids.map(id => ({
      id,
      name: `name${id}`,
      upperName: `name${id}`,
      password: `password${id}`,
      projects: [],
    })));
  }

  fetchByIds(ids) {
    return this.loader.loadMany(ids);
  }

  fetchById(id) {
    return this.loader.load(id);
  }
};
