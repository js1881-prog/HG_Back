const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "TripSketch",
    },
    servers: [
      {
        url: "https://tripsketch.onrender.com/",
      },
    ],
  },
  apis: ["./src/router/*.js"],
};
const specs = swaggereJsdoc(options);

module.exports = { swaggerUi, specs };
