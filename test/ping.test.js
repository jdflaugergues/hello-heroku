'use strict';

const test = require('ava'),
  config = require('config'),
  request = require('supertest');

const { app } = require('../src/app');

test('ping', async (t) => {
  const res = await request(app.listen()).get(`${config.mountPoint}/ping`);

  t.is(res.status, 200);
  t.is(res.text, 'hello heroku OK');
});
