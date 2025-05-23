require("dotenv").config();
const Fastify = require("fastify");
const fastifyStatic = require("@fastify/static");
const authRoutes = require("./route/auth");
const closeWithGrace = require("close-with-grace");
const secureRoutes = require("./route/secure");
const fastifyCors = require("@fastify/cors");
const { connectDB } = require("./utils/db");
const { googleAuth } = require("./plugin/googleAuth");
const fastifySecureSession = require("@fastify/secure-session");
const FastifyJWT = require("@fastify/jwt");
const path = require("path");
const { registerSwagger } = require("./config/swaggerConfig");
const { seedCities } = require("../migration/migrateCities");
const { seedDatabase } = require("../migration/migrationLease");
const { bookingRoutes } = require("./route/booking");
// Connect to the database with error handling
const connectDatabase = async () => {
  try {
    await connectDB();
  } catch (err) {
    app.log.error("Failed to connect to the database:", err);
    process.exit(1); // Exit process if DB connection fails
  }
};

  // Run Migration
  const runMigration = async () => {
    await seedCities();
    await seedDatabase();
  };


module.exports = async (app, options) => {
  await connectDatabase();
  await runMigration();
  // Register the fastifySecureSession plugin first
  app.register(fastifySecureSession, {
    secret: process.env.SESSION_SECRET || "your-secret-key",
    cookie: {
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    },
  });

  // Register JWT
  app.register(FastifyJWT, {
    secret: process.env.SESSION_SECRET,
  });

  // Register security-related plugins
  app.register(fastifyCors, { origin: "*" });

  // Set Static Folder
  app.register(fastifyStatic, {
    root: path.join(__dirname, "public"), // Specify the folder for static files
    prefix: "/public/", // URL prefix for accessing static files
  });

  // Register the Google strategy
  googleAuth();

  // Custom Error Handler
  app.setErrorHandler((error, request, reply) => {
    app.log.error(`Error occurred: ${error.message}`);

    // Custom response for different error types
    if (error.validation) {
      // Validation error
      reply.status(400).send({
        statusCode: 400,
        error: "Bad Request",
        message: "Invalid request data",
      });
    } else if (error.statusCode) {
      // Custom application errors
      reply.status(error.statusCode).send({
        statusCode: error.statusCode,
        error: error.name,
        message: error.message,
      });
    } else {
      // Default Internal Server Error
      reply.status(500).send({
        statusCode: 500,
        error: "Internal Server Error",
        message: "An unexpected error occurred",
      });
    }
  });

  // Register Swagger
  registerSwagger(app);

  // Register routes
  app.register(authRoutes);
  app.register(secureRoutes);
  app.register(bookingRoutes);


  // Start the server
  // const start = async () => {
  //   try {
  //     await connectDatabase(); // Ensure the DB connection is successful before starting the server
  //     await runMigration();
  //     await app.listen({ port: process.env.PORT });
  //     app.log.info(`Server running at ${process.env.BASE_URL}`);
  //   } catch (err) {
  //     app.log.error(`Server failed to start: ${err}`);
  //     process.exit(1);
  //   }
  // };

  // start();

  // Close In Case of Crashed Or Closed
  // closeWithGrace({ delay: 500 }, async ({ signal, error, manual }) => {
  //   if (error) {
  //     app.log.error({ error }, "server Closing With Error");
  //   } else {
  //     app.log.info({ signal }, signal + "signal received, server Closing");
  //   }
  //   await app.close();
  // });
};
