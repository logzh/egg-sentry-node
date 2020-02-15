'use strict';

const assert = require('assert');
const SENTRY = Symbol('Application#SENTRY#NODE');
const Sentry = require('@sentry/node');

module.exports = app => {
  assert(app.config.sentry.dsn, 'should pass options.dsn');

  const options = Object.assign({ environment: app.config.env }, app.config.sentry);

  Sentry.init(options);

  Object.defineProperty(app, 'Sentry', {
    get() {
      if (!this[SENTRY]) {
        this[SENTRY] = Sentry;
      }
      return this[SENTRY];
    },
  });
};
