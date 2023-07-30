const RegistryClient = require('./lib/registry_client');

module.exports = app => {
  app.registryClient = app.cluster(RegistryClient).create({});

  app.beforeStart(async () => {
    await app.registryClient.ready();
    app.logger.info(`${app.type} : LEADER ${app.registryClient.options.isLeader}`);

    app.registryClient.subscribe({
      dataId: 'refresh'
    }, reg => {
      app.logger.info('start update by %s', reg.by);
      // create an anonymous context to access service
      const ctx = app.createAnonymousContext()
      ctx.runInBackground(async ()=>{
        await ctx.service.source.update(reg.data);
        app.lastUpdateBy = reg.by;
      })
    })
  });
  
};