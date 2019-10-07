/* eslint-disable no-use-before-define */

const Router = require('koa-router');
const config = require('config');
const mongoose = require('mongoose');

const { User } = require('../models');

const router = new Router();

router
  .get('/ping', ping)
  .get('/users', getUsers)
  .get('/users/create', createUser)
  .post('/users', createUser);

async function ping(ctx) {
  ctx.body = 'hello heroku OK';
}

async function getUsers(ctx) {
  const users = await User.find();

  ctx.body = users;
  ctx.status = 200;
}

async function createUser(ctx) {
  const user = {
    firstName: ctx.query.firstName || 'John',
    lastName: ctx.query.lastName || 'Doe',
    createdDate: new Date(),
  };

  User.init();

  await User.create(user)
    .then((createdUser) => {
      console.log('ok created');
      const jsonUser = createdUser.toObject();

      ctx.body = jsonUser;
      ctx.status = 201;
    })
    .catch((err) => {
      console.log('ok error')

      ctx.assert(
        err.code !== 11000,
        409,
        `User with username ${ctx.request.body.username} already exists`,
      );
      ctx.assert(!err, 400, err, { code: err.name });
    });
  ctx.status = 300;
}

module.exports = router;
