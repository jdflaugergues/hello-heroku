'use strict';

const test = require('ava'),
  request = require('supertest'),
  config = require('config'),
  mongoose = require('mongoose');

const { app, connect, close } = require('../src/app');

test.before(async (t) => {
  await connect();
  const dbName = mongoose.connection.db.databaseName;

  t.true(dbName.startsWith('test'));
  await mongoose.connection.dropDatabase();
});

test.after(async () => close());

test.serial('GET all users when no users', async (t) => {
  const res = await request(app.listen())
    .get(`${config.mountPoint}/users/`)
    .set('Accept', 'application/json')

  t.is(res.body.length, 0);
  t.is(res.status, 200);
});


test.serial('POST create new user', async (t) => {
  const res = await request(app.listen())
    .post(`${config.mountPoint}/users/`)
    .set('Accept', 'application/json')

  t.is(res.body.firstName, 'John');
  t.is(res.status, 201);
});

test.serial('GET all users when only one user', async (t) => {
  const res = await request(app.listen())
    .get(`${config.mountPoint}/users/`)
    .set('Accept', 'application/json')

  t.is(res.body.length, 1);
  t.is(res.status, 200);
});
