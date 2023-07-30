const Subscriber = require('./lib/subscriber');
const RegistryClient = require('./lib/registry_client');

module.exports = agent => {
  agent.registryClient = agent.cluster(RegistryClient).create({});

  agent.beforeStart(async () => {
    await agent.registryClient.ready();
    agent.logger.info(`${agent.type} : LEADER ${agent.registryClient.options.isLeader}`);

    const subscriber = new Subscriber();
    // listen changed event, broadcast to all workers
    subscriber.on('changed', (data) => agent.registryClient.publish({
      dataId: 'refresh',
      publishData: {
        by: 'push',
        data,
      },
    }));
  });
};