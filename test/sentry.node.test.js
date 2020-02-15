'use strict';

const mock = require('egg-mock');
// const assert = require('assert');

describe('test/assets.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/sentry-node-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi')
      .expect(200);
  });
});
