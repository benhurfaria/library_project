import express from "express";
import cors from "cors";
import * as userController from "./controller/userController.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/usuario", userController.getGeral);

export default app;