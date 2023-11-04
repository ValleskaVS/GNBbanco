const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API VL",
      version: "1.0.0",
      description: "Documentação da API",
    },
  },
  apis: ["./index.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
