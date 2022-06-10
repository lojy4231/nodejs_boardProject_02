const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Test API",
      version: "1.0.0",
      description: "Test API with express",
    },
    host: "localhost:3000",
    basePath: "/",
    securityDefinitions: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        in: "header",
        bearerFormat: "JWT",
      },
    },
  },
  apis: ["./swagger/*"],
};

const specs = swaggereJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
