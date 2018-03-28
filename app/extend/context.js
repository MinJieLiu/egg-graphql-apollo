'use strict';

module.exports = {

  /**
   * graphql instance access
   * @member Context#graphql
   */

  get graphql() {
    return this.service.graphql;
  },
};
