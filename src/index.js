const config = require('config');

const { app, connect, close } = require('./app');

connect()
  .then(() => {
    console.info('Server started');
    app.listen(process.env.PORT || config.port); // eslint-disable-line no-process-env
  })
  .catch((err) => {
    console.error(err, 'Cannot connect to mongo', config.database.url, err);
    close(() => process.exit(1)); // eslint-disable-line no-process-exit
  });

console.info('server started on:', config.port);
