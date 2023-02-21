import express from "express";
import cors from "cors";
import * as userController from "./controller/userController.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/usuario", userController.getGeral);
app.get("/usuario/:id", userController.getWithId);
app.post("/usuario", userController.postUser);
app.put("/usuario/:id", userController.updateUser);
app.delete("/usuario/:id", userController.deleteUser);
app.post("/signup", userController.signUp);
app.post("/signin", userController.signIn);
app.delete("/signout", userController.signOut);

export default app;