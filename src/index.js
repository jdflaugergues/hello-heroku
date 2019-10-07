const config = require('config');
const mongoose = require('mongoose');

const { app, connect, close } = require('./app');

connect()
  .then(() => {
    console.info('server started on:', config.port);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.info("we're connected!");
    });
    app.listen(process.env.PORT || config.port); // eslint-disable-line no-process-env
  })
  .catch((err) => {
    console.error(err, 'Cannot connect to mongo', config.database.url, err);
    close(() => process.exit(1)); // eslint-disable-line no-process-exit
  });

