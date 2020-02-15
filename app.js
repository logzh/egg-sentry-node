'use strict';
const assert = require('assert');
const Sentry = require('@sentry/node');

module.exports = app => {

  app.addSingleton('Sentry', (config, app) => {
    assert(app.config.sentry.dsn, '[egg-sentry-node] should pass options.dsn');

    const options = Object.assign({ environment: app.config.env }, app.config.sentry);

    Sentry.init(options);

    return Sentry;
  });

  app.on('error', (err, ctx) => {
    ctx = ctx || app.createAnonymousContext();

    const userId = ctx.userId || '-';
    const traceId = ctx.tracer && ctx.tracer.traceId || '-';

    // will excute `appErrorFilter` when emit an error in `app`
    // If `appErrorFilter` return false, egg-onerror won't log this error.
    // You can logging in `appErrorFilter` and return false to override the default error logging.
    const onErrorConfig = app.config.onerror;

    // If `appErrorFilter` return false, egg-sentry-node won't capture this error.
    if (onErrorConfig.appErrorFilter && onErrorConfig.appErrorFilter(err, ctx)) {
      app.Sentry.setUser({ id: userId });
      app.Sentry.setTag('app_name', app.config.name);
      app.Sentry.setTag('trace_id', traceId);
      app.Sentry.withScope(scope => {
        scope.addEventProcessor(event => app.Sentry.Handlers.parseRequest(event, ctx.request));
        app.Sentry.captureException(err);
      });
    }
  });
};
