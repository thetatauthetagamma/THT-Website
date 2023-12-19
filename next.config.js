// next.config.js
module.exports = {
  // ... other configurations
  middleware: async () => {
    const middleware = require('./middleware').default;
    return middleware;
  },
};