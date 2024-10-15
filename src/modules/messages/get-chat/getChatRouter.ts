import { Router } from "express";
import { getChatController } from "./getChatController";
import { verifyToken } from "../../../middlewares/verifyToken";
import { paramsWithIdSchema } from "../../../zod-schemas/paramsWithIdSchema";
import { verifyDto } from "../../../middlewares/verifyDto";

export const getChatRouter = Router();

getChatRouter.get(
  "/:id",
  [verifyToken(), verifyDto({ params: paramsWithIdSchema })],
  getChatController
);
