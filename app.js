module.exports = app => {
  app.messenger.on('refresh', by => {
    app.logger.info('start update by %s', by);
    // create an anonymous context to access service
    const ctx = app.createAnonymousContext();
    ctx.runInBackground(async () => {
      await ctx.service.source.update();
      app.lastUpdateBy = by;
    });
  });
};