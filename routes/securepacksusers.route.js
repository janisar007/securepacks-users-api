import express from "express";
import { getSecurepacksUsersController } from "../controllers/securepackusers.controller.js";

const securepacksUsersRouter = express.Router();

securepacksUsersRouter.get("/users-data", getSecurepacksUsersController);

export default securepacksUsersRouter;
