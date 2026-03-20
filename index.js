const { ENV } = require('./src/env');
const { createApp } = require('./src/app');

const app = createApp();

if (require.main === module) {
  app.listen(ENV.port, () => {
    console.log('\nProfEng API online');
    console.log(`URL: http://localhost:${ENV.port}`);
    console.log('Core routes: /chat, /voice/*, /exercises/*, /levels/assess, /auth/*\n');
  });
}

module.exports = {
  app,
  createApp,
};
