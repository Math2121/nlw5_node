import { Router } from "express";
import { getCustomRepository } from "typeorm";
import { MessagesController } from "./src/controllers/MessagesController";
import { SettingController } from "./src/controllers/SettingsControllers";
import { UserController } from "./src/controllers/UsersController";
import { SettingsRepository } from "./src/repositories/SettingsRepousitory";

const routes = Router();
const settinController = new SettingController()
const userController = new UserController()
const messagesController = new MessagesController()
routes.post("/settings",settinController.create);
routes.post("/users",userController.create);
routes.post("/messages",messagesController.create);
routes.get("/messages/:id",messagesController.showByUser);
routes.get("/settings/:username",settinController.findByUsername);
routes.put("/settings/:username",settinController.update);
export { routes };
