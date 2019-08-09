import server from './server';

server.app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Apollo Server is now running on PORT ${process.env.PORT}!!! Enjoy moderately`);
});
