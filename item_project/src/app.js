import express from "express";
import cors from "cors";
import * as itemController from "./controller/itemController.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/item", itemController.getGeral);
app.get("/item/:id", itemController.getWithId);
app.post("/item", itemController.postItem);
app.put("/item/:id", itemController.updateItem);
app.delete("/:id", itemController.deleteItem);


export default app;