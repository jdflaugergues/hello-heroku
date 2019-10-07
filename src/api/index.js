/* eslint-disable no-use-before-define */

const Router = require('koa-router');

const { User } = require('../models');

const router = new Router();

router.get('/ping', (ctx) => {
  ctx.body = 'hello heroku OK';
});

router
  .get('/users', getUsers)
  .post('/users', createUser);

async function getUsers(ctx) {
  // const users = await User.find();
  //
  // ctx.body = users;
  // ctx.status = 200;

  ctx.body = config.database.url + ' \n' + process.env;
  ctx.status = 200;
}

async function createUser(ctx) {
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    createdDate: new Date(),
  };

  User.init();
  await User.create(user)
    .then((createdUser) => {
      ctx.body = createdUser;
      ctx.status = 201;
    })
    .catch((err) => {
      ctx.assert(
        err.code !== 11000,
        409,
        `User with username ${ctx.request.body.username} already exists`,
      );
      ctx.assert(!err, 400, err, { code: err.name });
    });
}

module.exports = router;
