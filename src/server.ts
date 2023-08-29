import "reflect-metadata";
import express, { Router } from "express";
import { config as dotenvConfig } from "dotenv";
import './database';
import { routes } from "./router";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

dotenvConfig();

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(routes);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Servidor Esta rodando na Porta ${PORT}`);
});