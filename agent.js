const Subscriber = require('./lib/subscriber');

module.exports = agent => {
  const subscriber = new Subscriber();
  // listen
  subscriber.on('changed', () =>
    agent.messenger.sendToApp('refresh', 'push'));
};