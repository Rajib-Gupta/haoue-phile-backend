const Fastify = require("fastify");
const { googleAuth } = require("../app/plugin/googleAuth.js");
const { registerSwagger } = require("../app/config/swaggerConfig.js");
const authRoutes = require("../app/route/auth.js");
const secureRoutes = require("../app/route/secure.js");
const { bookingRoutes } = require("../app/route/booking.js");

// Configure Fastify And Logging
const fastifyLoggerOptions = {};
if (process.stdout.isTTY) {
  Object.assign(fastifyLoggerOptions, {
    transport: {
      target: "pino-pretty",
    },
  });
} else {
  Object.assign(fastifyLoggerOptions, {
    transports: {
      target: "@fastify/one-line-logger",
    },
  });
}

// Create fastify instance outside the handler
const app = Fastify({
  logger: true,
});

// Register your plugins
app.register(import("../app/app.js"));

// Export the serverless function
module.exports = async function handler(req, res) {
  await app.ready();
  app.server.emit("request", req, res);

  // Not needed
  // return app;
};
