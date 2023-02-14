import express from "express";
import cors from "cors";
import * as itemController from "./controller/itemController.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/item", itemController.getGeral);


export default app;