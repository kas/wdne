// our packages
import app from './app';
import {logger} from './util';

// start server
app.listen(8080, function() { // lexical scoping, can't use arrow function and be able to access app variable via this
  const host = this.address().address;
  const port = this.address().port;
  logger.info(`Meadowlark-server started on http://${host}:${port}; press Ctrl-C to terminate.`);
});

// output all uncaught exceptions
process.on('uncaughtException', err => logger.error('uncaught exception:', err));
process.on('unhandledRejection', err => logger.error('unhandled rejection:', err));
