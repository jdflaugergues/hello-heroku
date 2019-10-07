const config = require('config');
const Koa = require('koa');
const router = require('koa-router')();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const api = require('./api');

const app = new Koa();

router.use(config.mountPoint, api.routes());

app.use(router.routes());
app.use(router.allowedMethods());


router.routes().router.stack.forEach((route) => {
  if (route.methods.length) {
    console.log(route.methods, route.path);
  }
});

function connect() {
  return mongoose.connect(config.database.url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

function close(cb) {
  mongoose.models = {};
  mongoose.modelSchemas = {};
  return mongoose.connection.close(cb);
}

module.exports = { app, connect, close };
