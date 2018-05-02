'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-hemera-ts:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ servicePrefix: 'titan' })
      .withPrompts({ serviceName: 'ping' })
      .withPrompts({ serviceDesc: 'This service use just for testing it will create ping date route which return date.' })
      .withPrompts({ serviceAuthor: 'Vladimir Djukic' })
      .withPrompts({ crud: true })
      .withPrompts({ coverage: 100 });
  });

  it('creates files', () => {
    assert.fail(['service.ts']);
  });
});
