import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express from "express";
const app = express();

const options = {
  swaggerDefinition: require('./swagger.json'),
  apis: ['./src/app.js'], // caminho dos arquivos de rotas da sua aplicação
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
