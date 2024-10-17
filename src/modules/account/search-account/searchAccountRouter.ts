import { Router } from "express";
import { searchAccountController } from "./searchAccountController";
import { verifyToken } from "../../../middlewares/verifyToken";
import { verifyDto } from "../../../middlewares/verifyDto";
import { searchAccountSchema } from "./searchAccountSchema";

export const searchAccountRouter = Router();

searchAccountRouter.get(
  "/:email",
  [verifyToken(), verifyDto({ params: searchAccountSchema })],
  searchAccountController
);
