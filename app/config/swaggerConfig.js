const fastifySwagger = require("@fastify/swagger");
const fastifySwaggerUi = require("@fastify/swagger-ui");
const { SwaggerTheme, SwaggerThemeNameEnum } = require("swagger-themes");

const swaggerTheme = new SwaggerTheme();
const swaggerCssContent = swaggerTheme.getBuffer(SwaggerThemeNameEnum.ONE_DARK);

exports.registerSwagger = function (app) {
  // Register Swagger for defining API documentation
  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: process.env.PROJECT_NAME,
        description: "API Documentation",
        version: "1.0.0",
      },
      consumes: ["application/json", "multipart/form-data"],
      produces: ["application/json"],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            description: "JWT Bearer token authorization",
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
  });
  app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    theme: {
      css: [
        {
          filename: "swagger-theme.css",
          content:
            swaggerCssContent +
            "\n" +
            ".download-url-wrapper { display: none !important; }",
        },
      ],
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });
};
